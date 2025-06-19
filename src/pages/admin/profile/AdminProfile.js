import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  Stack,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Switch,
  Fade,
  Zoom,
  alpha,
  Tooltip,
  Tab,
  Tabs,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
  PhotoCamera as PhotoCameraIcon,
  MoreVert as MoreVertIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  Group as GroupIcon,
  Store as StoreIcon,
} from '@mui/icons-material';

const AdminProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mlmcompany.com',
    phone: '+1 (555) 123-4567',
    role: 'Administrator',
    department: 'Management',
    location: 'New York, USA',
    joinDate: 'January 15, 2023',
    status: 'Active',
    bio: 'Experienced administrator with a strong background in MLM management and team leadership. Passionate about building successful teams and driving business growth.',
    socialLinks: {
      linkedin: 'linkedin.com/in/johndoe',
      twitter: 'twitter.com/johndoe',
      facebook: 'facebook.com/johndoe',
      instagram: 'instagram.com/johndoe',
    },
    skills: ['Team Leadership', 'Strategic Planning', 'Business Development', 'MLM Management'],
    experience: [
      {
        title: 'Senior Administrator',
        company: 'MLM Company',
        period: '2020 - Present',
        description: 'Leading a team of 50+ members and managing daily operations.',
      },
      {
        title: 'Team Manager',
        company: 'Previous Company',
        period: '2018 - 2020',
        description: 'Managed a team of 20 members and achieved 150% growth.',
      },
    ],
    education: [
      {
        degree: 'MBA in Business Administration',
        school: 'Harvard Business School',
        year: '2018',
      },
      {
        degree: 'Bachelor of Commerce',
        school: 'New York University',
        year: '2016',
      },
    ],
    languages: ['English', 'Spanish', 'French'],
    notifications: {
      email: true,
      sms: true,
      updates: true,
    },
    security: {
      twoFactor: true,
      lastLogin: '2024-02-20 14:30',
      loginHistory: [
        { date: '2024-02-20 14:30', device: 'Chrome on Windows', location: 'New York' },
        { date: '2024-02-19 09:15', device: 'Safari on iPhone', location: 'New York' },
      ],
    },
    stats: {
      totalMembers: 1250,
      activeMembers: 980,
      totalSales: '$1.2M',
      growthRate: '+15%',
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
        color: 'white',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Fade in timeout={500}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
                },
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm="auto">
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      sx={{
                        width: { xs: 100, sm: 120 },
                        height: { xs: 100, sm: 120 },
                        border: '4px solid white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        fontSize: '2.5rem',
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                      }}
                    >
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </Avatar>
                    <Tooltip title="Change Photo">
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Verified Profile">
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          bgcolor: 'success.main',
                          borderRadius: '50%',
                          p: 0.5,
                          border: '2px solid white',
                        }}
                      >
                        <VerifiedIcon sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item xs={12} sm>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 'bold',
                          fontSize: { xs: '1.75rem', sm: '2.25rem' },
                          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                      >
                        {profileData.firstName} {profileData.lastName}
                      </Typography>
                      <IconButton
                        onClick={handleMenuOpen}
                        sx={{ color: 'white' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      {profileData.role} • {profileData.department}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Chip
                        icon={<EmailIcon />}
                        label={profileData.email}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                      />
                      <Chip
                        icon={<PhoneIcon />}
                        label={profileData.phone}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                      />
                      <Chip
                        icon={<LocationIcon />}
                        label={profileData.location}
                        sx={{ bgcolor: 'rgba(255,255,255,0.1)' }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Stack direction="row" spacing={2}>
                    {isEditing ? (
                      <>
                        <Button
                          variant="contained"
                          startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                          onClick={handleSave}
                          disabled={isLoading}
                          sx={{
                            bgcolor: 'white',
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'grey.100' },
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Stats Cards */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Members"
                  value={profileData.stats.totalMembers}
                  icon={<GroupIcon />}
                  color={theme.palette.primary.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Active Members"
                  value={profileData.stats.activeMembers}
                  icon={<PersonIcon />}
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Sales"
                  value={profileData.stats.totalSales}
                  icon={<StoreIcon />}
                  color={theme.palette.warning.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Growth Rate"
                  value={profileData.stats.growthRate}
                  icon={<AnalyticsIcon />}
                  color={theme.palette.info.main}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Tabs and Content */}
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                }}
              >
                <Tab label="Overview" />
                <Tab label="Experience" />
                <Tab label="Education" />
                <Tab label="Security" />
                <Tab label="Notifications" />
              </Tabs>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Card sx={{ mb: 3, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            About
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {profileData.bio}
                          </Typography>
                        </CardContent>
                      </Card>

                      <Card sx={{ mb: 3, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Skills
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {profileData.skills.map((skill, index) => (
                              <Chip
                                key={index}
                                label={skill}
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  fontWeight: 'medium',
                                }}
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>

                      <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Languages
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {profileData.languages.map((language, index) => (
                              <Chip
                                key={index}
                                icon={<LanguageIcon />}
                                label={language}
                                sx={{
                                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                  color: theme.palette.secondary.main,
                                  fontWeight: 'medium',
                                }}
                              />
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Card sx={{ mb: 3, borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Social Links
                          </Typography>
                          <Stack spacing={2}>
                            <Button
                              startIcon={<LinkedInIcon />}
                              href={profileData.socialLinks.linkedin}
                              target="_blank"
                              sx={{ justifyContent: 'flex-start' }}
                            >
                              LinkedIn
                            </Button>
                            <Button
                              startIcon={<TwitterIcon />}
                              href={profileData.socialLinks.twitter}
                              target="_blank"
                              sx={{ justifyContent: 'flex-start' }}
                            >
                              Twitter
                            </Button>
                            <Button
                              startIcon={<FacebookIcon />}
                              href={profileData.socialLinks.facebook}
                              target="_blank"
                              sx={{ justifyContent: 'flex-start' }}
                            >
                              Facebook
                            </Button>
                            <Button
                              startIcon={<InstagramIcon />}
                              href={profileData.socialLinks.instagram}
                              target="_blank"
                              sx={{ justifyContent: 'flex-start' }}
                            >
                              Instagram
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>

                      <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Quick Actions
                          </Typography>
                          <Stack spacing={2}>
                            <Button
                              startIcon={<DashboardIcon />}
                              variant="outlined"
                              fullWidth
                            >
                              View Dashboard
                            </Button>
                            <Button
                              startIcon={<GroupIcon />}
                              variant="outlined"
                              fullWidth
                            >
                              Manage Team
                            </Button>
                            <Button
                              startIcon={<StoreIcon />}
                              variant="outlined"
                              fullWidth
                            >
                              View Store
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 1 && (
                  <Stack spacing={3}>
                    {profileData.experience.map((exp, index) => (
                      <Card key={index} sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {exp.title}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                            {exp.company}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {exp.period}
                          </Typography>
                          <Typography variant="body1">
                            {exp.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}

                {activeTab === 2 && (
                  <Stack spacing={3}>
                    {profileData.education.map((edu, index) => (
                      <Card key={index} sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {edu.degree}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                            {edu.school}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.year}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}

                {activeTab === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Security Settings
                          </Typography>
                          <Stack spacing={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="subtitle1">Two-Factor Authentication</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Add an extra layer of security to your account
                                </Typography>
                              </Box>
                              <Switch
                                checked={profileData.security.twoFactor}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  security: {
                                    ...prev.security,
                                    twoFactor: e.target.checked
                                  }
                                }))}
                              />
                            </Box>
                            <Divider />
                            <Box>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Last Login</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {profileData.security.lastLogin}
                              </Typography>
                            </Box>
                            <Divider />
                            <Box>
                              <Typography variant="subtitle1" sx={{ mb: 1 }}>Login History</Typography>
                              <Stack spacing={1}>
                                {profileData.security.loginHistory.map((login, index) => (
                                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      {login.date} - {login.device} ({login.location})
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Password & Security
                          </Typography>
                          <Stack spacing={3}>
                            <Button
                              variant="outlined"
                              startIcon={<LockIcon />}
                              fullWidth
                            >
                              Change Password
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<SecurityIcon />}
                              fullWidth
                            >
                              Security Settings
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              startIcon={<LogoutIcon />}
                              fullWidth
                            >
                              Logout All Devices
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 4 && (
                  <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Notification Preferences
                      </Typography>
                      <Stack spacing={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1">Email Notifications</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive updates via email
                            </Typography>
                          </Box>
                          <Switch
                            checked={profileData.notifications.email}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                email: e.target.checked
                              }
                            }))}
                          />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1">SMS Notifications</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive updates via SMS
                            </Typography>
                          </Box>
                          <Switch
                            checked={profileData.notifications.sms}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                sms: e.target.checked
                              }
                            }))}
                          />
                        </Box>
                        <Divider />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="subtitle1">System Updates</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Receive system and maintenance updates
                            </Typography>
                          </Box>
                          <Switch
                            checked={profileData.notifications.updates}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                updates: e.target.checked
                              }
                            }))}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SecurityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Security</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Container>
    </Fade>
  );
};

export default AdminProfile; 