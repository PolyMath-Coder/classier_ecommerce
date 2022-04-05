const Product = require('../models/Product.model');
const { createProductHandler } = require('../helpers/error');
const User = require('../models/User.model');

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ data: savedProduct });
  } catch (err) {
    const errors = createProductHandler(err);
    res.status(400).json({ error: errors });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductInfo = req.body;
    const options = { new: true };
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updatedProductInfo },
      options
    );
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const query = req.query.new;
  const categoryQuery = req.query.category;
  try {
    let products;
    if (query) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .select({ img: 0, size: 0, color: 0 })
        .limit(2)
        .exec();
    } else if (categoryQuery) {
      products = await Product.find({ categories: { $in: [categoryQuery] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  try {
    res.status(200).json({ data: deletedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
