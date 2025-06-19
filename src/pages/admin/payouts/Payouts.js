import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  AccountBalanceWallet,
  PendingActions,
  CheckCircle,
  Cancel,
  Search,
  Download,
  Payment,
} from '@mui/icons-material';

const Payouts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Summary cards data
  const summaryCards = [
    {
      title: 'Pending',
      amount: '$0',
      icon: <PendingActions sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.main',
    },
    {
      title: 'Approved',
      amount: '$0',
      icon: <CheckCircle sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info.main',
    },
    {
      title: 'Paid',
      amount: '$18.23',
      icon: <AccountBalanceWallet sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
    },
    {
      title: 'Rejected',
      amount: '$0',
      icon: <Cancel sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error.main',
    },
  ];

  // Payout transactions data
  const payoutTransactions = [
    {
      memberName: 'Matrixaddonecom',
      invoiceNumber: 'PR0001',
      amount: 18.23,
      payoutMethod: 'Bank Transfer',
      paidDate: 'November 27, 2023, 5:44 pm',
      status: 'Paid',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'approved':
        return 'info';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Payouts
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Payment />}
            sx={{ mr: 1 }}
          >
            Process Payment
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {card.icon}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ color: card.color }}>
                  {card.amount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Payout Summary Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Payout Summary</Typography>
            <TextField
              size="small"
              placeholder="Search payouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member Name</TableCell>
                  <TableCell>Invoice Number</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Payout Method</TableCell>
                  <TableCell>Paid Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payoutTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.memberName}</TableCell>
                    <TableCell>{transaction.invoiceNumber}</TableCell>
                    <TableCell align="right">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.payoutMethod}</TableCell>
                    <TableCell>{transaction.paidDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={getStatusColor(transaction.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payouts; 