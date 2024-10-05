import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';

const UpdateProductDetails = ({ product, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState(product);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image ? `http://localhost:3000/uploads/${product.image}` : '');
  const [categories, setCategories] = useState([]); // Store categories
  const [subcategories, setSubcategories] = useState([]); // Store subcategories

  useEffect(() => {
    // Fetch categories and subcategories when the component mounts
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` // Include token in the headers
          }
        };
        const response = await axios.get('http://localhost:3000/api/products/category/categories',config); // Use your correct endpoint
        const { categories, subcategories } = response.data;
        setCategories(categories);
        setSubcategories(subcategories);
      } catch (error) {
        console.error('Error fetching categories and subcategories', error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setProductData({ ...productData, category: selectedCategory });
  };

  const handleSubcategoryChange = (event) => {
    const selectedSubcategory = event.target.value;
    setProductData({ ...productData, subcategory: selectedSubcategory });
  };

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        alert('File size exceeds 2MB');
        return;
      }
      setSelectedImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('category', productData.category);
    formData.append('subcategory', productData.subcategory);
    formData.append('product_name', productData.product_name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('stock', productData.stock);

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(`http://localhost:3000/api/products/addUpdate/update/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('Product updated successfully!');
      onUpdate(response.data.product);
      setOpen(false);
    } catch (error) {
      console.error('Error updating product', error);
      alert('Failed to update product');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            name="category"
            label="Category"
            value={productData.category}
            onChange={handleCategoryChange}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            margin="dense"
            name="subcategory"
            label="Sub-Category"
            value={productData.subcategory}
            onChange={handleSubcategoryChange}
            fullWidth
          >
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory._id} value={subcategory.name}>{subcategory.name}</MenuItem>
            ))}
          </TextField>

          <TextField
            autoFocus
            margin="dense"
            name="product_name"
            label="Product Name"
            value={productData.product_name}
            onChange={handleInputChange}
            fullWidth
          />
          
          <TextField
            margin="dense"
            name="description"
            label="Description"
            value={productData.description}
            onChange={handleInputChange}
            fullWidth
          />
          
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            value={productData.price}
            onChange={handleInputChange}
            fullWidth
          />
          
          <TextField
            margin="dense"
            name="stock"
            label="Stock"
            type="number"
            value={productData.stock}
            onChange={handleInputChange}
            fullWidth
          />

          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: '20px' }}
          />
          {imagePreview && <img src={imagePreview} alt="Product Preview" style={{ width: '100px', marginTop: '20px' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateProductDetails;
