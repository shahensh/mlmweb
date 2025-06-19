import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { ref, onValue, set, update, remove } from 'firebase/database';
import { database } from '../../../firebase';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Real-time listeners for users and products
  useEffect(() => {
    const usersRef = ref(database, 'users');
    const productsRef = ref(database, 'products');

    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersList = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(usersList);
      }
    });

    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }));
        setProducts(productsList);
      }
    });

    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
    };
  }, []);

  // User management functions
  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const handleUserSave = async () => {
    if (selectedUser) {
      const userRef = ref(database, `users/${selectedUser.id}`);
      await update(userRef, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        isActive: selectedUser.isActive,
        permissions: selectedUser.permissions,
      });
    }
    setOpenUserDialog(false);
  };

  const handleUserDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const userRef = ref(database, `users/${userId}`);
      await remove(userRef);
    }
  };

  // Product management functions
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
    setOpenProductDialog(true);
  };

  const handleProductSave = async () => {
    if (selectedProduct) {
      const productRef = ref(database, `products/${selectedProduct.id}`);
      await update(productRef, {
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        isActive: selectedProduct.isActive,
      });
    }
    setOpenProductDialog(false);
  };

  const handleProductDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const productRef = ref(database, `products/${productId}`);
      await remove(productRef);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Users Management */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">User Management</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedUser({
                    name: '',
                    email: '',
                    role: 'user',
                    isActive: true,
                    permissions: {},
                  });
                  setOpenUserDialog(true);
                }}
              >
                Add User
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          color={user.isActive ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleUserEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleUserDelete(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Products Management */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Product Management</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedProduct({
                    name: '',
                    price: '',
                    description: '',
                    isActive: true,
                  });
                  setOpenProductDialog(true);
                }}
              >
                Add Product
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={product.isActive ? 'Active' : 'Inactive'}
                          color={product.isActive ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleProductEdit(product)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleProductDelete(product.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* User Edit Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={selectedUser?.name || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={selectedUser?.email || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Role"
              value={selectedUser?.role || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={selectedUser?.isActive || false}
                  onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleUserSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product Edit Dialog */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={selectedProduct?.name || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={selectedProduct?.price || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={selectedProduct?.description || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={selectedProduct?.isActive || false}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button onClick={handleProductSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 