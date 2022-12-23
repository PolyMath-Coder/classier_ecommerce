const { Router } = require('express');

const router = Router();

// const router = require('express').Router();

const cartRoute = require('./cart.route.js');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const apiRoute = require('./authRoute');

router.use('/auth', apiRoute);
router.use('/api', cartRoute);
router.use('/api', userRoute);
router.use('/api/products', productRoute);
router.use('/api/orders', orderRoute);
router.use('/sub', require('./subscriptions.route'));
router.use('/pay', require('./paystack.routes'));

module.exports = router;
