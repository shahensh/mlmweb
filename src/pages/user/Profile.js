import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Stack,
  Chip,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person,
  Group,
  EmojiEvents,
  TrendingUp,
  AccountBalanceWallet,
  Star,
  CalendarToday,
  LocationOn,
  Phone,
  Email,
  PhotoCamera,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const theme = useTheme();
  const { currentUser, setCurrentUser } = useAuth();
  const [tab, setTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    password: '',
    newPassword: '',
    confirmPassword: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    defaultSetting: 'email',
  });

  const handleTabChange = (e, v) => {
    setTab(v);
    setSuccess('');
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setSuccess('Photo updated (not saved to server in demo)');
    }
  };

  const handleSave = (section) => {
    setSaving(true);
    setSuccess('');
    setError('');
    setTimeout(() => {
      setSaving(false);
      setSuccess(section + ' updated successfully!');
      if (section === 'Personal info' || section === 'Photo') {
        setCurrentUser({
          ...currentUser,
          name: form.name,
          email: form.email,
          phone: form.phone,
          location: form.location,
          photo: photo || currentUser?.photo,
        });
      }
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, mb: 3, background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)', border: '1px solid', borderColor: 'divider' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Avatar src={photo} sx={{ width: { xs: 100, sm: 120 }, height: { xs: 100, sm: 120 }, bgcolor: theme.palette.primary.main, fontSize: '2.5rem' }}>
                  {form.name[0]}
                </Avatar>
                <input accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" onChange={handlePhotoChange} />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'white', boxShadow: 1 }}>
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Box>
            </Grid>
            <Grid item xs={12} sm>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{form.name}</Typography>
              <Typography variant="body1" color="text.secondary">{form.email}</Typography>
              {currentUser?.userId && (
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600, letterSpacing: 1, mt: 0.5 }}>
                  User ID: {currentUser.userId}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">{form.phone} • {form.location}</Typography>
            </Grid>
          </Grid>
          <Tabs value={tab} onChange={handleTabChange} sx={{ mt: 3, mb: 2 }} variant="scrollable" scrollButtons="auto">
            <Tab label="Personal Info" />
            <Tab label="Password" />
            <Tab label="Bank Details" />
            <Tab label="Profile Settings" />
          </Tabs>
          {tab === 0 && (
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Location" name="location" value={form.location} onChange={handleChange} fullWidth /></Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleSave('Personal info')} disabled={saving}>{saving ? <CircularProgress size={22} /> : 'Save Changes'}</Button>
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
          )}
          {tab === 1 && (
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Current Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} fullWidth InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword((s) => !s)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="New Password" name="newPassword" type={showPassword ? 'text' : 'password'} value={form.newPassword} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Confirm New Password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} fullWidth /></Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleSave('Password')} disabled={saving}>{saving ? <CircularProgress size={22} /> : 'Update Password'}</Button>
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
          )}
          {tab === 2 && (
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Account Number" name="accountNumber" value={form.accountNumber} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="IFSC Code" name="ifsc" value={form.ifsc} onChange={handleChange} fullWidth /></Grid>
              </Grid>
              <Button variant="contained" sx={{ mt: 3 }} onClick={() => handleSave('Bank details')} disabled={saving}>{saving ? <CircularProgress size={22} /> : 'Save Bank Details'}</Button>
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
          )}
          {tab === 3 && (
            <Box component="form" sx={{ mt: 2 }}>
              <TextField select label="Default Notification Method" name="defaultSetting" value={form.defaultSetting} onChange={handleChange} fullWidth SelectProps={{ native: true }} sx={{ mb: 2 }}>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="push">Push Notification</option>
              </TextField>
              <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleSave('Profile settings')} disabled={saving}>{saving ? <CircularProgress size={22} /> : 'Save Settings'}</Button>
              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 