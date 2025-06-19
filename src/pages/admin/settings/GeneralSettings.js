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
  Divider,
  Alert,
} from '@mui/material';
import { Save } from '@mui/icons-material';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'MLM System',
    siteDescription: 'Multi-Level Marketing Management System',
    siteEmail: 'admin@mlmsystem.com',
    sitePhone: '+1 234 567 8900',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    phoneVerification: false,
  });

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving general settings:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
        General Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure your MLM system's general settings and preferences.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Site Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                value={settings.siteName}
                onChange={handleChange('siteName')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Description"
                value={settings.siteDescription}
                onChange={handleChange('siteDescription')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={settings.siteEmail}
                onChange={handleChange('siteEmail')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={settings.sitePhone}
                onChange={handleChange('sitePhone')}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>System Settings</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.maintenanceMode}
                    onChange={handleChange('maintenanceMode')}
                  />
                }
                label="Maintenance Mode"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.registrationEnabled}
                    onChange={handleChange('registrationEnabled')}
                  />
                }
                label="Enable User Registration"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailVerification}
                    onChange={handleChange('emailVerification')}
                  />
                }
                label="Require Email Verification"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.phoneVerification}
                    onChange={handleChange('phoneVerification')}
                  />
                }
                label="Require Phone Verification"
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

export default GeneralSettings; 