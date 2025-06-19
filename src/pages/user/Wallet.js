import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  useMediaQuery,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  History,
  Download,
  Upload,
  Payment,
  CreditCard,
  AccountBalance,
  CurrencyBitcoin,
  QrCode2,
} from '@mui/icons-material';
import { payouts } from '../../services/api';

const Wallet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleWithdrawClick = () => {
    setWithdrawDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setWithdrawDialogOpen(false);
    setSelectedMethod('');
    setAmount('');
  };

  const handleWithdraw = async () => {
    try {
      await payouts.request({
        amount: Number(amount),
        method: selectedMethod,
        details: {}, // Optionally collect more details from form fields
      });
      setSnackbar({
        open: true,
        message: 'Withdrawal request submitted successfully!',
        severity: 'success',
      });
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit withdrawal request.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <QrCode2 />,
      description: 'Instant transfer to any UPI ID',
      minAmount: 100,
      maxAmount: 100000,
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <AccountBalance />,
      description: 'Direct bank transfer (1-2 business days)',
      minAmount: 500,
      maxAmount: 1000000,
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <CurrencyBitcoin />,
      description: 'Withdraw to your crypto wallet',
      minAmount: 1000,
      maxAmount: 500000,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: <CreditCard />,
      description: 'Withdraw to your card via Stripe',
      minAmount: 200,
      maxAmount: 200000,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Payment />,
      description: 'Withdraw to your PayPal account',
      minAmount: 100,
      maxAmount: 100000,
    },
  ];

  const stats = [
    {
      title: 'Available Balance',
      value: '$2,500.00',
      icon: <AccountBalanceWallet sx={{ fontSize: 40, color: 'primary.main' }} />,
      action: (
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={handleWithdrawClick}
          sx={{ mt: 2 }}
        >
          Withdraw
        </Button>
      ),
    },
    {
      title: 'Total Earned',
      value: '$5,250.00',
      icon: <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Pending Balance',
      value: '$750.00',
      icon: <TrendingDown sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Wallet
        </Typography>

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
                      {stat.action}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Withdrawal Dialog */}
          <Dialog
            open={withdrawDialogOpen}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Withdraw Funds
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormLabel>Select Withdrawal Method</FormLabel>
                  <RadioGroup
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <Paper
                        key={method.id}
                        sx={{
                          p: 2,
                          mb: 2,
                          border: '1px solid',
                          borderColor: selectedMethod === method.id ? 'primary.main' : 'divider',
                          borderRadius: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                          },
                        }}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <FormControlLabel
                          value={method.id}
                          control={<Radio />}
                          label={
                            <Box>
                              <Stack direction="row" spacing={1} alignItems="center">
                                {method.icon}
                                <Typography variant="subtitle1">{method.name}</Typography>
                              </Stack>
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                                {method.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
                                Min: ${method.minAmount} | Max: ${method.maxAmount}
                              </Typography>
                            </Box>
                          }
                          sx={{ width: '100%', m: 0 }}
                        />
                      </Paper>
                    ))}
                  </RadioGroup>
                </FormControl>

                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                  }}
                  sx={{ mb: 3 }}
                />

                {selectedMethod === 'upi' && (
                  <TextField
                    fullWidth
                    label="UPI ID"
                    placeholder="Enter your UPI ID"
                    sx={{ mb: 3 }}
                  />
                )}

                {selectedMethod === 'bank' && (
                  <>
                    <TextField
                      fullWidth
                      label="Account Number"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      sx={{ mb: 3 }}
                    />
                  </>
                )}

                {selectedMethod === 'crypto' && (
                  <TextField
                    fullWidth
                    label="Wallet Address"
                    placeholder="Enter your crypto wallet address"
                    sx={{ mb: 3 }}
                  />
                )}

                {selectedMethod === 'stripe' && (
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="Enter your card number"
                    sx={{ mb: 3 }}
                  />
                )}

                {selectedMethod === 'paypal' && (
                  <TextField
                    fullWidth
                    label="PayPal Email"
                    placeholder="Enter your PayPal email"
                    sx={{ mb: 3 }}
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleWithdraw}
                disabled={!selectedMethod || !amount}
              >
                Withdraw
              </Button>
            </DialogActions>
          </Dialog>

          {/* Transaction History */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Recent Transactions
              </Typography>
              <Grid container spacing={2}>
                {[
                  {
                    type: 'Withdrawal',
                    amount: -500.00,
                    date: '2024-03-15',
                    status: 'Completed',
                    description: 'Bank Transfer',
                  },
                  {
                    type: 'Commission',
                    amount: 250.00,
                    date: '2024-03-14',
                    status: 'Completed',
                    description: 'Level 1 Commission',
                  },
                  {
                    type: 'Bonus',
                    amount: 100.00,
                    date: '2024-03-13',
                    status: 'Completed',
                    description: 'Team Performance Bonus',
                  },
                ].map((transaction, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        bgcolor: 'background.default',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountBalanceWallet sx={{ mr: 2, color: 'primary.main' }} />
                        <Box>
                          <Typography variant="subtitle1">{transaction.description}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(transaction.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: transaction.amount > 0 ? 'success.main' : 'error.main',
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Payment Methods</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Upload />}
                  sx={{ borderRadius: 2 }}
                >
                  Add New
                </Button>
              </Stack>

              <Grid container spacing={2}>
                {[
                  {
                    id: 1,
                    type: 'Bank Account',
                    details: '****1234',
                    isDefault: true,
                  },
                  {
                    id: 2,
                    type: 'PayPal',
                    details: 'john.doe@example.com',
                    isDefault: false,
                  },
                  {
                    id: 3,
                    type: 'UPI',
                    details: 'john.doe@upi',
                    isDefault: false,
                  },
                ].map((method) => (
                  <Grid item xs={12} sm={6} key={method.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <AccountBalanceWallet color="primary" />
                          <Box>
                            <Typography variant="subtitle1">
                              {method.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {method.details}
                            </Typography>
                          </Box>
                          {method.isDefault && (
                            <Chip
                              label="Default"
                              size="small"
                              color="primary"
                              sx={{ ml: 'auto' }}
                            />
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default Wallet; 