const mongoose = require('mongoose');
require('dotenv').config();
const mongoString = process.env.MONGO_URI;
const logger = require('../helpers/logger');
const connect = () => {
  mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  database = mongoose.connection;

  database.on('error', (e) => {
    logger.error(e);
    logger.error('Oops! An error occurred');
  });

  database.once('connected', () => {
    logger.info('Database now plugged in...');
  });
};
module.exports = connect;
