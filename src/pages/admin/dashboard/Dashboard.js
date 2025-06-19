import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Paper,
  Container,
  Avatar,
  LinearProgress,
  Fade,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  People,
  TrendingUp,
  AccountBalanceWallet,
  ShoppingCart,
  Star,
  MoreVert,
  Person,
  Group,
  AttachMoney,
  Speed,
  Security,
  Support,
  EmojiEvents,
  Paid,
  HourglassEmpty,
  PersonAdd,
  Timeline,
  BarChart,
  PieChart,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [openNewMember, setOpenNewMember] = useState(false);
  const [openPayouts, setOpenPayouts] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    email: '',
    phone: '',
    sponsorId: '',
    package: '',
  });
  const [selectedPayouts, setSelectedPayouts] = useState([]);
  const [reportType, setReportType] = useState('');

  const StatCard = ({ title, value, icon, color, gradient, trend, trendValue, subtitle }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: gradient || `linear-gradient(45deg, ${color} 30%, ${color}90 90%)`,
        color: 'white',
        borderRadius: 2,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
            {icon}
          </Avatar>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
            {subtitle}
          </Typography>
        )}
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ fontSize: 16 }} />
            <Typography variant="body2">
              {trendValue}% this {timeRange}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const PerformanceCard = ({ title, data, color }) => (
    <Card sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {title}
        </Typography>
        <List>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
                    {item.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={item.title}
                  secondary={item.value}
                />
                <LinearProgress 
                  variant="determinate" 
                  value={item.progress} 
                  sx={{ 
                    width: 100,
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: `${color}.lighter`,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: `${color}.main`,
                    }
                  }} 
                />
              </ListItem>
              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const RecentActivityCard = ({ activity }) => (
    <Card 
      sx={{ 
        mb: 2,
        borderRadius: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateX(5px)',
          boxShadow: 3,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: `${activity.color}.light`, color: `${activity.color}.dark` }}>
              {activity.icon}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {activity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">
              {activity.time}
            </Typography>
            <Chip 
              label={activity.status}
              size="small"
              color={activity.status === 'Completed' ? 'success' : 'warning'}
              sx={{ borderRadius: 1, mt: 1 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const stats = {
    totalMembers: 1250,
    activeMembers: 980,
    totalSales: 45600,
    totalCommission: 78900,
    pendingPayouts: 12300,
    memberGrowth: 12.5,
    salesGrowth: 8.3,
    commissionGrowth: 15.7,
  };

  const performanceData = {
    network: [
      { title: 'Direct Referrals', value: '45 Members', progress: 75, icon: <PersonAdd /> },
      { title: 'Team Size', value: '250 Members', progress: 60, icon: <Group /> },
      { title: 'Active Level 1', value: '35 Members', progress: 85, icon: <Timeline /> },
      { title: 'Active Level 2', value: '120 Members', progress: 45, icon: <Timeline /> },
    ],
    earnings: [
      { title: 'Direct Commission', value: '$2,500', progress: 80, icon: <AttachMoney /> },
      { title: 'Team Bonus', value: '$1,800', progress: 65, icon: <EmojiEvents /> },
      { title: 'Leadership Bonus', value: '$950', progress: 40, icon: <Star /> },
      { title: 'Pending Payouts', value: '$1,200', progress: 30, icon: <HourglassEmpty /> },
    ],
  };

  const activities = [
    {
      title: 'New Member Joined',
      description: 'John Doe joined under ID: MLM123',
      time: '2 hours ago',
      status: 'Completed',
      icon: <Person />,
      color: 'primary',
    },
    {
      title: 'Commission Earned',
      description: 'Earned $500 in team bonus',
      time: '3 hours ago',
      status: 'Completed',
      icon: <AttachMoney />,
      color: 'success',
    },
    {
      title: 'Payout Request',
      description: 'Mike Johnson requested $1,000 payout',
      time: '5 hours ago',
      status: 'Pending',
      icon: <Paid />,
      color: 'warning',
    },
  ];

  // Handle new member form
  const handleNewMemberChange = (e) => {
    setNewMemberData({
      ...newMemberData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMember = () => {
    // Here you would typically make an API call to add the member
    console.log('Adding new member:', newMemberData);
    setSnackbar({
      open: true,
      message: 'New member added successfully!',
      severity: 'success',
    });
    setOpenNewMember(false);
    setNewMemberData({
      name: '',
      email: '',
      phone: '',
      sponsorId: '',
      package: '',
    });
  };

  // Handle payouts
  const handleProcessPayouts = () => {
    // Here you would typically make an API call to process payouts
    console.log('Processing payouts for:', selectedPayouts);
    setSnackbar({
      open: true,
      message: 'Payouts processed successfully!',
      severity: 'success',
    });
    setOpenPayouts(false);
    setSelectedPayouts([]);
  };

  // Handle reports
  const handleGenerateReport = () => {
    // Here you would typically make an API call to generate the report
    console.log('Generating report:', reportType);
    setSnackbar({
      open: true,
      message: 'Report generated successfully!',
      severity: 'success',
    });
    setOpenReports(false);
    setReportType('');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
      py: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="xl">
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: { xs: 2, sm: 3, md: 4 }, 
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            mb: { xs: 2, sm: 3, md: 4 },
            gap: 2
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              MLM Dashboard
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              width: { xs: '100%', sm: 'auto' },
              flexWrap: 'wrap'
            }}>
              <Button
                variant="outlined"
                startIcon={<BarChart />}
                sx={{ 
                  borderRadius: 2,
                  flex: { xs: 1, sm: 'none' }
                }}
                onClick={() => setTimeRange('week')}
                color={timeRange === 'week' ? 'primary' : 'inherit'}
              >
                Week
              </Button>
              <Button
                variant="outlined"
                startIcon={<Timeline />}
                sx={{ 
                  borderRadius: 2,
                  flex: { xs: 1, sm: 'none' }
                }}
                onClick={() => setTimeRange('month')}
                color={timeRange === 'month' ? 'primary' : 'inherit'}
              >
                Month
              </Button>
              <Button
                variant="contained"
                startIcon={<PieChart />}
                sx={{ 
                  borderRadius: 2,
                  flex: { xs: 1, sm: 'none' },
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                  }
                }}
              >
                Analytics
              </Button>
            </Box>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Members"
                value={stats.totalMembers}
                icon={<People />}
                gradient="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
                trend={true}
                trendValue={stats.memberGrowth}
                subtitle="Active: 980"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Sales"
                value={`$${stats.totalSales.toLocaleString()}`}
                icon={<ShoppingCart />}
                gradient="linear-gradient(45deg, #4CAF50 30%, #81C784 90%)"
                trend={true}
                trendValue={stats.salesGrowth}
                subtitle="This Month"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Commission"
                value={`$${stats.totalCommission.toLocaleString()}`}
                icon={<AttachMoney />}
                gradient="linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)"
                trend={true}
                trendValue={stats.commissionGrowth}
                subtitle="This Month"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Pending Payouts"
                value={`$${stats.pendingPayouts.toLocaleString()}`}
                icon={<HourglassEmpty />}
                gradient="linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)"
                subtitle="Awaiting Approval"
              />
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Grid item xs={12} md={6}>
              <PerformanceCard 
                title="Network Performance"
                data={performanceData.network}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PerformanceCard 
                title="Earnings Overview"
                data={performanceData.earnings}
                color="success"
              />
            </Grid>
          </Grid>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}>
                Recent Activity
              </Typography>
              {activities.map((activity, index) => (
                <RecentActivityCard key={index} activity={activity} />
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    fontWeight: 'bold',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}>
                    Quick Actions
                  </Typography>
                  <List>
                    <ListItem 
                      button 
                      onClick={() => setOpenNewMember(true)}
                      sx={{ 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <PersonAdd />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Add New Member"
                        primaryTypographyProps={{
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      />
                    </ListItem>
                    <ListItem 
                      button 
                      onClick={() => setOpenPayouts(true)}
                      sx={{ 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.light' }}>
                          <Paid />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Process Payouts"
                        primaryTypographyProps={{
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      />
                    </ListItem>
                    <ListItem 
                      button 
                      onClick={() => navigate('/admin/network/tree')}
                      sx={{ 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'warning.light' }}>
                          <Timeline />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="View Network Tree"
                        primaryTypographyProps={{
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      />
                    </ListItem>
                    <ListItem 
                      button 
                      onClick={() => setOpenReports(true)}
                      sx={{ 
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.light' }}>
                          <BarChart />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Generate Reports"
                        primaryTypographyProps={{
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* New Member Dialog */}
        <Dialog 
          open={openNewMember} 
          onClose={() => setOpenNewMember(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              width: { xs: '95%', sm: '500px' },
              m: { xs: 2, sm: 3 }
            }
          }}
        >
          <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Add New Member
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Full Name"
                fullWidth
                size="small"
                value={newMemberData.name}
                onChange={handleNewMemberChange}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                size="small"
                value={newMemberData.email}
                onChange={handleNewMemberChange}
              />
              <TextField
                name="phone"
                label="Phone"
                fullWidth
                size="small"
                value={newMemberData.phone}
                onChange={handleNewMemberChange}
              />
              <TextField
                name="sponsorId"
                label="Sponsor ID"
                fullWidth
                size="small"
                value={newMemberData.sponsorId}
                onChange={handleNewMemberChange}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Package</InputLabel>
                <Select
                  name="package"
                  value={newMemberData.package}
                  onChange={handleNewMemberChange}
                  label="Package"
                >
                  <MenuItem value="basic">Basic Package</MenuItem>
                  <MenuItem value="premium">Premium Package</MenuItem>
                  <MenuItem value="elite">Elite Package</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setOpenNewMember(false)}
              size="small"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddMember} 
              variant="contained" 
              color="primary"
              size="small"
            >
              Add Member
            </Button>
          </DialogActions>
        </Dialog>

        {/* Process Payouts Dialog */}
        <Dialog 
          open={openPayouts} 
          onClose={() => setOpenPayouts(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              width: { xs: '95%', sm: '600px', md: '800px' },
              m: { xs: 2, sm: 3 }
            }
          }}
        >
          <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Process Payouts
          </DialogTitle>
          <DialogContent>
            <TableContainer sx={{ maxHeight: { xs: '60vh', sm: '70vh' } }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Member ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { id: 'MLM001', name: 'John Doe', amount: 500, status: 'Pending' },
                    { id: 'MLM002', name: 'Jane Smith', amount: 750, status: 'Pending' },
                    { id: 'MLM003', name: 'Mike Johnson', amount: 1000, status: 'Pending' },
                  ].map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>{payout.id}</TableCell>
                      <TableCell>{payout.name}</TableCell>
                      <TableCell>${payout.amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={payout.status} 
                          color="warning" 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setSelectedPayouts([...selectedPayouts, payout.id])}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setOpenPayouts(false)}
              size="small"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleProcessPayouts} 
              variant="contained" 
              color="primary"
              disabled={selectedPayouts.length === 0}
              size="small"
            >
              Process Selected Payouts
            </Button>
          </DialogActions>
        </Dialog>

        {/* Generate Reports Dialog */}
        <Dialog 
          open={openReports} 
          onClose={() => setOpenReports(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              width: { xs: '95%', sm: '400px' },
              m: { xs: 2, sm: 3 }
            }
          }}
        >
          <DialogTitle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            Generate Report
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Type"
                >
                  <MenuItem value="sales">Sales Report</MenuItem>
                  <MenuItem value="commission">Commission Report</MenuItem>
                  <MenuItem value="network">Network Growth Report</MenuItem>
                  <MenuItem value="performance">Performance Report</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setOpenReports(false)}
              size="small"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateReport} 
              variant="contained" 
              color="primary"
              disabled={!reportType}
              size="small"
            >
              Generate Report
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard; 