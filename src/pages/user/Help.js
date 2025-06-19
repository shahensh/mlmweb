import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const mockFAQs = [
  {
    q: 'How do I contact support?',
    a: 'You can use the real-time chat or raise a ticket using the form below.',
  },
  {
    q: 'How do I raise a ticket?',
    a: 'Fill out the ticket form with your issue and our team will respond as soon as possible.',
  },
  {
    q: 'Where can I check my ticket status?',
    a: 'You will receive updates via email and in your dashboard notifications.',
  },
];

const Help = () => {
  const [ticket, setTicket] = useState({ subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleTicketChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTicket({ subject: '', message: '' });
    }, 1500);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: 1 }}>
          <HelpOutlineIcon sx={{ fontSize: 32 }} /> Help & Support
        </Typography>
        <Grid container spacing={4}>
          {/* Real-time Contact Support */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 2, background: 'rgba(33,203,243,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SupportAgentIcon color="primary" /> Real-time Contact Support
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Chat with our support team instantly for urgent queries.
              </Typography>
              <Button variant="contained" color="primary" startIcon={<ChatBubbleOutlineIcon />} fullWidth disabled>
                Start Live Chat (Demo)
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                (Live chat coming soon. For now, please raise a ticket or check FAQs.)
              </Typography>
            </Paper>
          </Grid>

          {/* Raise Ticket */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 2, background: 'rgba(33,203,243,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SupportAgentIcon color="primary" /> Raise a Ticket
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Submit your issue and our team will respond as soon as possible.
              </Typography>
              <form onSubmit={handleTicketSubmit}>
                <TextField
                  label="Subject"
                  name="subject"
                  value={ticket.subject}
                  onChange={handleTicketChange}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Message"
                  name="message"
                  value={ticket.message}
                  onChange={handleTicketChange}
                  fullWidth
                  required
                  multiline
                  minRows={3}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={submitting}>
                  {submitting ? <CircularProgress size={22} /> : 'Submit Ticket'}
                </Button>
                {submitted && <Alert severity="success" sx={{ mt: 2 }}>Ticket submitted! Our team will contact you soon.</Alert>}
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              </form>
            </Paper>
          </Grid>

          {/* FAQs */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: 'rgba(33,203,243,0.08)' }}>
              <Typography variant="h6" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <HelpOutlineIcon color="primary" /> Frequently Asked Questions
              </Typography>
              <Stack spacing={1}>
                {mockFAQs.map((faq, idx) => (
                  <Accordion key={idx}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight="bold">{faq.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">{faq.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Help; 