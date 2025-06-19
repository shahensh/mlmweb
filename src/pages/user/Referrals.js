import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Snackbar,
  Alert,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  WhatsApp,
  ContentCopy,
  Share,
  QrCode2,
  People,
  TrendingUp,
  AccountBalanceWallet,
} from '@mui/icons-material';

const Referrals = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [referralCode, setReferralCode] = useState('MLM123456'); // This would come from your backend

  const referralLink = `https://yourmlmwebsite.com/join?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setSnackbar({
      open: true,
      message: 'Referral link copied to clipboard!',
      severity: 'success',
    });
  };

  const handleWhatsAppShare = () => {
    const message = `Join me on MLM Portal! Use my referral code ${referralCode} to get started. Click here: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const stats = [
    {
      title: 'Total Referrals',
      value: '24',
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Active Referrals',
      value: '18',
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Earnings from Referrals',
      value: '$1,250',
      icon: <AccountBalanceWallet sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {stat.icon}
                      <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Referral Link Section */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
              color: 'white',
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Invite Friends & Earn Rewards
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Share your referral link with friends and earn rewards when they join!
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  value={referralLink}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  <Tooltip title="Copy Link">
                    <IconButton
                      onClick={handleCopyLink}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share on WhatsApp">
                    <IconButton
                      onClick={handleWhatsAppShare}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Show QR Code">
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <QrCode2 />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* How It Works Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              How It Works
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      1. Share Your Link
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Share your unique referral link with friends through WhatsApp, email, or social media.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      2. Friends Join
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      When your friends sign up using your referral link, they become part of your network.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      3. Earn Rewards
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Earn commission and rewards for each successful referral in your network.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Referrals; 