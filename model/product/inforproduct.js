const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  avataProduct: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  companyName: {
    type: String,
  },
  country: {
    type: String,
  },
  color: {
    type: String,
  },
  type: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  typeBullet:{
    type: String,
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
