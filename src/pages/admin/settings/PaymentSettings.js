import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  Switch,
  FormControlLabel,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Save, Payment } from '@mui/icons-material';

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    currency: 'USD',
    currencySymbol: '$',
    decimalPlaces: 2,
    enablePaypal: true,
    paypalClientId: '',
    paypalSecret: '',
    enableStripe: true,
    stripePublicKey: '',
    stripeSecretKey: '',
    enableBankTransfer: true,
    bankName: '',
    accountName: '',
    accountNumber: '',
    swiftCode: '',
    minimumWithdrawal: 50,
    withdrawalFee: 2.5,
    enableAutoWithdrawal: false,
    autoWithdrawalThreshold: 100,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving payment settings:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        Payment Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure payment gateways and withdrawal settings for your MLM system.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Currency Settings</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={settings.currency}
                  label="Currency"
                  onChange={handleChange('currency')}
                >
                  <MenuItem value="USD">USD - US Dollar</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                  <MenuItem value="GBP">GBP - British Pound</MenuItem>
                  <MenuItem value="INR">INR - Indian Rupee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Currency Symbol"
                value={settings.currencySymbol}
                onChange={handleChange('currencySymbol')}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Decimal Places"
                value={settings.decimalPlaces}
                onChange={handleChange('decimalPlaces')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>PayPal Configuration</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enablePaypal}
                    onChange={handleChange('enablePaypal')}
                  />
                }
                label="Enable PayPal Payments"
              />
            </Grid>
            {settings.enablePaypal && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="PayPal Client ID"
                    value={settings.paypalClientId}
                    onChange={handleChange('paypalClientId')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="PayPal Secret"
                    value={settings.paypalSecret}
                    onChange={handleChange('paypalSecret')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Stripe Configuration</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableStripe}
                    onChange={handleChange('enableStripe')}
                  />
                }
                label="Enable Stripe Payments"
              />
            </Grid>
            {settings.enableStripe && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stripe Public Key"
                    value={settings.stripePublicKey}
                    onChange={handleChange('stripePublicKey')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Stripe Secret Key"
                    value={settings.stripeSecretKey}
                    onChange={handleChange('stripeSecretKey')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Bank Transfer Settings</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableBankTransfer}
                    onChange={handleChange('enableBankTransfer')}
                  />
                }
                label="Enable Bank Transfer"
              />
            </Grid>
            {settings.enableBankTransfer && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Bank Name"
                    value={settings.bankName}
                    onChange={handleChange('bankName')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Name"
                    value={settings.accountName}
                    onChange={handleChange('accountName')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    value={settings.accountNumber}
                    onChange={handleChange('accountNumber')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SWIFT Code"
                    value={settings.swiftCode}
                    onChange={handleChange('swiftCode')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Withdrawal Settings</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Withdrawal Amount"
                value={settings.minimumWithdrawal}
                onChange={handleChange('minimumWithdrawal')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Withdrawal Fee (%)"
                value={settings.withdrawalFee}
                onChange={handleChange('withdrawalFee')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableAutoWithdrawal}
                    onChange={handleChange('enableAutoWithdrawal')}
                  />
                }
                label="Enable Automatic Withdrawals"
              />
            </Grid>
            {settings.enableAutoWithdrawal && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Auto Withdrawal Threshold"
                  value={settings.autoWithdrawalThreshold}
                  onChange={handleChange('autoWithdrawalThreshold')}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          size="large"
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSettings; 