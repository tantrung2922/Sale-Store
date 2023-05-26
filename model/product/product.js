const mongoose = require("mongoose");

const UIproductSchema = new mongoose.Schema({
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
  price: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "infoproduct",
  },
});

const UIProduct = mongoose.model("UIProduct", UIproductSchema);

module.exports = UIProduct;
