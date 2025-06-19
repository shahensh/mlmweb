import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

const CommissionSettings = () => {
  const [settings, setSettings] = useState({
    purchaseWalletCommission: 20,
    serviceCharge: 5,
    tax: 5,
    transactionFee: 5,
    skipBlockedUsers: false,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        Commission Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body1">
          Here, you can configure the following commission settings:
        </Typography>
        <ul>
          <li>
            <strong>Purchase Wallet(%):</strong> Specified percentage of commission earned will be saved in purchase wallet and the remaining amount will be saved in E-wallet.
          </li>
          <li>
            <strong>Service Charge(%):</strong> Specified percentage will be deducted from commission generated (Member will receive only the remaining amount).
          </li>
          <li>
            <strong>Tax(%):</strong> Specified percentage will be deducted from commission generated (Member will receive only the remaining amount).
          </li>
          <li>
            When dynamic compression is enabled, the unilevel commission of inactive users will be given to upline users.
          </li>
          <li>
            When you choose to skip a bonus for blocked users, no commission will be generated for inactive users.
          </li>
        </ul>
      </Alert>

      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Purchase Wallet Commission (%)"
                type="number"
                value={settings.purchaseWalletCommission}
                onChange={handleChange('purchaseWalletCommission')}
                InputProps={{
                  endAdornment: <Typography>%</Typography>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Service Charge (%)"
                type="number"
                value={settings.serviceCharge}
                onChange={handleChange('serviceCharge')}
                InputProps={{
                  endAdornment: <Typography>%</Typography>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax (%)"
                type="number"
                value={settings.tax}
                onChange={handleChange('tax')}
                InputProps={{
                  endAdornment: <Typography>%</Typography>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Transaction Fee"
                type="number"
                value={settings.transactionFee}
                onChange={handleChange('transactionFee')}
                InputProps={{
                  endAdornment: <Typography>%</Typography>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.skipBlockedUsers}
                    onChange={handleChange('skipBlockedUsers')}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>Skip bonus for blocked users</Typography>
                    <InfoIcon color="action" fontSize="small" />
                  </Box>
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => console.log('Save settings:', settings)}
          className="btn btn-primary"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </Box>
    </Box>
  );
};

export default CommissionSettings; 