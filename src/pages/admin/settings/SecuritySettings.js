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
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Save, Security } from '@mui/icons-material';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipRestriction: false,
    allowedIPs: '',
    sslEnabled: true,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving security settings:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        Security Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure your system's security settings to protect user accounts and data.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Password Policy</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Password Length"
                value={settings.passwordMinLength}
                onChange={handleChange('passwordMinLength')}
                InputProps={{ inputProps: { min: 6, max: 32 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireSpecialChar}
                    onChange={handleChange('requireSpecialChar')}
                  />
                }
                label="Require Special Characters"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireNumber}
                    onChange={handleChange('requireNumber')}
                  />
                }
                label="Require Numbers"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireUppercase}
                    onChange={handleChange('requireUppercase')}
                  />
                }
                label="Require Uppercase Letters"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Session & Authentication</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Session Timeout (minutes)"
                value={settings.sessionTimeout}
                onChange={handleChange('sessionTimeout')}
                InputProps={{ inputProps: { min: 5, max: 1440 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Login Attempts"
                value={settings.maxLoginAttempts}
                onChange={handleChange('maxLoginAttempts')}
                InputProps={{ inputProps: { min: 3, max: 10 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleChange('twoFactorAuth')}
                  />
                }
                label="Enable Two-Factor Authentication"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.sslEnabled}
                    onChange={handleChange('sslEnabled')}
                  />
                }
                label="Force SSL"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>IP Restrictions</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.ipRestriction}
                    onChange={handleChange('ipRestriction')}
                  />
                }
                label="Enable IP Restrictions"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Allowed IP Addresses"
                value={settings.allowedIPs}
                onChange={handleChange('allowedIPs')}
                placeholder="Enter IP addresses (one per line)"
                disabled={!settings.ipRestriction}
              />
            </Grid>
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

export default SecuritySettings; 