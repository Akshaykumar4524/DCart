const UsersModel = require("./models/userModel");
const productModel = require("./models/productModel");
const cartModel = require("./models/cartModel");
const orderModel = require("./models/orderModel");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  const { username, password, phoneNumber, email } = req.body;
  const data = new UsersModel({
    username,
    password: await bcrypt.hash(password, 10),
    phoneNumber,
    email,
  });
  try {
    const user = await UsersModel.findOne({ username });
    if (user) {
      res.status(400).json({
        message: `User already Registered with username: ${data.username} Please Login or use different username`,
      });
    } else {
      const dataToSave = await data.save();
      dataToSave.message = `User Registration Successfull with Name:${dataToSave.username}`;
      res.status(200).json(dataToSave);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await UsersModel.findOne({ username });
    if (data) {
      const check = await bcrypt.compare(password, data.password);
      if (!check) {
        res
          .status(400)
          .json({ message: "Please Check your Password and try again !!!" });
      } else {
        res.status(200).json({ message: "Login Success" });
      }
    } else {
      res.status(400).json({ message: "Fail Please check your Credentials" });
    }
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

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const data = await productModel.findOneAndDelete({ productId: productId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTablets = async (req, res) => {
  try {
    const data = await (
      await productModel.find()
    ).filter((product) => {
      return product.productCode.startsWith("TAB");
    });

    if (data && data.length) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "No Tablets available" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMobiles = async (req, res) => {
  try {
    const data = await (
      await productModel.find()
    ).filter((product) => {
      return product.productCode.startsWith("MOB");
    });

    if (data && data.length) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "No Mobiles available" });
    }
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
    quantity: 1,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userName = req.params.userName;

    const data = await cartModel.findOne({ userName });

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "No cart under this username" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.putCart = async (req, res) => {
  try {
    const userName = req.params.userName;
    const data = await cartModel.findOne({ userName });

    if (data) {
      const productsInCart = data.productsInCart;
      const productInBody = req.body.productsInCart;
      productInBody.forEach((ele) => {
        const check_index = productsInCart.findIndex(
          (item) => item.productId === ele.productId
        );
        if (check_index !== -1) {
          productsInCart[check_index].quantity += ele.quantity;
        } else {
          productsInCart.push(ele);
        }
      });
      data.productsInCart = productsInCart;
      const updated = await cartModel.findOneAndUpdate({ userName }, data);
      res.status(200).json(updated);
    } else {
      res.status(400).json({ message: "can not find cart with user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const userName = req.params.userName;
    const data = await cartModel.findOneAndUpdate(
      { userName },
      { statusOfCart: "close" }
    );
    const cartId = data.cartId;
    const orderId = req.body.orderId;
    const order = new orderModel({
      orderId: orderId,
      cartId: cartId,
    });
    const dataToSave = await order.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ messaghe: error.message });
  }
};
