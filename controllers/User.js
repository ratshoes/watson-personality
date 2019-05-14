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

const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) return res.status(400).send({ err });
    res.json({ user });
  });
};

module.exports = {
  createUser,
  getUsers
};
