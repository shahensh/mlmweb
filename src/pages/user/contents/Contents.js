import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Contents = () => (
  <Box sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Contents
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Access all your member content: online courses, webinars, calls, archives, forums, resources, and exclusive perks.
      </Typography>
    </Paper>
  </Box>
);

export default Contents; 