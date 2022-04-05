const router = require('express').Router();
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserStats,
} = require('../controllers/auth.controller');
const {
  userSignUpValidator,
  userLoginValidator,
} = require('../helpers/validate');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../helpers/jwt');

// const router = Router();

router.post('/register', userSignUpValidator, registerUser);
router.post('/login', userLoginValidator, loginUser);
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/find/:id', verifyTokenAndAdmin, getUser);
router.get('/users', getAllUsers);
router.get('/stats', getUserStats);

module.exports = router;
