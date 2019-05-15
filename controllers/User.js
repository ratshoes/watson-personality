const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { getTokenForUser, validateToken } = require("../config/auth");

const createUser = (req, res) => {
  const { email, user, password } = req.body;
  let newUser = new User({ email, user, password });
  newUser.save((err, user) => {
    if (err) res.status(400).json({ err });
    const getToken = getTokenForUser({
      username: email
    });
    res.status(200).json({ success: "User was saved", user, getToken });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Wrong user or password" });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: "No user with that name in the database" });
      return;
    }
    const userID = user._id;
    user.checkPassword(password, (nonMatch, match) => {
      //checking to see if the passwords match before the hash
      if (nonMatch !== null) {
        res.status(422).json({ message: "That is the wrong password" });
        return;
      }
      if(hashMatch) {
        const token = getTokenForUser({
          username = user.email
        })
        res.json({message:`Token successfully passed ${token,userID}`})
      }
    });
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

const login = (req, res) => {};

module.exports = {
  createUser,
  loginUser,
  findUser,
  getUsers,
  updateUser,
  deleteUser
};
