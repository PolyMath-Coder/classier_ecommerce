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
const Redis = require('ioredis');
const redis = new Redis();

const { cache } = require('../helpers/redis');

// const router = Router();

router.post('/register', registerUser);
router.post('/login', userLoginValidator, loginUser);
router.put('/:id', verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/find/:id', cache, getUser);
router.get('/users', getAllUsers);
router.get('/stats', getUserStats);

module.exports = router;
