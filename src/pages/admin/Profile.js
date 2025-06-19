import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
} from '@mui/material';

const AdminProfile = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src="https://via.placeholder.com/100"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              defaultValue="Admin"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              defaultValue="User"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="admin@example.com"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              defaultValue="+1234567890"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminProfile; 