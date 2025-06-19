import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert, Tabs, Tab, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
// import axios from 'axios';
import QRCode from 'qrcode.react';

const mockWebinars = [
  {
    id: 1,
    title: 'Kickoff 2024: MLM Growth Strategies',
    date: '2024-07-01 18:00',
    description: 'Live webinar on the latest MLM growth tactics and Q&A with experts.',
    price: 0,
    registered: true,
  },
  {
    id: 2,
    title: 'Compensation Plan Deep Dive',
    date: '2024-07-10 20:00',
    description: 'Understand the matrix compensation plan and maximize your earnings.',
    price: 19,
    registered: false,
  },
];

const mockMeetups = [
  {
    id: 1,
    title: 'Summer Success Meetup',
    date: '2024-08-05 15:00',
    location: 'Downtown Conference Hall, City Center',
    description: 'Network with top earners and learn from their stories. Snacks provided.',
    registered: false,
  },
  {
    id: 2,
    title: 'Monthly Team Mixer',
    date: '2024-08-20 18:30',
    location: 'MLM HQ Rooftop, Main Street',
    description: 'Casual meetup for all members. Bring a friend!',
    registered: true,
  },
];

// const RAZORPAY_KEY_ID = 'rzp_test_YourKeyHere'; // Razorpay commented out

const PAYMENT_METHODS = [
  { label: 'PhonePe', value: 'phonepe' },
  { label: 'Paytm', value: 'paytm' },
  { label: 'Google Pay', value: 'gpay' },
  { label: 'SBI', value: 'sbi' },
  { label: 'HDFC', value: 'hdfc' },
  { label: 'Bajaj', value: 'bajaj' },
  { label: 'PayPal', value: 'paypal' },
  // Add more as needed
];

const QR_CODES = {
  phonepe: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=phonepe@upi&pn=MLMPortal',
  paytm: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=paytm@upi&pn=MLMPortal',
  gpay: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=gpay@upi&pn=MLMPortal',
  sbi: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=sbi@upi&pn=MLMPortal',
  hdfc: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=hdfc@upi&pn=MLMPortal',
  bajaj: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=bajaj@upi&pn=MLMPortal',
  paypal: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://paypal.me/mlmportal',
};

