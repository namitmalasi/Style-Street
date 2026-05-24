import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;

    const order = await Order.create({
      user: req.user._id,

      orderItems,

      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
