const express = require("express");
const app = express();
const loginModel = require("../model/user/login");
const validator = require("validator");
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get("/loginUser", (req, res) => {
  try {
    res.render("user/login.hbs");
  } catch (error) {
    console.log("Lỗi render giao diện đăng nhập");
  }
});

app.post("/loginUser", async (req, res) => {
  const loginUserName = req.body.loginUserName;
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;

  if(!loginUserName || !loginEmail || !loginPassword){
    res.render("user/login.hbs", {
      alert: "! You need to fill in all the information before login an account",
    });
  }

  if (!validator.isEmail(loginEmail)) {
    return res.render("user/login.hbs", {
      alert: "! Wrong email format (email@gmail.com)",
    });
  }

  try {
    const user = await loginModel.findOne({
      userName: loginUserName,
      email: loginEmail,
      password: loginPassword,
    });
    if (!user) {
      res.render("user/login.hbs", {
        alert: "! Wrong login information",
      });
      return;
    }
    res.render("project/home.hbs");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


//api mobile
app.post("/loginMbUser", async (req, res) => {
  const loginUserName = req.body.loginUserName;
  const loginEmail = req.body.loginEmail;
  const loginPassword = req.body.loginPassword;


  try {
    const user = await loginModel.findOne({
      userName: loginUserName,
      email: loginEmail,
      password: loginPassword,
    });
    if (!user) {
      res.status(500).json({login : false,message: "User undefind"});
      return;
    }

    res.status(200).json({login : true, message:"Login Success"});
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({login : false, message: "Something went wrong" });
  }
});

module.exports = app;
