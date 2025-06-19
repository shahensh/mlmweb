import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Avatar,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Fade,
  Alert,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  PersonAdd,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Person,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleRoleChange = (event, newRole) => {
    setRole(newRole);
    setFormData((prev) => ({ ...prev, role: newRole }));
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (Object.values(formData).some((value) => !value)) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });
      navigate(formData.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  mb: { xs: 1, sm: 2 },
                }}
              >
                <PersonAdd />
              </Avatar>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  textAlign: 'center',
                }}
              >
                Create Account
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                Join our MLM network today
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Tabs
              value={role}
              onChange={handleRoleChange}
              centered
              sx={{ 
                mb: { xs: 2, sm: 3 },
                '& .MuiTab-root': {
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: 'auto', sm: 160 },
                  px: { xs: 1, sm: 2 },
                },
              }}
            >
              <Tab
                value="user"
                icon={<Person />}
                label={isMobile ? 'User' : 'User Signup'}
                iconPosition="start"
              />
              <Tab
                value="admin"
                icon={<AdminPanelSettings />}
                label={isMobile ? 'Admin' : 'Admin Signup'}
                iconPosition="start"
              />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    size={isMobile ? 'small' : 'medium'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    size={isMobile ? 'small' : 'medium'}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                size={isMobile ? 'small' : 'medium'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size={isMobile ? 'small' : 'medium'}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                size={isMobile ? 'small' : 'medium'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size={isMobile ? 'small' : 'medium'}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size={isMobile ? 'medium' : 'large'}
                disabled={loading}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: { xs: 1, sm: 1.5 },
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
              </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Link
                    component={RouterLink}
                    to="/login"
                  variant="body2"
                  sx={{ 
                    textDecoration: 'none',
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Signup; 