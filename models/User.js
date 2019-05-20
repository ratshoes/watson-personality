const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new Schema({
  picture: {
    required: false,
    type: String
  },
  lastLogin: {
    default: Date.now(),
    required: true,
    type: Date
  },
  loginCount: {
    default: 0,
    type: Number
  },
  coordinates: {
    required: false,
    type: [Number]
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    sparse: true,
    validate: [
      validate({
        validator: "isEmail",
        message: "Email is invalid"
      })
    ]
  },
  user: {
    type: String,
    unique: true,
    required: true,
    sparse: true
  },

  password: {
    type: String,
    required: ["True. Password is required."],
    validate: [
      validate({
        validator: "isLength",
        arguments: [6, 80],
        message: "Password must be at least 6 characters long"
      })
    ]
  },
  contact: {
    name: String,
    number: String
  },
  trips: [
    {
      ref: "Trips",
      type: ObjectId
    }
  ]
});

UserSchema.pre("save", function(next) {
  let salt = 11;
  bcrypt.hash(this.password, salt, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
  bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema, { timestamps: true });
