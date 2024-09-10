const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const PRODUCT = require('../database/productModel');
const adminAuthentication = require('./adminMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

router.post('/addProduct', adminAuthentication, upload.single('image'), async (req, res) => {
  const { product_name, category, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : '';

  console.log("Received the post req from AddProduct", req.body);
  console.log("Uploaded file details:", req.file);

  if (!product_name || !category || !description || !price || !stock || !image) {
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
    console.log("Saving product with image:", newProduct);

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Problem in adding products");
  }
});
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    console.log("received the put request form UpdateProductDetails");
    console.log("ProductId", productId);
    console.log("received updates", updatedProductData)

    if (req.file) {
      console.log("Received file for image: ", req.file.filename);
      updatedProductData.image = req.file.filename;
    } else {
      console.log("No file received");
    }
    
    const updatedProduct = await PRODUCT.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!updatedProduct) {
      console.log("product not found during update attempt");
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ msg: 'Product update failed', error: error.message });
  }
});


router.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await PRODUCT.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ msg: 'Product deleted successfully' });
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
router.get('/', async (req, res) => {
  try {
    const products = await PRODUCT.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

module.exports = router;