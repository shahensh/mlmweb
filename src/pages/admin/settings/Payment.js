import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  useTheme,
  Tooltip,
  Fade,
} from '@mui/material';
import { CreditCard, CurrencyBitcoin, AccountBalanceWallet, Payment, QrCode, AccountBalance, Apps } from '@mui/icons-material';

const paymentMethods = [
  { key: 'stripe', label: 'Stripe', icon: <CreditCard fontSize="large" color="primary" /> },
  { key: 'razorpay', label: 'Razorpay', icon: <Payment fontSize="large" sx={{ color: '#0f4fa8' }} /> },
  { key: 'paypal', label: 'PayPal', icon: <AccountBalance fontSize="large" sx={{ color: '#003087' }} /> },
  { key: 'crypto', label: 'Crypto (BTC, ETH, USDT, etc)', icon: <CurrencyBitcoin fontSize="large" sx={{ color: '#f7931a' }} /> },
  { key: 'upi', label: 'UPI Apps (PhonePe, GPay, Paytm, etc)', icon: <QrCode fontSize="large" color="success" /> },
  { key: 'bank', label: 'Bank Transfer', icon: <AccountBalanceWallet fontSize="large" color="secondary" /> },
  { key: 'applepay', label: 'Apple Pay', icon: <Apps fontSize="large" sx={{ color: '#000' }} /> },
  { key: 'googlepay', label: 'Google Pay', icon: <Apps fontSize="large" sx={{ color: '#4285F4' }} /> },
];

const PaymentSettings = () => {
  const theme = useTheme();
  const [enabled, setEnabled] = useState({
    stripe: true,
    razorpay: true,
    paypal: true,
    crypto: false,
    upi: true,
    bank: false,
    applepay: false,
    googlepay: false,
  });

  const handleToggle = (key) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert('Payment method settings saved! (Demo only, not persisted)');
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        background: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{
          color: theme.palette.text.primary,
          letterSpacing: 1,
          mb: 4,
        }}
      >
        Payment Methods
      </Typography>
      <Grid container spacing={3}>
        {paymentMethods.map((method) => (
          <Grid item xs={12} sm={6} md={4} key={method.key}>
            <Fade in timeout={600}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                  boxShadow: 'none',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                  '&:hover': {
                    boxShadow: `0 2px 12px ${theme.palette.action.hover}`,
                    borderColor: theme.palette.primary.light,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {method.icon}
                    <Typography variant="h6" fontWeight={600}>
                      {method.label}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Tooltip title={enabled[method.key] ? 'Allowed for users' : 'Denied for users'} placement="top" arrow>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={!!enabled[method.key]}
                          onChange={() => handleToggle(method.key)}
                          color="primary"
                        />
                      }
                      label={enabled[method.key] ? 'Allowed' : 'Denied'}
                      labelPlacement="start"
                      sx={{
                        fontWeight: 500,
                        color: enabled[method.key]
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        ml: 0,
                      }}
                    />
                  </Tooltip>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 5 }} />
      <Box textAlign="center">
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            px: 6,
            py: 1.5,
            fontWeight: 700,
            fontSize: '1.1rem',
            borderRadius: 2,
            boxShadow: 'none',
            textTransform: 'none',
            letterSpacing: 1,
          }}
          onClick={handleSave}
        >
          Save Payment Settings
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSettings; 