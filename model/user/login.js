const mongoose = require("mongoose");
const modelLogin = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "register",
  },
});

const loginUser = mongoose.model("Login", modelLogin);
module.exports = loginUser;