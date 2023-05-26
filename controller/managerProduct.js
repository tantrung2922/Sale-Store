const express = require("express");
const app = express();
const infoProductModel = require("../model/product/inforproduct");
const ProductModel = require("../model/product/product");
const multer = require("multer");

app.use(express.static("public/css"));
app.use(express.static("public/images"));

app.get("/manager", async (req, res) => {
  try {
    const infoProduct = await infoProductModel.find({});
    res.render("product/manager.hbs", {
      infoProduct: infoProduct.map((infoProduct) => infoProduct.toJSON()),
    });
  } catch (error) {
    console.log(error);
  }
});


app.get("/search", (req, res) => {
  const searchName = req.query.searchName;
  console.log(searchName);
  // Tìm kiếm user theo tên
  infoProductModel
    .find({ name: { $regex: searchName, $options: "i" } })
    .then((infoProduct) => {
      const numResults = infoProduct.length;
      res.render("product/manager.hbs", {
        infoProduct: infoProduct.map((infoProduct) => infoProduct.toJSON()),
        numResults: numResults,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/deleteProduct/:id", async (req, res) => {
  try {
    const deletedProduct = await infoProductModel.findByIdAndDelete(
      req.params.id
    );
    const delProductModel = await ProductModel.findOneAndDelete({
      productId: req.params.id,
    });
    if (!deletedProduct) {
      res.status(404).send("Không tìm thấy sản phẩm");
    } else {
      res.redirect("/managerProduct/manager");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const productUpdate = await infoProductModel.findById(req.params.id);
    console.log(productUpdate);
    if (!productUpdate) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }
    res.render("product/editProduct.hbs", {
      productUpdate: productUpdate.toJSON(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error + "Lỗi serverrrr");
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

app.post("/updateProduct", upload.single("image"), async (req, res) => {
  try {
    if (
      !req.body.image ||
      !req.body.name ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.render("product/editProduct.hbs", {
        alert: "! You have not entered enough information",
      });
    }

    if (req.body.quantity <= 0) {
      return res.render("product/editProduct.hbs", {
        alert: "! Number of products must be greater than 0",
      });
    }
    const updatedProduct = await infoProductModel.findByIdAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true }
    );

    const UpdateUIProduct = await ProductModel.findOneAndUpdate(
      { productId: req.body.id },
      {
        avataProduct: req.body.avataProduct,
        name: req.body.name,
        height: req.body.height,
        width: req.body.width,
        length: req.body.length,
        weight: req.body.weight,
        price: req.body.price,
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).send("Không tìm thấy sản phẩm");
    } else {
      res.redirect("/managerProduct/manager");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
