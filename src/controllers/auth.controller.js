const User = require('../models/User.model');
const AppError = require('../helpers/error');
const { responseHandler, errorHandler } = require('../helpers/error');
const logger = require('../helpers/logger');
const { body, validationResult } = require('express-validator');

const registerUser = async (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).send({ data: savedUser });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json(errors);
    logger.error(errors);
  }
};

module.exports = { registerUser };
