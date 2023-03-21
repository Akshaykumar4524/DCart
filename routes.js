const express = require("express");
const controller = require("./controller");
const route = express.Router();
route.post("/signup", controller.addUser);
route.post("/product", controller.addProduct);
route.post("/cart", controller.addCart);
route.post("/order",controller.addOrder);
route.get("/login",controller.getUser)
module.exports = route;
