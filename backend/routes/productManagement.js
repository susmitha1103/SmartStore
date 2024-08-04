const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const PRODUCT = require('../database/productModel');
const adminAuthentication = require('./adminMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the filename
  }
});

const upload = multer({ storage: storage });

router.post('/addProduct', adminAuthentication, upload.single('image'), async (req, res) => {
  const { product_name, category, description, price, stock } = req.body;
  const image = req.file ? req.file.path : '';

  console.log("Received the post req from AddProduct", req.body);

  if (!product_name || !category || !description || !price || !stock) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if the product already exists
    const existingProduct = await PRODUCT.findOne({ product_name });
    if (existingProduct) {
      return res.status(400).json({ msg: 'Product already exists' });
    }

    // Create a new product if not a duplicate
    let newProduct = new PRODUCT({
      product_name,
      category,
      description,
      price,
      stock,
      image,
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Problem in adding products");
  }
});
router.post('/update/:id',adminAuthentication, async(req,res)=>{
  const { product_name, category, description, price, stock, image } = req.body;
  try{
    const product = await PRODUCT.findById(req.params.id);
    if(!product){
      return res.status(404).json({msg: 'product not found'});
    }
    //update the products
    product.product_name = product_name || product.product_name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.Image = image || product.Image;

    // Save the updated product
    await product.save();

    res.json({ msg: 'Product updated successfully', product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  } 
});
router.delete('/removeProduct/:id', adminAuthentication, async (req, res) => {
  try {
    const product = await PRODUCT.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/:id', async(req,res) =>{
  console.log("At get product by id");
  try{
    const product = await PRODUCT.findById(req.params.id);
    if(!product){
      return res.status(404).json({msg: 'Product not found'});
    }
    res.json(product);
  }
  catch(err){
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;