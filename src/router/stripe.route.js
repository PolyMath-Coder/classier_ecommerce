const { Router } = require('express');
const router = Router();
const stripe = require('stripe');

router.post('/payment');

module.exports = router;
