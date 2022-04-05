const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      isArray: true,
    },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// const customValidator = (async (categories, { req }) => {
//   if (!Array.isArray(categories)) {
//       return true; // let the base isArray: true validation take over.
//   }

//   if(!categories) {
//       throw Error('Kindly input a category');
//   }

//   // validate at your will here.

//   return true;

const Product = mongoose.model('product', productSchema);
module.exports = Product;
