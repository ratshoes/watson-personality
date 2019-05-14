const express = require("express");
const app = express();
const users = require("../controllers/User.js");

module.exports = app => {
  app.route("/api/signup").post(users.createUser);
  app.route("/api/getusers").get(users.getUsers);
};
