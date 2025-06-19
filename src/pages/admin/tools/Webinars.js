import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const defaultWebinars = [
  { id: 1, title: 'Kickoff 2024', description: 'Live webinar on MLM growth strategies.', date: '2024-07-01', status: 'Scheduled' },
  { id: 2, title: 'Compensation Plan Deep Dive', description: 'Understand the matrix compensation plan.', date: '2024-07-10', status: 'Scheduled' },
];

const AdminWebinars = () => {
  const [webinars, setWebinars] = useState(defaultWebinars);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editWebinar, setEditWebinar] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', status: 'Scheduled' });

  const handleOpen = (webinar) => {
    setEditWebinar(webinar);
    setForm(webinar || { title: '', description: '', date: '', status: 'Scheduled' });
    setDialogOpen(true);
  };
  const handleClose = () => { setDialogOpen(false); setEditWebinar(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    let newWebinars;
    if (editWebinar) {
      newWebinars = webinars.map(w => w.id === editWebinar.id ? { ...editWebinar, ...form } : w);
    } else {
      newWebinars = [...webinars, { ...form, id: Date.now() }];
    }
    setWebinars(newWebinars);
    handleClose();
  };
  const handleDelete = (id) => {
    setWebinars(webinars.filter(w => w.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Manage Webinars</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Webinar</Button>
      <Paper sx={{ p: 2 }}>
        <List>
          {webinars.map(webinar => (
            <ListItem key={webinar.id} secondaryAction={
              <>
                <IconButton onClick={() => handleOpen(webinar)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(webinar.id)} color="error"><Delete /></IconButton>
              </>
            }>
              <ListItemText
                primary={webinar.title}
                secondary={`Date: ${webinar.date} | Status: ${webinar.status} | ${webinar.description}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editWebinar ? 'Edit Webinar' : 'Add Webinar'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Date" name="date" value={form.date} onChange={handleChange} fullWidth sx={{ mb: 2 }} type="date" InputLabelProps={{ shrink: true }} />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AdminWebinars; 