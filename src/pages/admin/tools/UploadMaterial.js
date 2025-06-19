import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const UploadMaterial = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');

  // This would typically come from Firebase
  const materials = [
    {
      id: '1',
      name: 'Training Guide.pdf',
      description: 'Complete training guide for new distributors',
      uploadDate: '2024-02-20',
    },
    {
      id: '2',
      name: 'Product Catalog.pdf',
      description: 'Latest product catalog with prices',
      uploadDate: '2024-02-19',
    },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', {
        file: selectedFile,
        description,
      });
      setSelectedFile(null);
      setDescription('');
    }
  };

  const handleDelete = (id) => {
    console.log('Deleting material:', id);
  };

  const handleDownload = (id) => {
    console.log('Downloading material:', id);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Upload Material
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Select File
              <input
                type="file"
                hidden
                onChange={handleFileSelect}
              />
            </Button>
          </Grid>
          {selectedFile && (
            <>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Selected file: {selectedFile.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Upload
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Uploaded Materials
      </Typography>
      <Paper>
        <List>
          {materials.map((material) => (
            <ListItem key={material.id}>
              <ListItemText
                primary={material.name}
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {material.description}
                    </Typography>
                    <br />
                    <Typography variant="caption" component="span">
                      Uploaded on: {material.uploadDate}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(material.id)}
                  sx={{ mr: 1 }}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(material.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default UploadMaterial; 