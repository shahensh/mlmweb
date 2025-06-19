import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Container,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Fade,
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
  MoreVert,
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
  Cancel,
  Pending,
  Download,
  Visibility,
} from '@mui/icons-material';

const OrderHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  // Sample order data
  const orders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      date: '2024-03-15',
      total: 299.99,
      status: 'Delivered',
      items: 3,
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, City, Country',
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      date: '2024-03-14',
      total: 149.99,
      status: 'Processing',
      items: 2,
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Town, Country',
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      date: '2024-03-13',
      total: 499.99,
      status: 'Shipped',
      items: 4,
      paymentMethod: 'Bank Transfer',
      shippingAddress: '789 Pine Rd, Village, Country',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle />;
      case 'processing':
        return <Pending />;
      case 'shipped':
        return <LocalShipping />;
      case 'cancelled':
        return <Cancel />;
      default:
        return <Pending />;
    }
  };

  const OrderDetailsDialog = ({ order, open, onClose }) => {
    if (!order) return null;

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
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Order Details
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  bgcolor: 'primary.lighter',
                  mb: 2
                }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                    Order #{order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {order.date}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer Information
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 1 }}>
                  {order.customer}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {order.shippingAddress}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Information
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 1 }}>
                  {order.paymentMethod}
                </Typography>
                <Typography variant="h6" sx={{ color: 'primary.main', mt: 1 }}>
                  ${order.total.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Order Status
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Chip 
                    icon={getStatusIcon(order.status)}
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{ borderRadius: 1 }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Summary
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Product 1</TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">$99.99</TableCell>
                        <TableCell align="right">$99.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Product 2</TableCell>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="right">$75.00</TableCell>
                        <TableCell align="right">$150.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            startIcon={<Download />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              }
            }}
          >
            Download Invoice
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
      py: 4
    }}>
      <Container maxWidth="xl">
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Order History
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                placeholder="Search orders..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ borderRadius: 2 }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                startIcon={<Sort />}
                sx={{ borderRadius: 2 }}
              >
                Sort
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow 
                      key={order.id}
                      hover
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        }
                      }}
                      onClick={() => handleOrderClick(order)}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          icon={getStatusIcon(order.status)}
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick(order);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
      </Container>

      <OrderDetailsDialog 
        order={selectedOrder}
        open={openDialog}
        onClose={handleDialogClose}
      />
    </Box>
  );
};

export default OrderHistory; 