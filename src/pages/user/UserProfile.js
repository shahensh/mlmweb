import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const UserProfile = () => {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4 }}>
          Profile
        </Typography>
        {/* Profile content will be added here */}
      </Container>
    </Box>
  );
};

export default UserProfile; 