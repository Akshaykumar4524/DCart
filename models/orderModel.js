const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  cartId: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("order", orderSchema);
