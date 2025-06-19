import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const mockResources = [
  {
    category: 'Training Materials',
    items: [
      { id: 1, title: 'MLM Starter Guide', type: 'pdf', link: '#' },
      { id: 2, title: 'Compensation Plan Explainer', type: 'video', link: '#' },
      { id: 3, title: 'Team Building Checklist', type: 'guide', link: '#' },
      { id: 4, title: 'Onboarding Presentation', type: 'ppt', link: '#' },
    ],
  },
  {
    category: 'Marketing Tools',
    items: [
      { id: 5, title: 'Social Media Templates', type: 'zip', link: '#' },
      { id: 6, title: 'Product Brochure', type: 'pdf', link: '#' },
      { id: 7, title: 'Promo Video', type: 'video', link: '#' },
    ],
  },
  {
    category: 'Company Docs',
    items: [
      { id: 8, title: 'Company Policies', type: 'pdf', link: '#' },
      { id: 9, title: 'Terms & Conditions', type: 'pdf', link: '#' },
      { id: 10, title: 'Business Registration Certificate', type: 'pdf', link: '#' },
    ],
  },
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => setResources(mockResources), 500);
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Resources / Downloads
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Access training materials, marketing tools, and company docs. Download guides, videos, and PDFs to help you succeed.
        </Typography>
        {resources.map((section) => (
          <Box key={section.category} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{section.category}</Typography>
            <Grid container spacing={3}>
              {section.items.map((resource) => (
                <Grid item xs={12} sm={6} md={4} key={resource.id}>
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
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{resource.title}</Typography>
                      <Chip label={resource.type.toUpperCase()} color={resource.type === 'pdf' ? 'secondary' : resource.type === 'video' ? 'primary' : 'success'} size="small" sx={{ mb: 1, mr: 1 }} />
                      <Button variant="outlined" color="primary" href={resource.link} target="_blank" rel="noopener" sx={{ mt: 1, borderRadius: 2, fontWeight: 'bold', background: 'rgba(255,255,255,0.6)', transition: 'background 0.2s', '&:hover': { background: 'rgba(33,203,243,0.08)' } }}>
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Resources; 