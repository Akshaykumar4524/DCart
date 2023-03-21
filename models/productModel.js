const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  osType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
