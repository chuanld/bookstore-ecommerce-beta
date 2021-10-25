const Orders = require("../models/orderModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const orderCtrl = {
  getOrder: async (req, res) => {
    try {
      const orders = await Orders.find();
      res.json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const { cart, orderID, address, option } = req.body;
      const { _id, name, email } = user;

      const newOrder = new Orders({
        user_id: _id,
        name,
        email,
        cart,
        orderID,
        address,
        option,
      });
      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      await newOrder.save();
      res.json({ newOrder });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = orderCtrl;
