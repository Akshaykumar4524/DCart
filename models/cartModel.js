const mongoose = require("mongoose");
const product = require('../productType');
const cartSchema = mongoose.Schema({
  cartId: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  productsInCart: {
    type: [product.product],
    required: true,
  },
  statusOfCart: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cart", cartSchema);
