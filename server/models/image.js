const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ImgSchema = new mongoose.Schema({
  img: {
    type: String,
  },
});

module.exports = mongoose.model("Img", ImgSchema);
