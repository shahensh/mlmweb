import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const News = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');

  // This would typically come from Firebase
  const news = [
    {
      id: '1',
      title: 'New Product Launch',
      content: 'We are excited to announce the launch of our new product line...',
      image: 'https://via.placeholder.com/300',
      date: '2024-02-20',
    },
    {
      id: '2',
      title: 'Success Story',
      content: 'One of our top distributors achieved a milestone...',
      image: 'https://via.placeholder.com/300',
      date: '2024-02-19',
    },
  ];

  const handleAddNews = () => {
    console.log('Adding new news:', {
      title: newTitle,
      content: newContent,
      image: newImage,
    });
    setOpenDialog(false);
    setNewTitle('');
    setNewContent('');
    setNewImage('');
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          News & Updates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add News
        </Button>
      </Box>

      <Grid container spacing={3}>
        {news.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Image URL"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNews} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default News; 