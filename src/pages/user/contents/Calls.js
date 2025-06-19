import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockCalls = [
  {
    id: 1,
    title: 'Weekly Team Call',
    date: '2024-06-28 19:00',
    type: 'Zoom',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Leadership Q&A',
    date: '2024-06-20 18:00',
    type: 'Phone',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Product Training',
    date: '2024-06-15 17:00',
    type: 'Zoom',
    status: 'completed',
  },
];

const Calls = () => {
  const [calls, setCalls] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => setCalls(mockCalls), 500);
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Calls
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Join upcoming calls or review past sessions. (Admin can schedule or archive calls.)
        </Typography>
        <Grid container spacing={3}>
          {calls.map((call) => (
            <Grid item xs={12} sm={6} md={4} key={call.id}>
              <Card sx={{
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.7)',
                boxShadow: '0 4px 24px 0 rgba(33,203,243,0.10)',
                border: '1px solid #e3eafc',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.03)',
                  boxShadow: '0 8px 32px 0 rgba(33,203,243,0.18)',
                },
              }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{call.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{call.type} Call</Typography>
                  <Typography variant="caption" color="text.secondary" gutterBottom>{call.date}</Typography>
                  <Chip label={call.status === 'upcoming' ? 'Upcoming' : 'Completed'} color={call.status === 'upcoming' ? 'primary' : 'success'} size="small" sx={{ mb: 1, ml: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calls; 