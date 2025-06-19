import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  FilterList,
  Refresh,
  Visibility,
} from '@mui/icons-material';

const Activity = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [activityType, setActivityType] = React.useState('all');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
  };

  // Sample activity data
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Login',
      type: 'Authentication',
      status: 'Success',
      ip: '192.168.1.1',
      timestamp: '2024-03-20 10:30:45',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Commission Update',
      type: 'Transaction',
      status: 'Success',
      ip: '192.168.1.2',
      timestamp: '2024-03-20 10:25:30',
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Settings Update',
      type: 'Configuration',
      status: 'Success',
      ip: '192.168.1.3',
      timestamp: '2024-03-20 10:20:15',
    },
    {
      id: 4,
      user: 'Mike Johnson',
      action: 'Failed Login',
      type: 'Authentication',
      status: 'Failed',
      ip: '192.168.1.4',
      timestamp: '2024-03-20 10:15:00',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Activity Log
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search activities..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={activityType}
              label="Activity Type"
              onChange={handleActivityTypeChange}
            >
              <MenuItem value="all">All Activities</MenuItem>
              <MenuItem value="authentication">Authentication</MenuItem>
              <MenuItem value="transaction">Transaction</MenuItem>
              <MenuItem value="configuration">Configuration</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <FilterList />
            </IconButton>
            <IconButton>
              <Refresh />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={activity.status}
                      color={getStatusColor(activity.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{activity.ip}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default Activity; 