// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  plan: {
    type: String,
    default: "free"   // free or pro
  }
});

module.exports = mongoose.model("User", userSchema);