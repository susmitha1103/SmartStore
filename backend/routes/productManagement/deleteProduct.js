const express = require('express');
const router = express.Router();
const PRODUCT = require('../../database/productModel');
const adminAuthentication = require('../adminMiddleware');

// Delete a product
router.delete('/deleteProduct/:id', adminAuthentication, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await PRODUCT.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
