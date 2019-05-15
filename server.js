const express = require("express");
const session = require("session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 8000;
const db = "mongodb://localhost:27017/watson-api";
const routes = require("./routes/routes");

mongoose
  .connect(db)
  .then(() => console.log("Mongo is now connected"))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Server is working on root directory");
});

app.listen(PORT, (req, res) => {
  console.log(`Now listening on ${PORT}`);
});

routes(app);
