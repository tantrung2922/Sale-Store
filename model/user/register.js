const mongoose = require("mongoose");
const modelRegister = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    index: true,
  },

  password: {
    type: String,
  },

  fullName: {
    type: String,
  },

  email: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  address: {
    type: String,
  },

  gender: {
    type: String
  },

  birthday: {
    type: Date,
  },

  country: {
    type: String,
  },

  avatar: {
    type: String,
  }
});

const registerUser = mongoose.model("Register", modelRegister);
module.exports = registerUser;