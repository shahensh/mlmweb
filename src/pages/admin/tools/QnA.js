import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const defaultQnA = [
  { id: 1, question: 'How do I join a webinar?', answer: 'Go to the webinars page and click register.', user: 'User1', date: '2024-07-01' },
  { id: 2, question: 'How can I download resources?', answer: 'Visit the resources page and click download.', user: 'User2', date: '2024-07-02' },
];

const AdminQnA = () => {
  const [qna, setQnA] = useState(defaultQnA);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editQnA, setEditQnA] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', user: '', date: '' });

  const handleOpen = (item) => {
    setEditQnA(item);
    setForm(item || { question: '', answer: '', user: '', date: '' });
    setDialogOpen(true);
  };
  const handleClose = () => { setDialogOpen(false); setEditQnA(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    let newQnA;
    if (editQnA) {
      newQnA = qna.map(q => q.id === editQnA.id ? { ...editQnA, ...form } : q);
    } else {
      newQnA = [...qna, { ...form, id: Date.now() }];
    }
    setQnA(newQnA);
    handleClose();
  };
  const handleDelete = (id) => {
    setQnA(qna.filter(q => q.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Manage Q&A</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Q&A</Button>
      <Paper sx={{ p: 2 }}>
        <List>
          {qna.map(item => (
            <ListItem key={item.id} secondaryAction={
              <>
                <IconButton onClick={() => handleOpen(item)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(item.id)} color="error"><Delete /></IconButton>
              </>
            }>
              <ListItemText
                primary={item.question}
                secondary={`Answer: ${item.answer} | User: ${item.user} | Date: ${item.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editQnA ? 'Edit Q&A' : 'Add Q&A'}</DialogTitle>
        <DialogContent>
          <TextField label="Question" name="question" value={form.question} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Answer" name="answer" value={form.answer} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="User" name="user" value={form.user} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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
export default AdminQnA; 