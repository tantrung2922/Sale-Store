const express = require("express");
const app = express();
const registerModel = require("../model/user/register");
const loginModel = require("../model/user/login");
const validator = require("validator");
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get("/registerUser", (req, res) => {
  try {
    res.render("user/register.hbs");
  } catch (error) {
    console.log("Lỗi render giao diện đăng kí");
  }
});

app.post("/registerUser", (req, res) => {
  if (
    !req.body.email ||
    !req.body.userName ||
    !req.body.fullName ||
    !req.body.password ||
    !req.body.rePassword ||
    !req.body.birthday ||
    !req.body.phoneNumber
  ) {
    return res.render("user/register.hbs", {
      alert:
        "! You need to fill in all the information before registering an account",
    });
  }

  if (req.body.password != req.body.rePassword) {
    return res.render("user/register.hbs", {
      alert: "! Incorrect password",
    });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.render("user/register.hbs", {
      alert: "! Wrong email format (email@gmail.com)",
    });
  }

  const register = new registerModel(req.body);

  const login = new loginModel({
    userName: register.userName,
    email: register.email,
    password: register.password,
    userId: register._id,
  });

  try {
    register.save();
    login.save();
    res.render("project/home.hbs");
  } catch (error) {
    res.status(500).send(error);
    console.log("Lỗi bảng User");
  }
});

module.exports = app;
