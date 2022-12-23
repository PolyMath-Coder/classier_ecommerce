const { Router } = require('express');

const router = Router();
const {
  getSubscription,
  createSubscription,
  subscriptionStatus,
} = require('../controllers/subscriptions.controller');

const { verifyToken } = require('../helpers/jwt');

// router.post('/create', verifyToken, getSubscription);
router.get('/get', getSubscription);
router.post('/create', verifyToken, createSubscription);
router.get('/subscription-status', verifyToken, subscriptionStatus);

module.exports = router;
