import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Select,
  FormControl,
  Tooltip,
  useTheme,
  useMediaQuery,
  Stack,
  SwipeableDrawer,
  useScrollTrigger,
  Slide,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  AccountBalance,
  Settings,
  AccountTree,
  Wallet,
  Payments,
  Build,
  ExpandLess,
  ExpandMore,
  AccountTree as TreeIcon,
  Group as ReferralIcon,
  CloudUpload,
  PersonSearch,
  Help,
  Article,
  AttachMoney,
  Business,
  Email,
  History,
  BusinessCenter,
  Assessment,
  PersonAdd,
  Logout,
  Notifications,
  Person,
  Language,
  CurrencyExchange,
  DarkMode,
  LightMode,
  Store,
  AccountBalanceWallet,
  ChevronLeft,
  ChevronRight,
  Security,
  NotificationsOff,
  SystemUpdate,
  Groups,
  Warning,
  CardMembership,
  Phone,
  QuestionAnswer,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { ColorModeContext } from '../context/ThemeContext';

const drawerWidth = {
  xs: '100%',
  sm: 240,
  md: 280
};

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AdminLayout = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [networkOpen, setNetworkOpen] = React.useState(false);
  const [toolsOpen, setToolsOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [crmOpen, setCrmOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState('us');
  const [currency, setCurrency] = React.useState('usd');
  const navigate = useNavigate();
  const location = useLocation();

  // Sample notifications with more realistic data
  const notifications = [
    {
      id: 1,
      type: 'lead',
      title: 'New Lead',
      message: 'John Doe submitted a new lead for the Premium Package. The lead has shown interest in our business opportunity and requested a callback.',
      time: '5 min ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'commission',
      title: 'Commission Earned',
      message: 'Congratulations! You have earned $50 in commission from your downline member Sarah Smith\'s recent sale of the Business Starter Package.',
      time: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'Scheduled system maintenance will be performed on February 25th, 2024, from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.',
      time: '2 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'team',
      title: 'Team Achievement',
      message: 'Your team has reached the Silver Level milestone! This achievement unlocks new commission rates and team bonuses.',
      time: '3 hours ago',
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Payment Received',
      message: 'Payment of $1,200 has been received from member ID #12345 for the Business Premium Package.',
      time: '5 hours ago',
      read: true,
      priority: 'medium'
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDarkModeToggle = () => {
    colorMode.toggleColorMode();
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleMarkAsRead = (notificationId) => {
    // In a real app, this would make an API call to update the notification status
    console.log('Marking notification as read:', notificationId);
  };

  const handleClearAllNotifications = () => {
    // In a real app, this would make an API call to clear all notifications
    console.log('Clearing all notifications');
    handleNotificationMenuClose();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'lead':
        return <PersonAdd color="primary" />;
      case 'commission':
        return <Payments color="success" />;
      case 'system':
        return <SystemUpdate color="info" />;
      case 'team':
        return <Groups color="secondary" />;
      case 'alert':
        return <Warning color="warning" />;
      default:
        return <Notifications color="action" />;
    }
  };

  const handleNetworkClick = () => {
    setNetworkOpen(!networkOpen);
  };

  const handleToolsClick = () => {
    setToolsOpen(!toolsOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Store', icon: <Store />, path: '/admin/store' },
    { text: 'Order History', icon: <History />, path: '/admin/orders' },
    { text: 'E-Wallet', icon: <AccountBalanceWallet />, path: '/admin/e-wallet' },
    { text: 'Membership Controls', icon: <CardMembership />, path: '/admin/membership' },
  ];

  const networkSubItems = [
    { text: 'Tree View', icon: <TreeIcon />, path: '/admin/network/tree' },
    { text: 'Referral Members', icon: <ReferralIcon />, path: '/admin/network/referrals' },
  ];

  const toolsSubItems = [
    { text: 'Upload Material', icon: <CloudUpload />, path: '/admin/tools/upload' },
    { text: 'Leads', icon: <PersonSearch />, path: '/admin/tools/leads' },
    { text: 'FAQ', icon: <Help />, path: '/admin/tools/faq' },
    { text: 'News', icon: <Article />, path: '/admin/tools/news' },
    { text: 'Courses', icon: <Article />, path: '/admin/tools/courses' },
    { text: 'Webinars', icon: <BusinessCenter />, path: '/admin/tools/webinars' },
    { text: 'Calls', icon: <Phone />, path: '/admin/tools/calls' },
    { text: 'Q&A', icon: <QuestionAnswer />, path: '/admin/tools/qna' },
    { text: 'Resources', icon: <AttachMoney />, path: '/admin/tools/resources' },
  ];

  const settingsSubItems = [
    { text: 'General', icon: <Settings />, path: '/admin/settings/general' },
    { text: 'Security', icon: <Security />, path: '/admin/settings/security' },
    { text: 'Email', icon: <Email />, path: '/admin/settings/email' },
    { text: 'Payment', icon: <Payments />, path: '/admin/settings/payment' },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.paper'
    }}>
      <Toolbar sx={{ 
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin Panel
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <ChevronLeft />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ 
        flex: 1,
        overflow: 'auto',
        px: { xs: 1, sm: 2 },
        '& .MuiListItem-root': {
          borderRadius: 1,
          mb: 0.5,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        },
        '& .Mui-selected': {
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.light',
          },
        },
      }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon sx={{ 
              minWidth: { xs: 36, sm: 40 },
              color: location.pathname === item.path ? 'primary.main' : 'inherit'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            />
          </ListItem>
        ))}
        
        {/* Network Section */}
        <ListItem button onClick={handleNetworkClick}>
          <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
            <AccountTree />
          </ListItemIcon>
          <ListItemText 
            primary="Network"
            primaryTypographyProps={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          />
          {networkOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={networkOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {networkSubItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                selected={location.pathname === item.path}
                sx={{ pl: { xs: 3, sm: 4 } }}
              >
                <ListItemIcon sx={{ 
                  minWidth: { xs: 36, sm: 40 },
                  color: location.pathname === item.path ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Tools Section */}
        <ListItem button onClick={handleToolsClick}>
          <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
            <Build />
          </ListItemIcon>
          <ListItemText 
            primary="Tools"
            primaryTypographyProps={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          />
          {toolsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={toolsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {toolsSubItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                selected={location.pathname === item.path}
                sx={{ pl: { xs: 3, sm: 4 } }}
              >
                <ListItemIcon sx={{ 
                  minWidth: { xs: 36, sm: 40 },
                  color: location.pathname === item.path ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Settings Section */}
        <ListItem button onClick={() => setSettingsOpen(!settingsOpen)}>
          <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
            <Settings />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          />
          {settingsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {settingsSubItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={() => {
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{ pl: { xs: 3, sm: 4 } }}
              >
                <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <Divider sx={{ my: 2 }} />
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'error.contrastText',
            },
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: { xs: 36, sm: 40 },
            color: 'inherit' 
          }}>
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  const appBar = (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          ml: { sm: `${drawerWidth.sm}px` },
          boxShadow: 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 }
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            MLM Admin Dashboard
          </Typography>

          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
            sx={{ 
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            {/* Country Selector */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={country}
                onChange={handleCountryChange}
                displayEmpty
                sx={{ 
                  color: 'inherit', 
                  '.MuiSelect-icon': { color: 'inherit' },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="au">Australia</MenuItem>
                <MenuItem value="in">India</MenuItem>
              </Select>
            </FormControl>

            {/* Currency Selector */}
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={currency}
                onChange={handleCurrencyChange}
                displayEmpty
                sx={{ 
                  color: 'inherit', 
                  '.MuiSelect-icon': { color: 'inherit' },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                <MenuItem value="usd">USD</MenuItem>
                <MenuItem value="eur">EUR</MenuItem>
                <MenuItem value="gbp">GBP</MenuItem>
                <MenuItem value="cad">CAD</MenuItem>
                <MenuItem value="aud">AUD</MenuItem>
                <MenuItem value="inr">INR</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
          >
            {/* Dark Mode Toggle */}
            <Tooltip title={theme.palette.mode === 'dark' ? "Light Mode" : "Dark Mode"}>
              <IconButton color="inherit" onClick={handleDarkModeToggle}>
                {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge badgeContent={notifications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Tooltip title="Profile">
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Menus */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            PaperProps={{
              sx: { 
                width: { xs: '100%', sm: 380 },
                maxHeight: 500,
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Notifications
                </Typography>
                <Button
                  size="small"
                  onClick={handleClearAllNotifications}
                  sx={{ textTransform: 'none' }}
                >
                  Clear All
                </Button>
              </Stack>
            </Box>
            
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {notifications.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <NotificationsOff sx={{ color: 'text.secondary', fontSize: 40, mb: 1 }} />
                  <Typography color="text.secondary">No notifications</Typography>
                </Box>
              ) : (
                notifications.map((notification) => (
                  <MenuItem
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    sx={{
                      p: 2,
                      borderBottom: 1,
                      borderColor: 'divider',
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: notification.read ? 'normal' : 'bold',
                              color: notification.read ? 'text.primary' : 'primary.main',
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {notification.message}
                        </Typography>
                        {!notification.read && (
                          <Box
                            sx={{
                              mt: 1,
                              display: 'inline-block',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: 'primary.main',
                              color: 'white',
                              fontSize: '0.75rem',
                            }}
                          >
                            New
                          </Box>
                        )}
                      </Box>
                    </Stack>
                  </MenuItem>
                ))
              )}
            </Box>
            
            <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
              <Button
                fullWidth
                size="small"
                onClick={handleNotificationMenuClose}
                sx={{ textTransform: 'none' }}
              >
                View All Notifications
              </Button>
            </Box>
          </Menu>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: { 
                width: { xs: '100%', sm: 200 },
                mt: 1
              },
            }}
          >
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin/profile'); }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin/settings'); }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {appBar}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth.sm }, flexShrink: { sm: 0 } }}
      >
        <SwipeableDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth.xs,
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth.sm,
              borderRight: '1px solid rgba(0, 0, 0, 0.12)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          mt: { xs: 7, sm: 8 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout; 