import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    image: null,
  });

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    const formData = new FormData();
    formData.append('product_name', productData.product_name);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);
    formData.append('image', productData.image);
    try {
      const response = await axios.post('http://localhost:3000/api/products/addProduct', formData, {
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data) {
        alert("Product added successfully");
      }
      setProductData({
        product_name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image: null,
      });
    } catch (error) {
      console.error('Error adding product', error);
      alert('Failed to add product');
    }
  };

  return (
    <Container sx={{ maxWidth: 600, mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Product</Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          name="product_name"
          label="Product Name"
          variant="outlined"
          value={productData.product_name}
          onChange={handleChange}
          required
        />
        <TextField
          name="category"
          label="Category"
          variant="outlined"
          value={productData.category}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={productData.description}
          onChange={handleChange}
          required
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <TextField
          name="stock"
          label="Stock"
          variant="outlined"
          type="number"
          value={productData.stock}
          onChange={handleChange}
          required
        />
        <input
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
      </form>
    </Container>
  );
};

export default AddProduct;
