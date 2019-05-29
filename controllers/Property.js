const Property = require("../models/Property");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createProperty = (req, res) => {
  const propertyBody = req.body;
  let newProperty = new Property(propertyBody);
  newProperty.save(propertyBody).then(prop => {
    User.findOneAndUpdate(
      { _id: req.body.createdBy },
      { $addToSet: { properties: prop.id } }
    )
      .then(() => {
        res.status(201).json(prop);
      })
      .catch(() => {
        res.status(500).json("Error linking property to user");
      });
  });
};

exports.updateProperty = (req, res) => {
  const { id } = req.params;
  const updatedProperty = req.body;
  Property.findOneAndUpdate(id, updatedProperty, { new: true }).then(
    updatedUser => {
      res
        .status(200)
        .json({ success: updatedUser })
        .catch(err => {
          res.status(500).json(err);
        });
    }
  );
};

exports.getProperties = (req, res) => {
  Property.find({}, (err, property) => {
    if (err) return err;
    res.status(200).json({ sucess: property });
  });
};

exports.deleteProperties = (req, res) => {
  const { id } = req.params;
  Property.findOneAndDelete(id, (err, property) => {
    if (err) return err;
    res.status(200).json({ success: `${property} was deleted` });
  });
};

exports.getOneProperty = (req, res) => {
  const { id } = req.params;
  Property.findById(id, (err, property) => {
    if (err) return err;
    res.status(200).json({ success: property });
  });
};
