const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    validate: [
      validate({
        validator: "isLength",
        arguments: [6, 80],
        message: "Password must be at least 6 characters long"
      })
    ]
  }
});

UserSchema.pre("save", function(next) {
  let salt = 11;
  bcrypt.hash(this.password, salt, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongose.model("User", UserSchema);
