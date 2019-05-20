const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Trips = require("../models/Trips.js");
const User = require("../models/User");

const getAllTrips = (req, res) => {
  Trips.find({})
    .then(trips => {
      res.status(200).json(trips);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

const createTrip = (req, res) => {
  const {
    userId,
    name,
    isArchived,
    startDate,
    endDate,
    latitude,
    longitude,
    image
  } = req.body;

  const newTrip = new Trips({
    userId,
    name,
    isArchived,
    startDate,
    endDate,
    latitude,
    longitude,
    image
  });

  newTrip
    .save()
    .then(trip => {
      User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { trips: trip.id } }
      )
        .then(() => {
          res.status(201).json(trip);
        })
        .catch(() => {
          res.status(500).json("Error linking trip to user");
        });
    })
    .catch(err => {
      res.status(500).json({ err: err.message });
    });
};
