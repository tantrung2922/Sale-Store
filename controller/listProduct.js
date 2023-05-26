const express = require("express");
const app = express();
const infoProductModel = require("../model/product/inforproduct");
const multer = require("multer");
app.use(express.static("public/css/"));
app.use(express.static("public/images/"));

app.get("/rifleProduct", (req, res) => {
  try {
    infoProductModel.find({type: "rifle"}).then((rifleProduct) => {
      res.render("product/rifle.hbs", {
        rifleProduct: rifleProduct.map((rifleProduct) => rifleProduct.toJSON())
      });
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/rifleMbProduct", (req, res) => {
  try {
    infoProductModel.find({}).then((rifleProduct) => {
      res.json(rifleProduct);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/detail:id", async (req, res) => {
  try {
    const productDetail = await infoProductModel.findById(req.params.id);
    console.log(productDetail);
    res.render("product/detailProduct.hbs", {
      productDetail: productDetail.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
  }
});

app.get("/pistolProduct", (req, res) => {
  try {
    infoProductModel.find({type: "pistol"}).then((pistolProduct) => {
      res.render("product/pistol.hbs", {
        pistolProduct: pistolProduct.map((pistolProduct) => pistolProduct.toJSON())
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/otherProduct", (req, res) => {
  try {
    infoProductModel.find({type: "other"}).then((otherProduct) => {
      res.render("product/other.hbs", {
        otherProduct: otherProduct.map((otherProduct) => otherProduct.toJSON())
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/searchRifle", (req, res) => {
  const searchName = req.query.searchName;
  console.log(searchName);
  // Tìm kiếm user theo tên
  infoProductModel
    .find({ name: { $regex: searchName, $options: "i" } })
    .then((rifleProduct) => {
      const numResults = rifleProduct.length;
      res.render("product/rifle.hbs", {
        rifleProduct: rifleProduct.map((rifleProduct) =>
        rifleProduct.toJSON(),
        ),
        numResults: numResults
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/searchPistol", (req, res) => {
  const searchName = req.query.searchName;
  console.log(searchName);
  // Tìm kiếm user theo tên
  infoProductModel
    .find({ name: { $regex: searchName, $options: "i" } })
    .then((pistolProduct) => {
      const numResults = pistolProduct.length;
      res.render("product/pistol.hbs", {
        pistolProduct: pistolProduct.map((pistolProduct) =>
        pistolProduct.toJSON(),
        ),
        numResults: numResults
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});


app.get("/searchOther", (req, res) => {
  const searchName = req.query.searchName;
  console.log(searchName);
  // Tìm kiếm user theo tên
  infoProductModel
    .find({ name: { $regex: searchName, $options: "i" } })
    .then((otherProduct) => {
      const numResults = otherProduct.length;
      res.render("product/other.hbs", {
        otherProduct: otherProduct.map((otherProduct) =>
        otherProduct.toJSON(),
        ),
        numResults: numResults
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
