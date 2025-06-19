import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Rating,
  Container,
  Paper,
  Fade,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  ListItemIcon,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Add,
  Remove,
  Search,
  LocalShipping,
  Security,
  Star,
  FilterList,
  Sort,
  Add as AddIcon,
  Edit,
  Delete,
} from '@mui/icons-material';
import { products } from '../../services/api';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

const Store = () => {
  const [productsList, setProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    features: [''],
    shipping: '',
    warranty: '',
    stock: '',
    isActive: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    socket.on('productsUpdated', fetchProducts);
    return () => {
      socket.off('productsUpdated', fetchProducts);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await products.getAll();
      setProductsList(Array.isArray(data) ? data : []);
    } catch (err) {
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
    setQuantity(1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddProduct = async () => {
    try {
      await products.create({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
      setOpenAddDialog(false);
      setNewProduct({
        name: '',
        price: '',
        image: '',
        category: '',
        description: '',
        features: [''],
        shipping: '',
        warranty: '',
        stock: '',
        isActive: true,
      });
      socket.emit('productsUpdated');
    } catch (err) {}
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleUpdateProduct = async (productId, productData) => {
    try {
      await products.update(productId, productData);
      setOpenDialog(false);
      setSelectedProduct(null);
      socket.emit('productsUpdated');
    } catch (err) {}
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await products.delete(productId);
        setAnchorEl(null);
        socket.emit('productsUpdated');
      } catch (err) {}
    }
  };

  const filteredProducts = productsList
    .filter(product =>
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterCategory === 'all' || product.category.toLowerCase() === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const ProductDialog = ({ product, open, onClose }) => {
    if (!product) return null;

    return (
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            <IconButton onClick={onClose}>
              <Remove />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  ${product.price}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {product.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Category:</strong> {product.category}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Stock:</strong> {product.stock} units
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Shipping:</strong> {product.shipping}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Warranty:</strong> {product.warranty}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Store Management
        </Typography>
        <Button 
          variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
          sx={{ 
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              },
          }}
        >
          Add Product
        </Button>
        </Box>

        {/* Search and Filter */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="beauty">Beauty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Products Grid */}
        <Grid container spacing={3}>
            {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Fade in={true}>
                  <Card 
                    sx={{ 
                    height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                    }}
                  >
                      <CardMedia
                        component="img"
                    height="200"
                    image={product.image}
                        alt={product.name}
                      />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                      </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                      </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={product.rating} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                          ({product.reviews})
                        </Typography>
                      </Box>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                        ${product.price}
                      </Typography>
                        <Chip 
                      label={product.category}
                          size="small"
                      sx={{ mb: 2 }}
                        />
                    </CardContent>
                  <CardActions>
                      <Button 
                      size="small"
                        onClick={() => handleProductClick(product)}
                      >
                        View Details
                      </Button>
                    <IconButton
                      size="small"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favorites.includes(product.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    </CardActions>
                  </Card>
                </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Product Dialog */}
      <ProductDialog
        product={selectedProduct}
        open={openDialog}
        onClose={handleCloseDialog}
      />
      </Container>
    </Box>
  );
};

export default Store;