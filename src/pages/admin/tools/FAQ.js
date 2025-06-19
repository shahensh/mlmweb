import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const FAQ = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // This would typically come from Firebase
  const faqs = [
    {
      id: '1',
      question: 'What is MLM?',
      answer: 'Multi-Level Marketing (MLM) is a business model that allows independent distributors to earn income through both direct sales and by recruiting new distributors.',
    },
    {
      id: '2',
      question: 'How do I get started?',
      answer: 'To get started, you need to sign up as a distributor, complete the training program, and start building your network.',
    },
  ];

  const handleAddFAQ = () => {
    console.log('Adding new FAQ:', { question: newQuestion, answer: newAnswer });
    setOpenDialog(false);
    setNewQuestion('');
    setNewAnswer('');
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Frequently Asked Questions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add FAQ
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        {faqs.map((faq) => (
          <Accordion key={faq.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New FAQ</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddFAQ} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FAQ; 