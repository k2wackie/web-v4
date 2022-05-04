const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "/../../.env"),
});
const mongoDB_ID = process.env.DB_USER;
const mongoDB_PW = process.env.DB_PSWORD;
const mongoDB_DB = process.env.DB_DATABASE;

module.exports = {
  mongoURI: `mongodb+srv://${mongoDB_ID}:${mongoDB_PW}@ackie-cluster0.bhsja.mongodb.net/${mongoDB_DB}?retryWrites=true&w=majority`,
};
