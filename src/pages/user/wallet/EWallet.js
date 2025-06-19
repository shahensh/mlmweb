import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material';
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';

const EWallet = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const BalanceCard = ({ title, amount, icon, trend, trendValue, color }) => (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: 2,
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          ${amount}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend === 'up' ? (
            <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
          ) : (
            <TrendingDown sx={{ color: 'error.main', mr: 1 }} />
          )}
          <Typography
            variant="body2"
            color={trend === 'up' ? 'success.main' : 'error.main'}
          >
            {trendValue}% Last Month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          E-Wallet
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <BalanceCard
              title="E-Wallet Balance"
              amount="0"
              icon={<AccountBalanceWallet sx={{ color: theme.palette.primary.main }} />}
              trend="up"
              trendValue="0"
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BalanceCard
              title="Credited Amount"
              amount="0"
              icon={<TrendingUp sx={{ color: theme.palette.success.main }} />}
              trend="down"
              trendValue="0"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BalanceCard
              title="Debited Amount"
              amount="0"
              icon={<TrendingDown sx={{ color: theme.palette.error.main }} />}
              trend="down"
              trendValue="0"
              color={theme.palette.error.main}
            />
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Purchase Wallet
            </Typography>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              $0
            </Typography>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  minWidth: 100,
                },
              }}
            >
              <Tab label="Statement" />
              <Tab label="Transfer History" />
              <Tab label="Purchase Wallet" />
              <Tab label="My Earnings" />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Transaction Date</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <Stack spacing={2} alignItems="center">
                      <Typography color="text.secondary">
                        Sorry no data found
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default EWallet; 