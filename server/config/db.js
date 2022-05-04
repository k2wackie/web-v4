const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
const conf = process.env;

const db = mysql.createConnection({
  host: conf.DB_HOST,
  user: conf.DB_USER,
  password: conf.DB_PSWORD,
  database: conf.DB_DATABASE,
  port: conf.DB_PORT,
});

db.connect();

module.exports = db;
