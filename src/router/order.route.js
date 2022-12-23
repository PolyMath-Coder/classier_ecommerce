const { Router } = require('express');

const router = Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../helpers/jwt');
const {
  createOrder,
  getOrder,
  deleteOrderedItem,
  getAllOrders,
  updateOrder,
  getIncome,
} = require('../controllers/order.controller');

router.post('/', verifyToken, createOrder);
router.put('/:id', verifyTokenAndAdmin, updateOrder);
router.delete('/:id', verifyTokenAndAuthorization, deleteOrderedItem);
router.get('/find/:userId', verifyTokenAndAuthorization, getOrder);
router.get('/find', getAllOrders);
router.get('/income', getIncome);

module.exports = router;
