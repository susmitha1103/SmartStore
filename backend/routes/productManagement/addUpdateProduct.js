const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const PRODUCT = require('../../database/productModel');
const adminAuthentication = require('../adminMiddleware');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add a new product
router.post('/addProduct', adminAuthentication, upload.single('image'), async (req, res) => {
  const { product_name, subcategory, category, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : '';

  if (!category || !subcategory || !product_name || !description || !price || !stock || !image) {
      return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
      const existingProduct = await PRODUCT.findOne({ product_name });
      if (existingProduct) {
          return res.status(400).json({ msg: 'Product already exists' });
      }

      const categoryObject = {
          _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the category
          name: category,
      };

      const subcategoryObject = {
          _id: new mongoose.Types.ObjectId(), 
          name: subcategory,
      };

      const newProduct = new PRODUCT({
          category: categoryObject, 
          subcategory: subcategoryObject, 
          product_name,
          description,
          price,
          stock,
          image,
          isAvailable: stock > 0,
      });

      await newProduct.save();
      res.json(newProduct);
  } catch (err) {
      console.error(err);
      res.status(500).send('Problem in adding products');
  }
});


// Update a product
router.put('/update/:id', adminAuthentication, upload.single('image'), async (req, res) => {
  const productId = req.params.id;
  const { category: categoryName, subcategory: subcategoryName, ...updatedProductData } = req.body; // Destructure names

  if (updatedProductData.stock !== undefined) {
    updatedProductData.isAvailable = updatedProductData.stock > 0;
  }

  if (req.file) {
    updatedProductData.image = req.file.filename;
  }

  try {
    // Fetch category and subcategory by name to get their respective IDs
    const category = await PRODUCT.findOne({ 'category.name': categoryName }); // Adjusted to match your schema
    const subcategory = await PRODUCT.findOne({ 'subcategory.name': subcategoryName }); // Adjusted to match your schema

    if (category) {
      updatedProductData.category = { _id: category._id, name: category.name }; // Assigning the entire category object or just ID based on your schema
    }
    if (subcategory) {
      updatedProductData.subcategory = { _id: subcategory._id, name: subcategory.name }; // Assigning the entire subcategory object or just ID based on your schema
    }

    const updatedProduct = await PRODUCT.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ msg: 'Product update failed', error: error.message });
  }
});


module.exports = router;
