const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

const productSchema = new Schema(
  {
    category: {
      type: categorySchema,
      required: true,
    },
    subcategory: {
      type: categorySchema,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('PRODUCT', productSchema);
