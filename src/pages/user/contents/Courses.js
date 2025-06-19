import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Alert, Tabs, Tab, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import axios from 'axios';
import QRCode from 'qrcode.react';

const mockCourses = [
  {
    id: 1,
    title: 'MLM Success Blueprint',
    description: 'A step-by-step course to master MLM strategies and grow your network.',
    price: 4,
    enrolled: true,
  },
  {
    id: 2,
    title: 'Advanced Referral Marketing',
    description: 'Learn advanced techniques for referral marketing and team building.',
    price: 9,
    enrolled: false,
  },
  {
    id: 3,
    title: 'Leadership in Network Marketing',
    description: 'Develop leadership skills to inspire and manage your downline.',
    price: 19,
    enrolled: false,
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState('phonepe');
  const [showQR, setShowQR] = useState(false);
  const [timer, setTimer] = useState(240); // 4 minutes
  const timerRef = useRef();
  const [confirmEnabled, setConfirmEnabled] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const pollRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    setTimeout(() => setCourses(mockCourses), 500);
  }, []);

  useEffect(() => {
    if (showQR && timer > 0) {
      timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setConfirmEnabled(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [showQR, timer]);

  // Poll for payment status
  useEffect(() => {
    if (showQR && selectedCourse && !success) {
      pollRef.current = setInterval(async () => {
        // Simulate API call to check payment status
        // Replace with real API call in production
        // const res = await fetch(`/api/payment/check-status?orderId=${selectedCourse.id}`);
        // const data = await res.json();
        // For demo, randomly succeed after 3 polls
        if (Math.random() > 0.7) {
          setSuccess(true);
          setTransactionId('TXN' + Date.now());
          setCourses((prev) =>
            prev.map((c) =>
              c.id === selectedCourse.id ? { ...c, enrolled: true } : c
            )
          );
        }
      }, 5000);
    }
    if (success && pollRef.current) clearInterval(pollRef.current);
    return () => clearInterval(pollRef.current);
  }, [showQR, selectedCourse, success]);

  // Redirect to transaction detail page on success
  useEffect(() => {
    if (success && transactionId) {
      setTimeout(() => {
        window.location.href = `/transactions/${transactionId}`;
      }, 1200);
    }
  }, [success, transactionId]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
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
    setSelectedCourse(null);
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

  // Show QR code for 4 minutes
  const handleShowQR = () => {
    setShowQR(true);
    setTimer(240);
    setConfirmEnabled(true);
  };

  // User confirms payment
  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTransactionId('TXN' + Date.now());
      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourse.id ? { ...c, enrolled: true } : c
        )
      );
    }, 1200);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Online Courses
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Browse and enroll in online courses. (Admin can add, edit, or delete courses and set prices.)
        </Typography>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>{course.description}</Typography>
                  <Chip label={course.enrolled ? 'Enrolled' : 'Available'} color={course.enrolled ? 'success' : 'primary'} size="small" sx={{ mb: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">${course.price}</Typography>
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)', textTransform: 'none', fontWeight: 'bold' }} disabled={course.enrolled} onClick={() => handleEnrollClick(course)}>
                    {course.enrolled ? 'Enrolled' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Enrollment & Payment</DialogTitle>
        <DialogContent>
          {selectedCourse && (
            <>
              <Typography gutterBottom>
                You are about to enroll in <b>{selectedCourse.title}</b> for <b>${selectedCourse.price}</b>.
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Choose your preferred payment method and scan the QR code to pay. After payment, click "I have paid" to confirm.
              </Typography>
              <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
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
                  <img src={QR_CODES[tab]} alt="QR Code" style={{ width: 200, height: 200, borderRadius: 8, border: '1px solid #e3eafc' }} />
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
          {success && <Alert severity="success">Enrollment and payment successful! Redirecting to transaction details...</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={loading} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses; 