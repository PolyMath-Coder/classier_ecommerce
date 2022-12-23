const express = require('express');
require('dotenv').config();
const connect = require('./config/mongoose');
const logger = require('./helpers/logger');
const { json, urlencoded } = require('body-parser');
const request = require('request');
const port = process.env.PORT;
const Redis = require('ioredis');
const redis = new Redis();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the open page... Yeaaa!');
});

app.use('/v1', require('./router/route'));

app.listen(port, () => {
  logger.info(`Server up and running on port ${port}`);
});

connect();
