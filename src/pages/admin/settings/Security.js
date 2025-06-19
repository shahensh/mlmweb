import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';

const SecuritySettings = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Security Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Two-Factor Authentication"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Update Security Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SecuritySettings; 