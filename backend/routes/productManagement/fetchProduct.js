const express = require('express');
const router = express.Router();
const PRODUCT = require('../../database/productModel');
const adminAuthentication = require('../adminMiddleware');

// Get product by ID
router.get('/:id', adminAuthentication, async (req, res) => {
  try {
    const product = await PRODUCT.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all products
router.get('/', adminAuthentication, async (req, res) => {
  try {
    const products = await PRODUCT.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching products' });
  }
});

module.exports = router;
