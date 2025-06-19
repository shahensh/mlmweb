import React, { useState, useEffect } from 'react';
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
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Payment,
  Pending,
} from '@mui/icons-material';
import { payouts } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const Payouts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedItems, setSelectedItems] = useState([]);
  const [payoutList, setPayoutList] = useState([]);
  const { currentUser } = useAuth();
  const socket = useSocket();

  // Fetch payouts on mount
  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const data = await payouts.getAll();
        setPayoutList(data);
      } catch (err) {
        // handle error
      }
    };
    fetchPayouts();
  }, []);

  // Real-time payout updates
  useEffect(() => {
    if (!socket || !currentUser) return;
    const eventName = `payout:${currentUser._id}`;
    const handler = (event) => {
      if (event.type === 'created') {
        setPayoutList((prev) => [event.payout, ...prev]);
      } else if (event.type === 'status') {
        setPayoutList((prev) => prev.map(p => p._id === event.payout._id ? event.payout : p));
      }
    };
    socket.on(eventName, handler);
    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, currentUser]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(['all']);
    } else {
      setSelectedItems([]);
    }
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

  const StatusChip = ({ status }) => {
    const statusConfig = {
      requested: {
        color: 'warning',
        icon: <Pending sx={{ fontSize: 16 }} />,
        label: 'Requested',
      },
      approved: {
        color: 'info',
        icon: <CheckCircle sx={{ fontSize: 16 }} />,
        label: 'Approved',
      },
      paid: {
        color: 'success',
        icon: <Payment sx={{ fontSize: 16 }} />,
        label: 'Paid',
      },
      rejected: {
        color: 'error',
        icon: <Cancel sx={{ fontSize: 16 }} />,
        label: 'Rejected',
      },
    };

    const config = statusConfig[status.toLowerCase()];

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
        sx={{ borderRadius: 1 }}
      />
    );
  };

  // Group payouts by status
  const requested = payoutList.filter(p => p.status === 'requested');
  const approved = payoutList.filter(p => p.status === 'approved');
  const paid = payoutList.filter(p => p.status === 'paid');
  const rejected = payoutList.filter(p => p.status === 'rejected');

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
          Payouts
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard
              title="Requested"
              amount={requested.length}
              icon={<Pending sx={{ color: theme.palette.warning.main }} />}
              trend="down"
              trendValue="0"
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard
              title="Approved"
              amount={approved.length}
              icon={<CheckCircle sx={{ color: theme.palette.info.main }} />}
              trend="down"
              trendValue="0"
              color={theme.palette.info.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard
              title="Paid"
              amount={paid.length}
              icon={<Payment sx={{ color: theme.palette.success.main }} />}
              trend="down"
              trendValue="0"
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BalanceCard
              title="Rejected"
              amount={rejected.length}
              icon={<Cancel sx={{ color: theme.palette.error.main }} />}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedItems.includes('all')}
                  onChange={handleSelectAll}
                  color="primary"
                />
              }
              label="All items are selected"
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Payout Method</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requested.map((payout) => (
                  <TableRow key={payout._id}>
                    <TableCell>{new Date(payout.createdAt).toLocaleString()}</TableCell>
                    <TableCell align="right">${payout.amount}</TableCell>
                    <TableCell align="right">{payout.method}</TableCell>
                    <TableCell align="right"><StatusChip status={payout.status} /></TableCell>
                  </TableRow>
                ))}
                {requested.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                      <Stack spacing={2} alignItems="center">
                        <Typography color="text.secondary">No requested payouts</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Payouts; 