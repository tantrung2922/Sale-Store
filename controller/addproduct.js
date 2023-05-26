const express = require("express");
const app = express();
const infoProductModel = require("../model/product/inforproduct");
const ProductModel = require("../model/product/product");
const multer = require("multer");
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get("/addProduct", (req, res) => {
  try {
    res.render("product/addproduct.hbs");
  } catch (error) {
    console.log("Lỗi render giao diện thêm sản phẩm");
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

app.post("/addProduct",upload.single('image'), (req, res) => {
  const addProduct = new infoProductModel({
    image: req.body.image,
    image2: req.body.image2,
    image3: req.body.image3,
    avataProduct: req.body.avataProduct,
    name: req.body.name,
    height: req.body.height,
    width: req.body.width,
    weight: req.body.weight,
    length: req.body.length,
    type: req.body.type,
    color: req.body.color,
    country: req.body.country,
    companyName: req.body.companyName,
    price: req.body.price,
    quantity: req.body.quantity,
    typeBullet: req.body.typeBullet
  });

  const addUIProduct = new ProductModel({
    avataProduct: addProduct.avataProduct,
    name: addProduct.name,
    height: addProduct.height,
    width: addProduct.width,
    length: addProduct.length,
    weight: addProduct.weight,
    price: addProduct.price,
    productId: addProduct._id,
  });

  if(!req.body.image || !req.body.name ||!req.body.price ||!req.body.quantity ){
    return res.render("product/addproduct.hbs", {
      alert:
        "! You have not entered enough information",
    });
  }

  if(req.body.quantity <= 0){
    return res.render("product/addproduct.hbs", {
      alert:
        "! Number of products must be greater than 0",
    });
  }

  try {
    addProduct.save();
    addUIProduct.save();
    res.redirect("/managerProduct/manager")
  } catch (error) {
    res.status(500).send(error);
    console.log("Lỗi bảng addProduct");
  }
});

module.exports = app;
