const mongoose = require("mongoose");
const config = require("./key");

module.exports = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err));
