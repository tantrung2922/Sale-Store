const express = require("express");
const app = express();
const registerModel = require("../model/user/register");
const loginModel = require("../model/user/login");
const validator = require("validator");
const bodyParser = require("body-parser");
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get("/userManager", async (req, res) => {
  try {
    const listUser = await registerModel.find({});
    res.render("user/managerUser.hbs", {
      listUser: listUser.map((listUser) => listUser.toJSON()),
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/searchUser", (req, res) => {
  const searchName = req.query.searchName;
  console.log(searchName);
  // Tìm kiếm user theo tên
  registerModel
    .find({ userName: { $regex: searchName, $options: "i" } })
    .then((listUser) => {
      const numResults = listUser.length;
      res.render("user/managerUser.hbs", {
        listUser: listUser.map((listUser) => listUser.toJSON()),
        numResults: numResults,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/addUser", (req, res) => {
  try {
    res.render("user/addUser.hbs");
  } catch (error) {
    console.log("Lỗi render giao diện đăng kí");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/addUser", upload.single("avatar"), (req, res) => {
  if (
    !req.body.email ||
    !req.body.userName ||
    !req.body.fullName ||
    !req.body.password ||
    !req.body.rePassword ||
    !req.body.birthday ||
    !req.body.phoneNumber
  ) {
    return res.render("user/addUser.hbs", {
      alert:
        "! You need to fill in all the information before registering an account",
    });
  }

  if (req.body.password != req.body.rePassword) {
    return res.render("user/addUser.hbs", {
      alert: "! Incorrect password",
    });
  }

  if (!validator.isEmail(req.body.email)) {
    return res.render("user/addUser.hbs", {
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
    res.redirect("/managerUser/userManager");
  } catch (error) {
    res.status(500).send(error);
    console.log("Lỗi bảng User");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const userUpdate = await registerModel.findById(req.params.id);
    console.log(userUpdate);
    res.render("user/updateUser.hbs", {
      userUpdate: userUpdate.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi serverrrr");
  }
});

app.post("/updateUser", upload.single("image"), async (req, res) => {
  try {
    if (
      !req.body.userName ||
      !req.body.password ||
      !req.body.email ||
      !req.body.avatar
    ) {
      return res.render("user/updateUser.hbs", {
        alert: "! You have not entered enough information",
      });
    }

    if (req.body.password != req.body.rePassword) {
      return res.render("user/updateUser.hbs", {
        alert: "! password error",
      });
    }
    const userUpdate = await registerModel.findByIdAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );

    const loginUpdate = await loginModel.findOneAndUpdate(
      { userId: req.body.id },
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );

    if (!userUpdate || !loginUpdate) {
      res.status(404).send("Không tìm thấy sản phẩm");
    } else {
      res.redirect("/managerUser/userManager");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/del/:id", async (req, res) => {
  try {
    let u = req.params.id;
    console.log(u);
    const delUser = await registerModel.findByIdAndDelete(
      req.params.id,
      req.body
    );
    const dellogin = await loginModel.findOneAndDelete({
      userId: req.params.id,
    });
    // res.redirect("managerUser");

    if (!delUser) res.status(404).send("No user found");
    else {
      res.redirect("/managerUser/userManager");
    }
  } catch (error) {}
});

module.exports = app;
