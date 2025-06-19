import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Person,
  Delete,
  Block,
  CheckCircle,
  Wifi,
  WifiOff,
  Refresh,
  MoreVert,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  AccessTime,
  AccountCircle,
  Business,
  Language,
} from '@mui/icons-material';

const UserActivity = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({
    day: '',
    month: '',
    year: '',
    status: ''
  });

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate arrays for date options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const statuses = ['All', 'Online', 'Offline', 'Deactivated', 'Deleted'];

  // Sample data for user statistics
  const userStats = [
    {
      title: 'Total Users',
      count: 1373,
      icon: <Person sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main',
      description: 'Total registered users',
      percentage: 100
    },
    {
      title: 'Online Users',
      count: 856,
      icon: <Wifi sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
      description: 'Currently online users',
      percentage: 62
    },
    {
      title: 'Offline Users',
      count: 517,
      icon: <WifiOff sx={{ fontSize: 40, color: 'text.secondary' }} />,
      color: 'text.secondary',
      description: 'Currently offline users',
      percentage: 38
    },
    {
      title: 'Active Users',
      count: 1250,
      icon: <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main',
      description: 'Currently active users',
      percentage: 91
    },
    {
      title: 'Deleted Users',
      count: 45,
      icon: <Delete sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error.main',
      description: 'Users who have been deleted',
      percentage: 3
    },
    {
      title: 'Deactivated Users',
      count: 78,
      icon: <Block sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning.main',
      description: 'Users who have been deactivated',
      percentage: 6
    }
  ];

  // Sample data for recent user activities
  const recentActivities = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Online',
      lastActive: 'Just now',
      avatar: 'JD',
      isOnline: true,
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      joinDate: '2024-01-15',
      company: 'Tech Solutions Inc.',
      website: 'www.johndoe.com',
      role: 'Senior Developer',
      department: 'Engineering',
      lastLogin: '2024-03-15 14:30',
      activityCount: 156
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Offline',
      lastActive: '2 minutes ago',
      avatar: 'JS',
      isOnline: false,
      phone: '+1 234 567 8901',
      location: 'London, UK',
      joinDate: '2024-02-01',
      company: 'Digital Innovations',
      website: 'www.janesmith.com',
      role: 'Product Manager',
      department: 'Product',
      lastLogin: '2024-03-15 12:15',
      activityCount: 89
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'Deleted',
      lastActive: '2024-03-13 16:45',
      avatar: 'MJ',
      isOnline: false,
      phone: '+1 234 567 8902',
      location: 'Sydney, Australia',
      joinDate: '2024-01-01',
      company: 'Global Systems',
      website: 'www.mikejohnson.com',
      role: 'System Administrator',
      department: 'IT',
      lastLogin: '2024-03-13 16:45',
      activityCount: 234
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      status: 'Online',
      lastActive: 'Just now',
      avatar: 'SW',
      isOnline: true,
      phone: '+1 234 567 8903',
      location: 'Toronto, Canada',
      joinDate: '2024-02-15',
      company: 'Creative Solutions',
      website: 'www.sarahwilson.com',
      role: 'UX Designer',
      department: 'Design',
      lastLogin: '2024-03-15 11:20',
      activityCount: 167
    }
  ];

  // Filter the activities based on selected filters
  const filteredActivities = recentActivities.filter(activity => {
    const activityDate = new Date(activity.lastActive);
    const matchesDay = !filters.day || activityDate.getDate() === parseInt(filters.day);
    const matchesMonth = !filters.month || activityDate.getMonth() === months.indexOf(filters.month);
    const matchesYear = !filters.year || activityDate.getFullYear() === parseInt(filters.year);
    const matchesStatus = !filters.status || filters.status === 'All' || activity.status === filters.status;

    return matchesDay && matchesMonth && matchesYear && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Online':
        return 'success';
      case 'Offline':
        return 'default';
      case 'Active':
        return 'success';
      case 'Deactivated':
        return 'warning';
      case 'Deleted':
        return 'error';
      default:
        return 'default';
    }
  };

  const UserProfileDialog = ({ user, open, onClose }) => {
    if (!user) return null;

    return (
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'primary.main',
                position: 'relative'
              }}
            >
              {user.avatar}
              {user.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 16,
                    height: 16,
                    backgroundColor: 'success.main',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }}
                />
              )}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {user.role} • {user.department}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Email" secondary={user.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Phone" secondary={user.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Location" secondary={user.location} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Business color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Company" secondary={user.company} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Language color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Website" secondary={user.website} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Account Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Join Date" secondary={user.joinDate} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Last Login" secondary={user.lastLogin} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Activity Count" secondary={user.activityCount} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Status" 
                        secondary={
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          User Activity
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {userStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    backgroundColor: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 'medium' }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: stat.color, mb: 1, fontWeight: 'bold' }}>
                  {stat.count}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={stat.percentage} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: `${stat.color}15`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: stat.color
                      }
                    }} 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activities Table */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Recent User Activities
            </Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Filters */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ mb: 3 }}
          >
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Day</InputLabel>
              <Select
                name="day"
                value={filters.day}
                label="Day"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {days.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Month</InputLabel>
              <Select
                name="month"
                value={filters.month}
                label="Month"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {months.map(month => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                name="year"
                value={filters.year}
                label="Year"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleFilterChange}
              >
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {status !== 'All' && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(status),
                          }}
                        />
                      )}
                      {status}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Last Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredActivities.map((user) => (
                  <TableRow 
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'action.hover',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            mr: 2, 
                            bgcolor: 'primary.main',
                            position: 'relative'
                          }}
                        >
                          {user.avatar}
                          {user.isOnline && (
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 12,
                                height: 12,
                                backgroundColor: 'success.main',
                                borderRadius: '50%',
                                border: '2px solid white'
                              }}
                            />
                          )}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {user.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={getStatusColor(user.status)}
                        size="small"
                        sx={{ 
                          fontWeight: 'medium',
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        color={user.isOnline ? 'success.main' : 'text.secondary'}
                        sx={{ fontWeight: user.isOnline ? 'bold' : 'normal' }}
                      >
                        {user.lastActive}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* User Profile Dialog */}
      <UserProfileDialog
        user={selectedUser}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default UserActivity; 