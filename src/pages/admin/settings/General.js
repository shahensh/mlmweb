import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const GeneralSettings = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        General Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              defaultValue="MLM Company"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website URL"
              defaultValue="https://example.com"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Email"
              defaultValue="contact@example.com"
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

export default GeneralSettings; 