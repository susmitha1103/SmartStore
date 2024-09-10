import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import UpdateProductDetails from './Admin/UpdateProductDetails'; 
import DeleteProduct from './DeleteProduct';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        
        const response = await axios.get('http://localhost:3000/api/products/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map((product) => 
      product._id === updatedProduct._id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId)); // Remove deleted product from UI
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
      <Grid container spacing={3}>
        {products.map((product) => {
          const imageUrl = `http://localhost:3000/uploads/${product.image}`;
          return (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
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
                  </CardContent>
                </CardActionArea>

                
                <CardContent
                 style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <UpdateProductDetails product={product}
                  onUpdate={handleProductUpdate} />
                  <DeleteProduct productId={product._id} onDelete={handleDeleteProduct} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProductListing;
