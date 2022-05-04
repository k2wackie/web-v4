const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
// const db = require("./config/db");
const app = express();

dotenv.config({
  path: path.join(__dirname, "/../.env"),
});

//routing
const home = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", home);

module.exports = app;
