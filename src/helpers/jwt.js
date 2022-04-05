const jwt = require('jsonwebtoken');
const logger = require('./logger');
require('dotenv').config();
const secretKey = process.env.JSONWEB_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) res.status(400).json('Token is not valid...');
      logger.error('Your token does not seem valid.');
      req.user = user;
      next();
    });
  } else {
    return res.status(400).send('You are not authenticated.');
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(400).json('Oopss! You are not authorized to do that');
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(400)
        .json('Oopss! You are not authorized to do that as a non-admin');
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};