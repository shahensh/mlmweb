import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  FilterList,
  Send,
  Add,
} from '@mui/icons-material';

const EWallet = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '2024-03-15',
      type: 'credit',
      amount: 1000,
      description: 'Commission from Level 1',
      status: 'completed',
      balance: 1500,
    },
    {
      id: 2,
      date: '2024-03-14',
      type: 'debit',
      amount: 500,
      description: 'Withdrawal to Bank Account',
      status: 'pending',
      balance: 500,
    },
    {
      id: 3,
      date: '2024-03-13',
      type: 'credit',
      amount: 750,
      description: 'Referral Bonus',
      status: 'completed',
      balance: 1000,
    },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    type: 'credit',
    amount: '',
    description: '',
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTransaction({
      type: 'credit',
      amount: '',
      description: '',
    });
  };

  const handleAddTransaction = () => {
    const transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...newTransaction,
      status: 'pending',
      balance: 0, // This should be calculated based on previous balance
    };
    setTransactions([transaction, ...transactions]);
    handleCloseDialog();
  };

  const handleChange = (field) => (event) => {
    setNewTransaction({
      ...newTransaction,
      [field]: event.target.value,
    });
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          E-Wallet Management
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalance sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Balance</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  $1,500.00
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Available for withdrawal
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingUp sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Credits</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  $30,000.00
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #F44336 30%, #E57373 90%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingDown sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Debits</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  $5,000.00
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccountBalance sx={{ mr: 1 }} />
                  <Typography variant="h6">Pending</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  $500.00
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Awaiting approval
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Transactions Table */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search transactions..."
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
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ minWidth: '120px' }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              sx={{ minWidth: '120px' }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenDialog}
            >
              Add Transaction
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow 
                      key={transaction.id}
                      onClick={() => handleTransactionClick(transaction)}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.type}
                          color={transaction.type === 'credit' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${Number(transaction.amount).toFixed(2)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          color={getStatusColor(transaction.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${Number(transaction.balance).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      {/* Transaction Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Transaction Details
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedTransaction && (
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    bgcolor: selectedTransaction.type === 'credit' ? 'success.lighter' : 'error.lighter',
                    mb: 2
                  }}>
                    <Typography variant="h6" sx={{ 
                      color: selectedTransaction.type === 'credit' ? 'success.main' : 'error.main',
                      fontWeight: 'bold',
                      mb: 1
                    }}>
                      {selectedTransaction.type === 'credit' ? '+' : '-'}${Number(selectedTransaction.amount).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedTransaction.description}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Transaction ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {selectedTransaction.id}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {selectedTransaction.date}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip 
                    label={selectedTransaction.status}
                    size="small"
                    color={getStatusColor(selectedTransaction.status)}
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
              }
            }}
          >
            Download Receipt
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Transaction Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={newTransaction.type}
                label="Transaction Type"
                onChange={handleChange('type')}
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={newTransaction.amount}
              onChange={handleChange('amount')}
            />
            <TextField
              fullWidth
              label="Description"
              value={newTransaction.description}
              onChange={handleChange('description')}
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddTransaction} variant="contained">
            Add Transaction
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EWallet; 