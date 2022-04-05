const User = require('../models/User.model');
const AppError = require('../helpers/error');
const { responseHandler, registerErrorHandler } = require('../helpers/error');
const logger = require('../helpers/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { findByIdAndDelete } = require('../models/User.model');
const secretKey = process.env.JSONWEB_SECRET;

const maxAge = 2 * 24 * 60 * 60 * 1000;

const registerUser = async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).send({ data: savedUser });
    logger.info('You have just created an account with us...');
  } catch (err) {
    const errors = registerErrorHandler(err);
    res.status(400).json(errors);
    logger.error(errors);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      secretKey,
      {
        expiresIn: maxAge,
      }
    );
    const verfiedUser = user._doc;
    res.status(200).json({ ...verfiedUser, accessToken });
    logger.info('You are now logged in...');
  } catch (err) {
    res.status(400).json({ error: err.message });
    logger.warn(err.message);
  }
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const { id } = req.params;
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      options
    );
    res.status(200).json({ data: updatedUser });
    logger.info("User's detail(s) now updated.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await User.findByIdAndDelete(id);
    res.status(200).json('User does not exist any longer.');
    logger.warn('User has been deleted');
  } catch (err) {
    logger.error(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json({ data: others });
    logger.info('API displays details of a preferred user.');
  } catch (err) {
    logger.error(err);
  }
};

const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find()
          .sort({ _id: -1 })
          .limit(1)
      : await User.find();
    res.status(200).json({ data: users });
  } catch (e) {
    res.status(400).send({ error: err.message });
    logger.error("Can't get all users");
  }
};

//GET USER STATS

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: `$createdAt` },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ result: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserStats,
  getUser,
};
