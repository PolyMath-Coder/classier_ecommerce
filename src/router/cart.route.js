const { Router } = require('express');
const router = Router();

const {
  produceCart,
  updatedCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require('../controllers/cart.controller');

router.post('/cart', produceCart);
router.put('/', updatedCart);
router.delete('/:userId', deleteCart);
router.get('/', getUserCart);
router.get('/', getAllCarts);

module.exports = router;
