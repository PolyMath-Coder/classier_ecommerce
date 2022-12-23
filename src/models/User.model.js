const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { AppError } = require('../helpers/error');
const logger = require('../helpers/logger');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
    },
    stripe_customer_id: {
      type: String,
    },
    subscriptions: {
      type: Array,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.post('save', async function(doc, next) {
  logger.info(`the user was just created and saved, ${doc} `);
  next();
});

userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      throw new AppError(400, 'Oops! Incorrect Password');
    }
    return user;
  }
  logger.warn('You need to create an account');
  throw new AppError(
    400,
    "Perhaps you should register...You don't have an account"
  );
};

const User = mongoose.model('user', userSchema);
module.exports = User;
