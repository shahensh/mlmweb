import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const defaultCalls = [
  { id: 1, title: 'Welcome Call', description: 'Introductory call for new users.', date: '2024-07-02', participants: 'User, Admin' },
  { id: 2, title: 'Strategy Session', description: 'Discuss growth strategies.', date: '2024-07-12', participants: 'User, Admin' },
];

const AdminCalls = () => {
  const [calls, setCalls] = useState(defaultCalls);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCall, setEditCall] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', participants: '' });

  const handleOpen = (call) => {
    setEditCall(call);
    setForm(call || { title: '', description: '', date: '', participants: '' });
    setDialogOpen(true);
  };
  const handleClose = () => { setDialogOpen(false); setEditCall(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    let newCalls;
    if (editCall) {
      newCalls = calls.map(c => c.id === editCall.id ? { ...editCall, ...form } : c);
    } else {
      newCalls = [...calls, { ...form, id: Date.now() }];
    }
    setCalls(newCalls);
    handleClose();
  };
  const handleDelete = (id) => {
    setCalls(calls.filter(c => c.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Manage Calls</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Call</Button>
      <Paper sx={{ p: 2 }}>
        <List>
          {calls.map(call => (
            <ListItem key={call.id} secondaryAction={
              <>
                <IconButton onClick={() => handleOpen(call)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(call.id)} color="error"><Delete /></IconButton>
              </>
            }>
              <ListItemText
                primary={call.title}
                secondary={`Date: ${call.date} | Participants: ${call.participants}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editCall ? 'Edit Call' : 'Add Call'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Date" name="date" value={form.date} onChange={handleChange} fullWidth sx={{ mb: 2 }} type="date" InputLabelProps={{ shrink: true }} />
          <TextField label="Participants" name="participants" value={form.participants} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default AdminCalls; 