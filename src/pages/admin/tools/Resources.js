import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton, Link } from '@mui/material';
import { Add, Edit, Delete, Download } from '@mui/icons-material';

const defaultResources = [
  { id: 1, title: 'MLM Guide PDF', description: 'Comprehensive MLM guide.', fileUrl: 'https://example.com/mlm-guide.pdf', date: '2024-07-01' },
  { id: 2, title: 'Compensation Plan', description: 'Download the latest plan.', fileUrl: 'https://example.com/comp-plan.pdf', date: '2024-07-05' },
];

const AdminResources = () => {
  const [resources, setResources] = useState(defaultResources);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editResource, setEditResource] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', fileUrl: '', date: '' });

  const handleOpen = (resource) => {
    setEditResource(resource);
    setForm(resource || { title: '', description: '', fileUrl: '', date: '' });
    setDialogOpen(true);
  };
  const handleClose = () => { setDialogOpen(false); setEditResource(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    let newResources;
    if (editResource) {
      newResources = resources.map(r => r.id === editResource.id ? { ...editResource, ...form } : r);
    } else {
      newResources = [...resources, { ...form, id: Date.now() }];
    }
    setResources(newResources);
    handleClose();
  };
  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Manage Resources</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Resource</Button>
      <Paper sx={{ p: 2 }}>
        <List>
          {resources.map(resource => (
            <ListItem key={resource.id} secondaryAction={
              <>
                <IconButton component={Link} href={resource.fileUrl} target="_blank"><Download /></IconButton>
                <IconButton onClick={() => handleOpen(resource)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(resource.id)} color="error"><Delete /></IconButton>
              </>
            }>
              <ListItemText
                primary={resource.title}
                secondary={`Date: ${resource.date} | ${resource.description}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editResource ? 'Edit Resource' : 'Add Resource'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="File URL" name="fileUrl" value={form.fileUrl} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Date" name="date" value={form.date} onChange={handleChange} fullWidth sx={{ mb: 2 }} type="date" InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AdminResources; 