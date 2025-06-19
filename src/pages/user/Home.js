import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Stack,
  Link,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info,
  HowToReg,
  Login,
  SupportAgent,
  RocketLaunch,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="md">
        {/* About MLM Plan */}
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Info color="primary" />
            <Typography variant="h5" fontWeight="bold">About MLM Matrix</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Our MLM Matrix plan is designed to empower individuals to build their own business network and earn income through referrals and team growth. Enjoy transparent commissions, bonuses, and a supportive community. The matrix structure ensures fair placement and maximizes earning potential for all members.
          </Typography>
        </Paper>

        {/* About Our Site */}
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Info color="secondary" />
            <Typography variant="h5" fontWeight="bold">About Our Site</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Welcome to our MLM portal! We provide a modern, secure, and user-friendly platform for managing your network marketing business. Track your team, earnings, and growth in real time. Our mission is to help you succeed with the best tools and support in the industry.
          </Typography>
        </Paper>

        {/* Login / Register */}
        {!loading && !isAuthenticated && (
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Login color="info" />
              <Typography variant="h5" fontWeight="bold">Login / Register</Typography>
            </Stack>
            <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <Button variant="outlined" color="primary" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="contained" color="primary" onClick={() => navigate('/register')}>Register</Button>
            </Stack>
          </Paper>
        )}

        {/* Contact / Support */}
        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <SupportAgent color="secondary" />
            <Typography variant="h5" fontWeight="bold">Contact / Support</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Need help? Reach out to our support team:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: <Link href="mailto:support@mlmportal.com">support@mlmportal.com</Link><br />
            Phone: <Link href="tel:+1234567890">+1 234 567 890</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 