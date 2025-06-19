import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Alert,
  Card,
  CardContent,
  useTheme,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Drawer,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Save,
  Notifications,
  Security,
  Payment,
  Language,
  Visibility,
  VisibilityOff,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { users } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { setCurrentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Mock user settings data
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      teamUpdates: true,
      commissionAlerts: true,
      newMemberAlerts: true,
      systemUpdates: true,
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: '30',
    },
    payment: {
      bankName: 'Example Bank',
      accountNumber: '****1234',
      accountHolder: 'John Doe',
      swiftCode: 'EXBK1234',
      taxId: 'TAX123456',
      preferredCurrency: 'USD',
    },
    preferences: {
      language: 'en',
      timezone: 'UTC+0',
      dateFormat: 'MM/DD/YYYY',
      numberFormat: '1,234.56',
      theme: 'light',
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async (section) => {
    setSaving(true);
    setSaveMsg('');
    try {
      // Here you would typically make an API call to save the settings
      console.log(`Saving ${section} settings:`, settings[section]);
      setSaveMsg('Settings updated!');
    } catch (err) {
      setSaveMsg('Failed to update.');
    } finally {
      setSaving(false);
    }
  };

  const NotificationSettings = () => (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Manage your notification preferences to stay updated with your MLM activities.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Email Notifications
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                />
              }
              label="Enable Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.marketingEmails}
                  onChange={(e) => handleInputChange('notifications', 'marketingEmails', e.target.checked)}
                />
              }
              label="Marketing and Promotional Emails"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.teamUpdates}
                  onChange={(e) => handleInputChange('notifications', 'teamUpdates', e.target.checked)}
                />
              }
              label="Team Updates"
            />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            SMS Notifications
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                />
              }
              label="Enable SMS Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.commissionAlerts}
                  onChange={(e) => handleInputChange('notifications', 'commissionAlerts', e.target.checked)}
                />
              }
              label="Commission Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.newMemberAlerts}
                  onChange={(e) => handleInputChange('notifications', 'newMemberAlerts', e.target.checked)}
                />
              }
              label="New Member Alerts"
            />
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => handleSave('notifications')}
          size={isMobile ? "small" : "medium"}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );

  const SecuritySettings = () => (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Keep your account secure by regularly updating your password and security settings.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Password Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Current Password"
                value={settings.security.currentPassword}
                onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                label="New Password"
                value={settings.security.newPassword}
                onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm New Password"
                value={settings.security.confirmPassword}
                onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Security Options
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                />
              }
              label="Two-Factor Authentication"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.loginAlerts}
                  onChange={(e) => handleInputChange('security', 'loginAlerts', e.target.checked)}
                />
              }
              label="Login Alerts"
            />
            <TextField
              select
              fullWidth
              label="Session Timeout"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => handleSave('security')}
          size={isMobile ? "small" : "medium"}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );

  const PaymentSettings = () => (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Configure your payment and payout preferences.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Bank Account Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bank Name"
                value={settings.payment.bankName}
                onChange={(e) => handleInputChange('payment', 'bankName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Number"
                value={settings.payment.accountNumber}
                onChange={(e) => handleInputChange('payment', 'accountNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Holder Name"
                value={settings.payment.accountHolder}
                onChange={(e) => handleInputChange('payment', 'accountHolder', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SWIFT Code"
                value={settings.payment.swiftCode}
                onChange={(e) => handleInputChange('payment', 'swiftCode', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tax ID"
                value={settings.payment.taxId}
                onChange={(e) => handleInputChange('payment', 'taxId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Preferred Currency"
                value={settings.payment.preferredCurrency}
                onChange={(e) => handleInputChange('payment', 'preferredCurrency', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => handleSave('payment')}
          size={isMobile ? "small" : "medium"}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );

  const PreferenceSettings = () => (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Customize your app experience with these preferences.
      </Alert>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Display Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Language"
                value={settings.preferences.language}
                onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Time Zone"
                value={settings.preferences.timezone}
                onChange={(e) => handleInputChange('preferences', 'timezone', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="UTC+0">UTC+0 - London</option>
                <option value="UTC-5">UTC-5 - New York</option>
                <option value="UTC-8">UTC-8 - Los Angeles</option>
                <option value="UTC+8">UTC+8 - Singapore</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Date Format"
                value={settings.preferences.dateFormat}
                onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Number Format"
                value={settings.preferences.numberFormat}
                onChange={(e) => handleInputChange('preferences', 'numberFormat', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="1,234.56">1,234.56</option>
                <option value="1.234,56">1.234,56</option>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => handleSave('preferences')}
          size={isMobile ? "small" : "medium"}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
            },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Stack>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <NotificationSettings />;
      case 1:
        return <SecuritySettings />;
      case 2:
        return <PaymentSettings />;
      case 3:
        return <PreferenceSettings />;
      default:
        return <NotificationSettings />;
    }
  };

  const tabs = [
    { label: 'Notifications', icon: <Notifications /> },
    { label: 'Security', icon: <Security /> },
    { label: 'Payment', icon: <Payment /> },
    { label: 'Preferences', icon: <Language /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {isMobile && (
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setMobileDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Settings
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Paper sx={{ position: 'sticky', top: 20 }}>
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      minHeight: 64,
                      justifyContent: 'flex-start',
                    },
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      icon={tab.icon}
                      label={tab.label}
                      iconPosition="start"
                      sx={{
                        alignItems: 'center',
                        gap: 1,
                      }}
                    />
                  ))}
                </Tabs>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            {saveMsg && (
              <Alert
                severity={saveMsg.includes('Failed') ? 'error' : 'success'}
                sx={{ mb: 2 }}
                onClose={() => setSaveMsg('')}
              >
                {saveMsg}
              </Alert>
            )}
            {renderContent()}
          </Grid>
        </Grid>
      </Container>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          PaperProps={{
            sx: { width: '80%', maxWidth: 300 },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Settings</Typography>
            <IconButton onClick={() => setMobileDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: 64,
                justifyContent: 'flex-start',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                sx={{
                  alignItems: 'center',
                  gap: 1,
                }}
              />
            ))}
          </Tabs>
        </Drawer>
      )}
    </Box>
  );
};

export default Settings;