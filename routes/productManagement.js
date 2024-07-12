const express = require('express');
const router = express.Router();
const PRODUCT = require('../database/productModel');
const adminAuthentication = require('./adminMiddleware');

router.post('/addProduct',adminAuthentication, async(req,res) =>{
  const{product_name,category, description, price, stock,image} = req.body;

  if (!product_name || !category || !description || !price || !stock) {
    return res.status(400).json({ msg: 'All fields are required' });
  }
  try{
    let newProduct = new PRODUCT({
      product_name,
      category,
      description,
      price,
      stock,
      image
    }
    )
    await newProduct.save();
    res.json(newProduct);
  }
  catch(err){
    console.error(err.message);
    res.status(500).send("Problem in adding products");
  }
})
router.get('/:id', async(req,res) =>{
  try{
    const product = await PRODUCT.findById(req.params.id);
    if(!product){
      return res.status(404).json({msg: 'Product not found'})
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
})

module.exports = router;