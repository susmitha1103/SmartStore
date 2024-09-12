const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategory:{
      type: String,
      required: true
    },
    product_name:{
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    price:{
      type: Number,
      required: true,
    },
    stock:{
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  {
    timestamps : true,
  },
)

module.exports = mongoose.model('PRODUCT', productSchema);