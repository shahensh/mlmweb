import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  People,
  Group,
  Star,
  AttachMoney,
  PersonAdd,
  ShoppingCart,
  Timeline,
  EmojiEvents,
  MonetizationOn,
} from '@mui/icons-material';

const mockRecentActivity = [
  { id: 1, type: 'earning', message: 'You earned $50 commission', time: '2 min ago', icon: <AttachMoney color="success" /> },
  { id: 2, type: 'referral', message: 'Referral commission: $20', time: '10 min ago', icon: <PersonAdd color="primary" /> },
  { id: 3, type: 'bonus', message: 'Bonus received: $100', time: '1 hour ago', icon: <EmojiEvents color="warning" /> },
  { id: 4, type: 'team', message: 'New member joined your team', time: '3 hours ago', icon: <Group color="info" /> },
  { id: 5, type: 'earning', message: 'You earned $120 bonus', time: 'Yesterday', icon: <MonetizationOn color="success" /> },
];

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simulate real-time data
  const [earnings, setEarnings] = useState({
    balance: 2500.0,
    total: 12000.0,
    today: 120.0,
  });
  const [commissions, setCommissions] = useState({
    total: 3200.0,
    today: 40.0,
  });
  const [bonuses, setBonuses] = useState({
    total: 1500.0,
    today: 30.0,
  });
  const [teamStats, setTeamStats] = useState({
    total: 48,
    active: 41,
    newThisMonth: 7,
  });
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => ({
        ...prev,
        balance: prev.balance + Math.random() * 10,
        today: prev.today + Math.random() * 2,
      }));
      setCommissions((prev) => ({
        ...prev,
        total: prev.total + Math.random() * 5,
        today: prev.today + Math.random() * 1,
      }));
      setBonuses((prev) => ({
        ...prev,
        total: prev.total + Math.random() * 3,
        today: prev.today + Math.random() * 0.5,
      }));
      setTeamStats((prev) => ({
        ...prev,
        newThisMonth: prev.newThisMonth + (Math.random() > 0.97 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="lg">
        <Fade in={true}>
          <Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {/* Earnings Card */}
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 3,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                        <AccountBalanceWallet />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Earnings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current Balance
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h3" fontWeight="bold" color="primary.main" mb={1}>
                      ${earnings.balance.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Earned: <b>${earnings.total.toFixed(2)}</b>
                    </Typography>
                    <Typography variant="body2" color="success.main" mb={2}>
                      +${earnings.today.toFixed(2)} today
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Commissions Card */}
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 3,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48 }}>
                        <TrendingUp />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Referral Commissions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          From Referrals
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h4" fontWeight="bold" color="success.main" mb={1}>
                      ${commissions.total.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="success.main" mb={2}>
                      +${commissions.today.toFixed(2)} today
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Bonuses Card */}
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 3,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48 }}>
                        <EmojiEvents />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Bonuses
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Special Rewards
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h4" fontWeight="bold" color="warning.main" mb={1}>
                      ${bonuses.total.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="warning.main" mb={2}>
                      +${bonuses.today.toFixed(2)} today
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Team Stats and Recent Activity */}
            <Grid container spacing={3}>
              {/* Team Stats Card */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 3,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Avatar sx={{ bgcolor: 'info.main', width: 48, height: 48 }}>
                        <People />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Team Stats
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Your Network
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h3" fontWeight="bold" color="info.main" mb={1}>
                      {teamStats.total}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Active: <b>{teamStats.active}</b>
                    </Typography>
                    <Typography variant="body2" color="warning.main" mb={2}>
                      +{teamStats.newThisMonth} new this month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Activity Feed */}
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: 3,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                      Recent Activity
                    </Typography>
                    <List>
                      {recentActivity.map((activity) => (
                        <ListItem key={activity.id} alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'background.paper' }}>{activity.icon}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={activity.message}
                            secondary={activity.time}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard; 