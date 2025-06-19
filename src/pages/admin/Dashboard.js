import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  Payments,
  PendingActions,
  AttachMoney,
  CheckCircle,
  Pending,
  HourglassEmpty,
  EmojiEvents,
  PersonAdd,
  Star,
  Group,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const theme = useTheme();
  const [joiningTimeRange, setJoiningTimeRange] = useState('day');
  const [incomeTimeRange, setIncomeTimeRange] = useState('month');
  const [teamPerformanceTab, setTeamPerformanceTab] = useState(0);

  // Sample data for joining trends
  const joiningData = {
    day: [
      { date: 'Mon', count: 5 },
      { date: 'Tue', count: 8 },
      { date: 'Wed', count: 12 },
      { date: 'Thu', count: 7 },
      { date: 'Fri', count: 15 },
      { date: 'Sat', count: 10 },
      { date: 'Sun', count: 6 },
    ],
    month: [
      { date: 'Week 1', count: 35 },
      { date: 'Week 2', count: 42 },
      { date: 'Week 3', count: 38 },
      { date: 'Week 4', count: 45 },
    ],
    year: [
      { date: 'Jan', count: 120 },
      { date: 'Feb', count: 150 },
      { date: 'Mar', count: 180 },
      { date: 'Apr', count: 160 },
      { date: 'May', count: 200 },
      { date: 'Jun', count: 220 },
    ],
  };

  // Sample data for income vs commission
  const incomeData = {
    month: [
      { month: 'Jan', income: 5000, commission: 2000 },
      { month: 'Feb', income: 6000, commission: 2500 },
      { month: 'Mar', income: 7000, commission: 3000 },
      { month: 'Apr', income: 6500, commission: 2800 },
      { month: 'May', income: 8000, commission: 3500 },
      { month: 'Jun', income: 7500, commission: 3200 },
    ],
    year: [
      { year: '2019', income: 60000, commission: 25000 },
      { year: '2020', income: 75000, commission: 32000 },
      { year: '2021', income: 90000, commission: 40000 },
      { year: '2022', income: 110000, commission: 50000 },
      { year: '2023', income: 130000, commission: 60000 },
    ],
  };

  // Payout Overview data
  const payoutData = [
    { name: 'Paid', value: 18.23, color: '#4caf50' },
    { name: 'Approved', value: 0, color: '#2196f3' },
    { name: 'Pending', value: 0, color: '#ff9800' },
  ];

  const COLORS = ['#4caf50', '#2196f3', '#ff9800'];

  // Team Performance Data
  const topEarners = [
    { id: 'ocrfwo', name: 'HICHAM Hamani', earnings: '$2,500', avatar: 'H' },
    { id: 'oc7ymk', name: 'Your First Name Your Last Name', earnings: '$1,800', avatar: 'Y' },
    { id: 'ocnhh3', name: 'Down down', earnings: '$1,200', avatar: 'D' },
    { id: 'tumwebaze', name: 'TUMWEBAZE benjamin', earnings: '$900', avatar: 'T' },
  ];

  const topRecruiters = [
    { id: 'ocrfwo', name: 'HICHAM Hamani', recruits: 25, avatar: 'H' },
    { id: 'oc7ymk', name: 'Your First Name Your Last Name', recruits: 18, avatar: 'Y' },
    { id: 'ocnhh3', name: 'Down down', recruits: 15, avatar: 'D' },
    { id: 'tumwebaze', name: 'TUMWEBAZE benjamin', recruits: 12, avatar: 'T' },
  ];

  const packageOverview = [
    { name: 'Basic', count: 150, color: '#4caf50' },
    { name: 'Premium', count: 75, color: '#2196f3' },
    { name: 'VIP', count: 25, color: '#ff9800' },
  ];

  const rankOverview = [
    { rank: 'Bronze', count: 200, color: '#cd7f32' },
    { rank: 'Silver', count: 150, color: '#c0c0c0' },
    { rank: 'Gold', count: 100, color: '#ffd700' },
    { rank: 'Platinum', count: 50, color: '#e5e4e2' },
  ];

  const newMembers = [
    { id: 'ocrfwo', name: 'HICHAM', avatar: 'H' },
    { id: 'ocgsiu', name: 'manivannan', avatar: 'M' },
    { id: 'oc0cma', name: 'Your First Name', avatar: 'Y' },
    { id: 'tumwebaze', name: 'TUMWEBAZE', avatar: 'T' },
  ];

  const handleTeamPerformanceTabChange = (event, newValue) => {
    setTeamPerformanceTab(newValue);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      p: 2,
      maxWidth: '100%',
      overflow: 'auto',
      height: 'calc(100vh - 64px)', // Subtract AppBar height
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Financial Metrics Cards - Top Row */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: theme.palette.primary.main, color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">E-wallet Balance</Typography>
                  <Typography variant="h4">$ 160.31</Typography>
                  <Typography variant="body2">Ewallet balance of all users</Typography>
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={70} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: theme.palette.success.main, color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Income</Typography>
                  <Typography variant="h4">$ 7.64K</Typography>
                  <Typography variant="body2">All products amount including service charge</Typography>
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={85} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: theme.palette.warning.main, color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoney sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Bonus</Typography>
                  <Typography variant="h4">$ 224.43</Typography>
                  <Typography variant="body2">Commission earned by all users</Typography>
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', bgcolor: theme.palette.info.main, color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Payments sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Paid</Typography>
                  <Typography variant="h4">$ 18.23</Typography>
                  <Typography variant="body2">Paid payouts</Typography>
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={45} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Income & Commission and Payout Overview - Second Row */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Income & Commission
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Registration Fee</TableCell>
                      <TableCell align="right">$ 5.91K</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Commission Charge</TableCell>
                      <TableCell align="right">$ 12.47</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Payout Fee</TableCell>
                      <TableCell align="right">$ 1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fund Transfer Fee</TableCell>
                      <TableCell align="right">$ 0</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payout Overview
              </Typography>
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={payoutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {payoutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  {payoutData.map((item, index) => (
                    <Grid item xs={4} key={item.name}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color={item.color}>
                          $ {item.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts - Third Row */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Joining Trends</Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={joiningTimeRange}
                    onChange={(e) => setJoiningTimeRange(e.target.value)}
                  >
                    <MenuItem value="day">Daily</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="year">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={joiningData[joiningTimeRange]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="New Joinings"
                      stroke={theme.palette.primary.main}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Income vs Commission</Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={incomeTimeRange}
                    onChange={(e) => setIncomeTimeRange(e.target.value)}
                  >
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="year">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData[incomeTimeRange]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={incomeTimeRange === 'month' ? 'month' : 'year'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill={theme.palette.success.main} />
                    <Bar dataKey="commission" name="Commission" fill={theme.palette.warning.main} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Team Performance Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Performance
              </Typography>
              
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs 
                  value={teamPerformanceTab} 
                  onChange={handleTeamPerformanceTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab 
                    icon={<EmojiEvents />} 
                    label="Top Earners" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<Star />} 
                    label="Top Recruiters" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<Group />} 
                    label="Package Overview" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<Star />} 
                    label="Rank Overview" 
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ height: 400, overflow: 'auto' }}>
                {/* Top Earners Tab */}
                {teamPerformanceTab === 0 && (
                  <List>
                    {topEarners.map((earner, index) => (
                      <React.Fragment key={earner.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>{earner.avatar}</Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={earner.name}
                            secondary={`ID: ${earner.id}`}
                          />
                          <Chip 
                            label={earner.earnings}
                            color="success"
                            size="small"
                          />
                        </ListItem>
                        {index < topEarners.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}

                {/* Top Recruiters Tab */}
                {teamPerformanceTab === 1 && (
                  <List>
                    {topRecruiters.map((recruiter, index) => (
                      <React.Fragment key={recruiter.id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>{recruiter.avatar}</Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={recruiter.name}
                            secondary={`ID: ${recruiter.id}`}
                          />
                          <Chip 
                            label={`${recruiter.recruits} recruits`}
                            color="primary"
                            size="small"
                          />
                        </ListItem>
                        {index < topRecruiters.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}

                {/* Package Overview Tab */}
                {teamPerformanceTab === 2 && (
                  <List>
                    {packageOverview.map((pkg, index) => (
                      <React.Fragment key={pkg.name}>
                        <ListItem>
                          <ListItemText 
                            primary={pkg.name}
                            secondary={`Total Members: ${pkg.count}`}
                          />
                          <Chip 
                            label={pkg.count}
                            sx={{ bgcolor: pkg.color, color: 'white' }}
                            size="small"
                          />
                        </ListItem>
                        {index < packageOverview.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}

                {/* Rank Overview Tab */}
                {teamPerformanceTab === 3 && (
                  <List>
                    {rankOverview.map((rank, index) => (
                      <React.Fragment key={rank.rank}>
                        <ListItem>
                          <ListItemText 
                            primary={rank.rank}
                            secondary={`Total Members: ${rank.count}`}
                          />
                          <Chip 
                            label={rank.count}
                            sx={{ bgcolor: rank.color, color: 'white' }}
                            size="small"
                          />
                        </ListItem>
                        {index < rankOverview.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* New Members Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonAdd sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">New Members</Typography>
              </Box>
              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {newMembers.map((member, index) => (
                  <React.Fragment key={member.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{member.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={member.name}
                        secondary={`ID: ${member.id}`}
                      />
                      <Chip 
                        label="New"
                        color="success"
                        size="small"
                      />
                    </ListItem>
                    {index < newMembers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Transactions - Fourth Row */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Payments sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1">
                  Payout Request: $ 18.23
                </Typography>
              </Box>
              <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                          Paid
                        </Box>
                      </TableCell>
                      <TableCell>$ 18.23</TableCell>
                      <TableCell>2024-03-20</TableCell>
                      <TableCell>Payout Request</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 