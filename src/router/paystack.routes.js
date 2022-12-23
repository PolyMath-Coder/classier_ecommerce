const { Router } = require('express');
const router = Router();

const {
  initiatePayment,
  confirmPayment,
} = require('../controllers/paystack.controller');

router.post('/paystack', initiatePayment);
router.get('/paystack/callback', confirmPayment);

module.exports = router;
