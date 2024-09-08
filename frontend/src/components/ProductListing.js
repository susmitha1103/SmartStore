import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/');
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
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default ProductListing;
