import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:3000/api/products/deleteProduct/${productId}`);
        alert("Product deleted successfully!");
        onDelete(productId); // Callback to remove the deleted product from the UI
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <Button variant="contained" color="error" style={{ marginLeft: 'auto' }} onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteProduct;
