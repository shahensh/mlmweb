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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Save, Send } from '@mui/icons-material';

const EmailSettings = () => {
  const [settings, setSettings] = useState({
    mailDriver: 'smtp',
    mailHost: 'smtp.gmail.com',
    mailPort: 587,
    mailUsername: '',
    mailPassword: '',
    mailEncryption: 'tls',
    mailFromAddress: 'noreply@mlmsystem.com',
    mailFromName: 'MLM System',
    enableNotifications: true,
    welcomeEmail: true,
    orderConfirmation: true,
    commissionNotification: true,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving email settings:', settings);
  };

  const handleTestEmail = () => {
    // Implement test email functionality
    console.log('Sending test email...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        Email Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure your email settings for system notifications and user communications.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>SMTP Configuration</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Mail Driver</InputLabel>
                <Select
                  value={settings.mailDriver}
                  label="Mail Driver"
                  onChange={handleChange('mailDriver')}
                >
                  <MenuItem value="smtp">SMTP</MenuItem>
                  <MenuItem value="sendmail">Sendmail</MenuItem>
                  <MenuItem value="mailgun">Mailgun</MenuItem>
                  <MenuItem value="ses">Amazon SES</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mail Host"
                value={settings.mailHost}
                onChange={handleChange('mailHost')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Mail Port"
                value={settings.mailPort}
                onChange={handleChange('mailPort')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Encryption</InputLabel>
                <Select
                  value={settings.mailEncryption}
                  label="Encryption"
                  onChange={handleChange('mailEncryption')}
                >
                  <MenuItem value="tls">TLS</MenuItem>
                  <MenuItem value="ssl">SSL</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                value={settings.mailUsername}
                onChange={handleChange('mailUsername')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={settings.mailPassword}
                onChange={handleChange('mailPassword')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Sender Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="From Address"
                type="email"
                value={settings.mailFromAddress}
                onChange={handleChange('mailFromAddress')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="From Name"
                value={settings.mailFromName}
                onChange={handleChange('mailFromName')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Email Notifications</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={handleChange('enableNotifications')}
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.welcomeEmail}
                    onChange={handleChange('welcomeEmail')}
                    disabled={!settings.enableNotifications}
                  />
                }
                label="Send Welcome Email to New Users"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.orderConfirmation}
                    onChange={handleChange('orderConfirmation')}
                    disabled={!settings.enableNotifications}
                  />
                }
                label="Send Order Confirmation Emails"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.commissionNotification}
                    onChange={handleChange('commissionNotification')}
                    disabled={!settings.enableNotifications}
                  />
                }
                label="Send Commission Notifications"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Send />}
          onClick={handleTestEmail}
          size="large"
        >
          Send Test Email
        </Button>
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

export default EmailSettings; 