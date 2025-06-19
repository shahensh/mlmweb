import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const Store = () => {
  const [cart, setCart] = useState([]);
  
  // Mock products data
  const products = [
    {
      id: 1,
      name: 'MLM Product A',
      description: 'High-quality product for your business',
      price: 299.99,
      image: 'https://via.placeholder.com/300x200?text=Product+A'
    },
    {
      id: 2,
      name: 'MLM Product B',
      description: 'Premium solution for success',
      price: 199.99,
      image: 'https://via.placeholder.com/300x200?text=Product+B'
    },
    {
      id: 3,
      name: 'MLM Product C',
      description: 'Advanced tools for growth',
      price: 399.99,
      image: 'https://via.placeholder.com/300x200?text=Product+C'
    },
    {
      id: 4,
      name: 'MLM Product D',
      description: 'Complete business package',
      price: 499.99,
      image: 'https://via.placeholder.com/300x200?text=Product+D'
    }
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Store
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Store; 