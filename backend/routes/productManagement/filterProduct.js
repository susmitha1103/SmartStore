const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PRODUCT = require('../../database/productModel');
const adminAuthentication = require('../adminMiddleware');

// Filter products
router.get('/filter-products', adminAuthentication, async (req, res) => {
  try {
    const { category, subcategory, product_name, price, stock, isAvailable, sortOrder } = req.query;
    let filter = {};

    // Filter based on category _id or name
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        filter['category._id'] = category;  // Filter by category ID
      } else {
        filter['category.name'] = category; // Filter by category name
      }
    }

    // Filter based on subcategory _id or name
    if (subcategory) {
      if (mongoose.Types.ObjectId.isValid(subcategory)) {
        filter['subcategory._id'] = subcategory;  // Filter by subcategory ID
      } else {
        filter['subcategory.name'] = subcategory; // Filter by subcategory name
      }
    }

    // Filter by product_name, price, stock, etc.
    if (product_name) filter.product_name = product_name;
    if (price) filter.price = price;
    if (stock) filter.stock = stock;
    if (isAvailable) filter.isAvailable = isAvailable === 'true';

    // Sort by price
    const sortPriceOrder = sortOrder === 'desc' ? -1 : 1;
    const products = await PRODUCT.find(filter).sort({ price: sortPriceOrder });

    res.json(products);
  } catch (err) {
    console.error("Error occurred:", err);  // Log the error
    
    // Respond with error message and log stack trace
    res.status(500).json({ error: err.message });

  }
});


module.exports = router;
