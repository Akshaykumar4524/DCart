const UsersModel = require("./models/userModel");
const productModel = require("./models/productModel");
const cartModel = require("./models/cartModel");
const orderModel = require("./models/orderModel");

exports.addUser = async (req, res) => {
  const data = new UsersModel({
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const data = new productModel({
    productId: req.body.productId,
    productName: req.body.productName,
    productCode: req.body.productCode,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
    manufacturer: req.body.manufacturer,
    osType: req.body.osType,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addCart = async (req, res) => {
  const data = new cartModel({
    cartId: req.body.cartId,
    userName: req.body.userName,
    productsInCart: req.body.productsInCart,
    statusOfCart: req.body.statusOfCart,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addOrder = async (req, res) => {
  const data = new orderModel({
    orderId: req.body.orderId,
    cartId: req.body.cartId,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ messaghe: error.message });
  }
};
