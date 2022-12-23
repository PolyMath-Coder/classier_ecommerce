const Order = require('../models/Order.model');
const logger = require('../helpers/logger');

const createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const savedorder = await order.save();
    res.status(200).json({ data: savedorder });
  } catch (err) {
    res.status(400).json({ err: error });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const options = { new: true };

  const updatedorder = await Order.findByIdAndUpdate(
    id,
    { $set: update },
    options
  );

  try {
    res.status(200).json({ data: updatedorder });
  } catch (err) {
    res.status(400).json({ err: error });
  }
};

const deleteOrderedItem = async (req, res) => {
  const { id } = req.params;
  const deletingorder = req.body;
  const options = { new: true };

  try {
    const deletedorder = await Order.findByIdAndDelete(
      id,
      deletingorder,
      options
    );
    res.status(200).json({ data: deletedorder });
  } catch (err) {
    res.status(400).json({ err: error });
  }
};
const getOrder = async (req, res) => {
  const { userId } = req.params;
  try {
    const order = await Order.find({ userId: userId });
    res.status(200).json({ data: order });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({ data: order });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
//GET MONTHLY INCOME

const getIncome = async (req, res) => {
  const date = new Date();
  const lastmonth = new Date(new Date().setMonth(date.getMonth() - 1));
  const twoMonthsBefore = new Date(date.setMonth(lastmonth.getMonth() - 1));
  // console.log(`${lastmonth}`);
  // const lastMonth = new Date(new Date().setMonth());

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: twoMonthsBefore } } },
      {
        $project: { month: { $month: '$createdAt' }, $sales: '$amount' },
      },
      {
        $group: { _id: '$month' },
        total: { $sum: '$sales' },
      },
    ]);
    res.status(200).json({ data: income });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

module.exports = {
  createOrder,
  getIncome,
  getAllOrders,
  updateOrder,
  deleteOrderedItem,
  getOrder,
};
