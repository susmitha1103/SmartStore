import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    category: '',
    product_name: '',
    subcategory: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [subcategoryError, setSubcategoryError] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image') {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const formData = new FormData();

    setCategoryError(false);
    setSubcategoryError(false);
    setProductNameError(false);
    setDescriptionError(false);
    setPriceError(false);
    setStockError(false);
    setError('');

    let hasError = false;

    if(!productData.category || productData.category.length < 6 || productData.category.length >16){
      setCategoryError(true);
      hasError = true;
    }

    if(!productData.subcategory || productData.subcategory.length < 6 || productData.subcategory.length >16){
      setSubcategoryError(true);
      hasError = true;
    }

    if(!productData.product_name || productData.product_name.length < 6 || productData.product_name.length >16){
      setProductNameError(true);
      hasError = true;
    }

    if(!productData.description || productData.description.length < 6 || productData.description.length >45){
      setDescriptionError(true);
      hasError = true;
    }

    if(!productData.stock || productData.stock < 0 || productData.stock >1000){
      setStockError(true);
      hasError = true;
    }

    if(!productData.price || productData.price< 5 || productData.price >20000){
      setPriceError(true);
      hasError = true;
    }

    if (hasError) return;
    
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('product_name', productData.product_name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('image', productData.image);

    try {
      const response = await axios.post('http://localhost:3000/api/products/addProduct', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Product added successfully');
        navigate('/products');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding product', error);
      setError('Failed to add product. Please try again.');
    }
  };

  const resetForm = () => {
    setProductData({
      category: '',
      subcategory: '',
      product_name: '',
      description: '',
      price: '',
      stock: '',
      image: null,
    });
  };

  return (
    <Container sx={{ maxWidth: 600, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Product</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
          id="category"
          name="category"
          label="Category"
          variant="outlined"
          value={productData.category}
          onChange={handleChange}
          required
          error={categoryError}
            helperText={categoryError ? 'Category name must be between 6 and 16 characters' : ''}
        />
        <TextField
          id="subcategory"
          name="subcategory"
          label="Sub-Category"
          variant="outlined"
          value={productData.subcategory}
          onChange={handleChange}
          required
          error={subcategoryError}
            helperText={subcategoryError ? 'Sub-Category name must be between 6 and 16 characters' : ''}
        />
        <TextField
          id="product_name"
          name="product_name"
          label="Product Name"
          variant="outlined"
          value={productData.product_name}
          onChange={handleChange}
          required
          error={productNameError}
            helperText={productNameError ? 'Product name must be between 6 and 16 characters' : ''}
        />
        
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={productData.description}
          onChange={handleChange}
          required
          error={descriptionError}
            helperText={descriptionError ? 'Description must be between 6 and 45 characters' : ''}
        />
        <TextField
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          value={productData.price}
          onChange={handleChange}
          required
          error={priceError}
            helperText={priceError? 'Price must be between 5 and 20000' : ''}
        />
        <TextField
          id="stock"
          name="stock"
          label="Stock"
          variant="outlined"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          required
          error={stockError}
            helperText={stockError? 'Stock must be between 0 and 1000' : ''}
        />
        <input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
