const { Router } = require('express');
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { newProductValidator } = require('../helpers/validate');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../helpers/jwt');
const router = Router();

//CREATE PRODUCT
router.post('/', verifyTokenAndAdmin, createProduct);
router.put('/:id', verifyTokenAndAdmin, updateProduct);
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);
router.get('/find/', verifyToken, getAllProducts);
//

module.exports = router;
