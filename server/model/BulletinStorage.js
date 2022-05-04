const mongoose = require("mongoose");

const bulletinSchema = mongoose.Schema({
  author: {
    type: String,
    maxlength: 50,
  },
  content: {
    type: String,
    trim: true,
    unique: 1,
  },
  in_date: {
    type: Date,
    required: true,
    default: () => +Date.now(),
  },
});

const BulletinStorage = mongoose.model("bulletin", bulletinSchema);

module.exports = { BulletinStorage };