const Events = () => {
  const [tab, setTab] = useState(0); // 0 = Webinars, 1 = Meetups
  const [webinars, setWebinars] = useState([]);
  const [meetups, setMeetups] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [payTab, setPayTab] = useState('phonepe');
  const [showQR, setShowQR] = useState(false);
  const [timer, setTimer] = useState(240); // 4 minutes
  const timerRef = useRef();
  const [confirmEnabled, setConfirmEnabled] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const pollRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => setWebinars(mockWebinars), 500);
    setTimeout(() => setMeetups(mockMeetups), 500);
  }, []);

  useEffect(() => {
    if (showQR && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setConfirmEnabled(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [showQR, timer]);

  useEffect(() => {
    if (showQR && selectedEvent && !success) {
      pollRef.current = setInterval(async () => {
        if (Math.random() > 0.7) {
          setSuccess(true);
          setTransactionId('TXN' + Date.now());
          if (tab === 0) {
            setWebinars((prev) => prev.map((w) => w.id === selectedEvent.id ? { ...w, registered: true } : w));
          } else {
            setMeetups((prev) => prev.map((m) => m.id === selectedEvent.id ? { ...m, registered: true } : m));
          }
        }
      }, 5000);
    }
    if (success && pollRef.current) clearInterval(pollRef.current);
    return () => clearInterval(pollRef.current);
  }, [showQR, selectedEvent, success, tab]);

  useEffect(() => {
    if (success && transactionId) {
      setTimeout(() => {
        window.location.href = `/transactions/${transactionId}`;
      }, 1200);
    }
  }, [success, transactionId]);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
    setSuccess(false);
    setError("");
    setShowQR(false);
    setTimer(240);
    setConfirmEnabled(true);
    setTransactionId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
    setLoading(false);
    setSuccess(false);
    setError("");
    setShowQR(false);
    setTimer(240);
    setConfirmEnabled(true);
    setTransactionId(null);
  };

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const handlePayTabChange = (e, newValue) => {
    setPayTab(newValue);
  };

  const handleShowQR = () => {
    setShowQR(true);
    setTimer(240);
    setConfirmEnabled(true);
  };

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTransactionId('TXN' + Date.now());
      if (tab === 0) {
        setWebinars((prev) => prev.map((w) => w.id === selectedEvent.id ? { ...w, registered: true } : w));
      } else {
        setMeetups((prev) => prev.map((m) => m.id === selectedEvent.id ? { ...m, registered: true } : m));
      }
    }, 1200);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Events
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Join upcoming webinars and meetups. (Admins can add, edit, or delete events.)
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Webinars" icon={<EventIcon />} iconPosition="start" />
          <Tab label="Meetups" icon={<GroupIcon />} iconPosition="start" />
        </Tabs>
        {tab === 0 && (
          <Grid container spacing={3}>
            {webinars.map((webinar) => (
              <Grid item xs={12} sm={6} md={4} key={webinar.id}>
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
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{webinar.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{webinar.description}</Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>Live: {webinar.date}</Typography>
                    <Chip label={webinar.registered ? 'Registered' : 'Available'} color={webinar.registered ? 'success' : 'primary'} size="small" sx={{ mb: 1, ml: 1 }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">{webinar.price === 0 ? 'Free' : `$${webinar.price}`}</Typography>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)', textTransform: 'none', fontWeight: 'bold' }} disabled={webinar.registered} onClick={() => handleRegisterClick(webinar)}>
                      {webinar.registered ? 'Registered' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {tab === 1 && (
          <Grid container spacing={3}>
            {meetups.map((meetup) => (
              <Grid item xs={12} sm={6} md={4} key={meetup.id}>
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
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{meetup.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{meetup.description}</Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>When: {meetup.date}</Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>Location: {meetup.location}</Typography>
                    <Chip label={meetup.registered ? 'Registered' : 'Available'} color={meetup.registered ? 'success' : 'primary'} size="small" sx={{ mb: 1, ml: 1 }} />
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)', textTransform: 'none', fontWeight: 'bold' }} disabled={meetup.registered} onClick={() => handleRegisterClick(meetup)}>
                      {meetup.registered ? 'Registered' : 'Register Now'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Registration & Payment</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography gutterBottom>
                You are about to register for <b>{selectedEvent.title}</b> {selectedEvent.price !== undefined ? <>for <b>{selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}</b></> : null}.
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Choose your preferred payment method and scan the QR code to pay. After payment, click "I have paid" to confirm.
              </Typography>
              <Tabs value={payTab} onChange={handlePayTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
                {PAYMENT_METHODS.map((method) => (
                  <Tab key={method.value} label={method.label} value={method.value} />
                ))}
              </Tabs>
              {!showQR && (
                <Button variant="contained" color="primary" fullWidth onClick={handleShowQR} sx={{ mb: 2 }}>
                  Show QR Code
                </Button>
              )}
              {showQR && (
                <Stack alignItems="center" spacing={2}>
                  <img src={QR_CODES[payTab]} alt="QR Code" style={{ width: 200, height: 200, borderRadius: 8, border: '1px solid #e3eafc' }} />
                  <Typography variant="caption" color="text.secondary">
                    QR valid for: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </Typography>
                  <Button variant="contained" color="success" fullWidth disabled={!confirmEnabled || loading} onClick={handleConfirmPayment}>
                    {loading ? <CircularProgress size={22} /> : 'I have paid'}
                  </Button>
                  {!confirmEnabled && <Alert severity="warning">QR code expired. Please reopen and try again.</Alert>}
                </Stack>
              )}
            </>
          )}
          {success && <Alert severity="success">Registration and payment successful! Redirecting to transaction details...</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={loading} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Events; 