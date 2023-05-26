const express = require("express");
const mongoose = require("mongoose");
const expressHbs = require("express-handlebars");
const bodyParser = require("body-parser");
const url ="mongodb+srv://trungntpk02230:trungntpk02230@cluster0.vapv8hr.mongodb.net/DataShopGun?retryWrites=true&w=majority";
const app = express();
const register = require('./controller/registerUser');
const login = require('./controller/loginUser');
const home = require('./controller/home');
const listProduct = require('./controller/listProduct');
const addProduct = require('./controller/addproduct');
const managerProduct = require('./controller/managerProduct');
const managerUser = require('./controller/managerUser');
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.engine(".hbs", expressHbs.engine());
app.set("view engine", ".hbs");

// Khởi tạo và sử dụng body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

app.use("/register/", register);
app.use("/login/", login);
app.use("/", home);
app.use("/product/", addProduct);
app.use("/productList/", listProduct);
app.use("/managerProduct/", managerProduct);
app.use("/managerUser/", managerUser);

app.listen(8000, () => {
  console.log("Server is running!");
});


