const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./config/db");

dotenv.config({
  path: path.join(__dirname, "/../.env"),
});

//routing
const home = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", home);

const indexPath = path.join(__dirname + "/../../client/build/");

if (process.env.NODE_ENV === "production") {
  //"client/build"는 react의 build파일 경로이다
  app.use(express.static(indexPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(indexPath));
  });
}

module.exports = app;
