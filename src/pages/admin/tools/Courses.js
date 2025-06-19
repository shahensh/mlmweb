import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const defaultCourses = [
  { id: 1, title: 'MLM Basics', description: 'Introduction to MLM concepts and strategies.', instructor: 'John Doe', date: '2024-07-01', status: 'Active' },
  { id: 2, title: 'Advanced Networking', description: 'Grow your network and maximize referrals.', instructor: 'Jane Smith', date: '2024-07-10', status: 'Active' },
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(defaultCourses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', instructor: '', date: '', status: 'Active' });

  const handleOpen = (course) => {
    setEditCourse(course);
    setForm(course || { title: '', description: '', instructor: '', date: '', status: 'Active' });
    setDialogOpen(true);
  };
  const handleClose = () => { setDialogOpen(false); setEditCourse(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    let newCourses;
    if (editCourse) {
      newCourses = courses.map(c => c.id === editCourse.id ? { ...editCourse, ...form } : c);
    } else {
      newCourses = [...courses, { ...form, id: Date.now() }];
    }
    setCourses(newCourses);
    handleClose();
  };
  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Manage Courses</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Course</Button>
      <Paper sx={{ p: 2 }}>
        <List>
          {courses.map(course => (
            <ListItem key={course.id} secondaryAction={
              <>
                <IconButton onClick={() => handleOpen(course)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(course.id)} color="error"><Delete /></IconButton>
              </>
            }>
              <ListItemText
                primary={course.title}
                secondary={`Instructor: ${course.instructor} | Date: ${course.date} | Status: ${course.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField label="Instructor" name="instructor" value={form.instructor} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
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
export default AdminCourses; 