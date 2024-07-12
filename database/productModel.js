const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    product_name:{
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
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
    Image: {
      type: String,
    }
  },
  {
    timestamps : true,
  },
)

module.exports = mongoose.model('PRODUCT', productSchema);