const express = require("express");
const app = express();
const users = require("../controllers/User.js");

module.exports = app => {
  app.route("/api/signup").post(users.createUser);
  app.route("/api/login").post(users.loginUser);
  app.route("/api/finduser/:id").get(users.findUser);
  app.route("/api/getusers").get(users.getUsers);
  app.route("/api/updateuser/:id").put(users.updateUser);
  app.route("/api/deleteuser/:id").delete(users.deleteUser);
};
