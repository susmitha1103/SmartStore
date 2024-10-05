const express = require('express');
const router = express.Router();
const PRODUCT = require('../../database/productModel');
const adminAuthentication = require('../adminMiddleware');

// Get distinct categories and subcategories
router.get('/categories', adminAuthentication, async (req, res) => {
  try {
    const categories = await PRODUCT.aggregate([
      { $group: { _id: "$category._id", name: { $first: "$category.name" } } }
    ]);

    const subcategories = await PRODUCT.aggregate([
      { $group: { _id: "$subcategory._id", name: { $first: "$subcategory.name" } } }
    ]);

    res.json({
      categories,
      subcategories    
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching categories and subcategories' });
  }
});

module.exports = router;
