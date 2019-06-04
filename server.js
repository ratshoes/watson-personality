const express = require("express");
const session = require("session");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const apiRouter = require("./routes/api.js");

const PORT = process.env.PORT || 8000;
const db = "mongodb://localhost:27017/watson-api";

mongoose.Promise = global.Promise;

mongoose
  .connect(db)
  .then(() => console.log("Mongo is now connected"))
  .catch(error => console.log(error));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.json("Server is working on root directory");
// });
app.get("/", (req, res) => {
  res.json({ message: "homepage root" });
});
app.use("/api", apiRouter);

// app.use(require('./routes/web'))

app.listen(PORT, (req, res) => {
  console.log(`Now listening on ${PORT}`);
});
