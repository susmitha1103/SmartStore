import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActionArea, CardMedia, Button } from '@mui/material';
import UpdateProductDetails from './UpdateProductDetails'; 
import DeleteProduct from './DeleteProduct';
import ProductFilter from './ProductFilter';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;  


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        
        const response = await axios.get('http://localhost:3000/api/products/fetch/', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            ...filters,
            page: currentPage,
            limit: limit
          },
        });
        setProducts(response.data || []); 
         setLoading(false);
        
      
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setProducts(newFilters);
    console.log("New filters", newFilters);
    setCurrentPage(1);  
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map((product) => 
      product._id === updatedProduct._id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId)); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '3rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product Listing
      </Typography>

      {/* Product Filter Component */}
      <ProductFilter onFilter={handleFilterChange} /> 

      {/* Product Box Layout */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {products.length > 0 ? (
          products.map((product) => {
            const imageUrl = `http://localhost:3000/uploads/${product.image}`;
            return (
              <Box key={product._id} flexBasis={{ xs: '100%', sm: '48%', md: '30%' }} maxWidth="350px">
                <Card style={{ height: '100%' }}>
                  <CardActionArea component={Link} to={`/products/${product._id}`}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={imageUrl}
                      alt={product.product_name}
                      style={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {product.product_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                      <Typography variant="body1">
                        Price: ${product.price}
                      </Typography>
                      <Typography variant="body1">
                        Stock: {product.stock}
                      </Typography>
                      <Typography variant="body1">
                        {product.isAvailable ? 'Available' : 'Not Available'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardContent
                   style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <UpdateProductDetails product={product} onUpdate={handleProductUpdate} />
                    <DeleteProduct productId={product._id} onDelete={handleDeleteProduct} />
                  </CardContent>
                </Card>
              </Box>
            );
          })
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No products available.
          </Typography>
        )}
      </Box>

      {/* Pagination Controls */}
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="body1" style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default ProductListing;
