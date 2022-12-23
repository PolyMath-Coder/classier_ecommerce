const Cart = require('../models/Cart.model');
const logger = require('../helpers/logger');

const produceCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json({ data: savedCart });
    logger.info('Cart successfully created');
  } catch (err) {
    res.status(400).send({ error: err });
    logger.error('Error creating cart.');
  }
};

const updatedCart = async (req, res) => {
  const updateCart = req.body;
  const { id } = req.params;
  const options = { new: true };
  try {
    const updated = await Cart.findByIdAndUpdate(
      id,
      { $: updateCart },
      options
    );
    res.status(200).json({ data: updated });
    logger.info('Cart now updated...');
  } catch (err) {
    res.status(400).json({ error: err });
    logger.error('Failed to update...');
  }
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCart = await Cart.findByIdAndDelete(id);
    res.status(200).json({ data: deletedCart });
    logger.info('Cart was just deleted...');
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getUserCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const getCart = await Cart.findOne({ userid: userId });
    res.status(200).json({ data: getCart });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(201).json({ data: carts });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  produceCart,
  getAllCarts,
  updatedCart,
  getUserCart,
  deleteCart,
};
