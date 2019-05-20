const express = require("express");
const app = express();
const users = require("../controllers/User.js");
const trips = require("../controllers/Trips");

module.exports = app => {
  //User router
  app.route("/api/signup").post(users.createUser);
  app.route("/api/login").post(users.loginUser);
  app.route("/api/finduser/:id").get(users.findUser);
  app.route("/api/getusers").get(users.getUsers);
  app.route("/api/updateuser/:id").put(users.updateUser);
  app.route("/api/deleteuser/:id").delete(users.deleteUser);

  //Trips router
  app.route("/api/createtrip").post(trips.createTrip);
  app.route("/api/gettrips").get(trips.getAllTrips);
};
