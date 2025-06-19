import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockArchives = [
  {
    id: 1,
    title: '2023 Annual Webinar Recording',
    type: 'video',
    date: '2023-12-31',
  },
  {
    id: 2,
    title: 'Compensation Plan PDF',
    type: 'pdf',
    date: '2024-01-15',
  },
  {
    id: 3,
    title: 'Product Training Video',
    type: 'video',
    date: '2024-02-10',
  },
];

const Archives = () => {
  const [archives, setArchives] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => setArchives(mockArchives), 500);
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Archives
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Access archived webinars, PDFs, and resources. (Admin can add or remove archives.)
        </Typography>
        <Grid container spacing={3}>
          {archives.map((archive) => (
            <Grid item xs={12} sm={6} md={4} key={archive.id}>
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{archive.title}</Typography>
                  <Chip label={archive.type.toUpperCase()} color={archive.type === 'video' ? 'primary' : 'secondary'} size="small" sx={{ mb: 1, mr: 1 }} />
                  <Typography variant="caption" color="text.secondary" gutterBottom>Archived: {archive.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Archives; 