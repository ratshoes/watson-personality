const express = require("express");

const users = require("../controllers/User.js");
const properties = require("../controllers/Property");
//const trips = require("../controllers/Trips");
const router = express.Router();

//User router
router.post("/signup", users.createUser);
router.post("/login", users.loginUser);
router.get("/getusers", users.getUsers);
router.get("/findusers/:id", users.findUser);
router.get("/updateuser/:id", users.updateUser);
router.get("/deleteuser/:id", users.deleteUser);

router.post("/createproperty", properties.createProperty);
router.get("/properties", properties.getProperties);
router.get("/getproperty", properties.getOneProperty);
router.get("/deleteproperty", properties.deleteProperties);
module.exports = router;
