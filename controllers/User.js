const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const createUser = (req, res) => {
  const { email, user, password } = req.body;
  let newUser = new User({ email, user, password });
  newUser.save((err, user) => {
    if (err) res.status(400).json({ err });
    res.status(200).json({ user });
  });
};
const findUser = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) return err;
    res.status(200).json({ user: user });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { email, user, password } = req.body;
  let salt = 11;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) res.status(400).json({ err });
    let newPass = hash;
    User.findByIdAndUpdate(id, { email, user, newPass }, { new: true })
      .then(updatedUser => {
        res.json({ success: updatedUser });
      })
      .catch(err => {
        if (err) res.json(err);
      });
  });
};

const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) return res.status(400).send({ err });
    res.json({ user });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findOneAndDelete(id, (err, success) => {
    if (err) return err;
    res.status(200).json({ success: `Deletion success ${success}` });
  });
};

module.exports = {
  createUser,
  findUser,
  getUsers,
  updateUser,
  deleteUser
};
