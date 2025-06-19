import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  Badge,
  Stack,
  Chip,
  Button,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  ShoppingCart,
  AccountBalanceWallet,
  Payments,
  Mail,
  Settings,
  Logout,
  Notifications,
  ChevronLeft,
  Person,
  Group,
  EmojiEvents,
  GridView,
  Home as HomeIcon,
  ExpandLess,
  ExpandMore,
  HelpOutline,
  CardMembership,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const UserLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [contentsOpen, setContentsOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const networkSubItems = [
    { text: 'Matrix', path: '/matrix' },
    { text: 'Referrals View', path: '/matrix/referrals' },
  ];

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Network', icon: <People />, path: '/matrix' },
    { text: 'Contents', icon: <GridView />, path: '/contents' },
    { text: 'Shopping', icon: <ShoppingCart />, path: '/shopping' },
    { text: 'E-Wallet', icon: <AccountBalanceWallet />, path: '/wallet' },
    { text: 'Payouts', icon: <Payments />, path: '/payouts' },
    { text: 'Mailbox', icon: <Mail />, path: '/mailbox' },
    { text: 'Help & Support', icon: <HelpOutline />, path: '/help' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Membership', icon: <CardMembership />, path: '/membership' },
  ];

  const contentsSubItems = [
    { text: 'Online Courses', path: '/contents/courses' },
    { text: 'Live Webinars', path: '/contents/webinars' },
    { text: 'Member Calls/Q&A Sessions', path: '/contents/calls' },
    { text: 'Content Archives', path: '/contents/archives' },
    { text: 'Community Forums', path: '/contents/forums' },
    { text: 'Downloadable Resources', path: '/contents/resources' },
    { text: 'Exclusive Member Perks/Discounts', path: '/contents/perks' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const drawer = (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #1a237e 0%, #283593 100%)',
      color: 'white',
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GridView sx={{ 
            color: 'white',
            fontSize: 28,
          }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Matrix Market
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(8px)',
        borderRadius: 3,
        boxShadow: '0 4px 24px 0 rgba(33,203,243,0.10)',
      }}>
        <Avatar
          src={currentUser?.photo || undefined}
          sx={{
            bgcolor: 'primary.light',
            width: 40,
            height: 40,
            fontWeight: 'bold',
            fontSize: 20,
            color: 'primary.dark',
            border: '2px solid #fff',
            boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)',
          }}
        >
          {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#fff', textShadow: '0 1px 4px rgba(33,203,243,0.10)' }}>
            {currentUser?.name || 'User'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, color: '#fff' }}>
            {currentUser?.role || 'Member'}
          </Typography>
        </Box>
      </Box>
      <List sx={{ flex: 1, px: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}>
        {menuItems.map((item) => (
          item.text === 'Contents' ? (
            <React.Fragment key={item.text}>
              <ListItem
                button
                onClick={() => setContentsOpen(!contentsOpen)}
                sx={{
                  mb: 0.5,
                  borderRadius: 1,
                  backgroundColor: location.pathname.startsWith('/contents') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: { 
                      fontWeight: location.pathname.startsWith('/contents') ? 'bold' : 'normal',
                      fontSize: '0.9rem',
                    }
                  }}
                />
                {contentsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={contentsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {contentsSubItems.map((sub) => (
                    <ListItem
                      button
                      key={sub.text}
                      onClick={() => {
                        navigate(sub.path);
                        if (isMobile) handleDrawerToggle();
                      }}
                      sx={{
                        pl: 6,
                        borderRadius: 1,
                        backgroundColor: location.pathname === sub.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                      }}
                    >
                      <ListItemText primary={sub.text} primaryTypographyProps={{ sx: { fontSize: '0.88rem' } }} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : item.text === 'Network' ? (
            <React.Fragment key={item.text}>
              <ListItem
                button
                onClick={() => setNetworkOpen(!networkOpen)}
                sx={{
                  mb: 0.5,
                  borderRadius: 1,
                  backgroundColor: location.pathname.startsWith('/matrix') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: location.pathname.startsWith('/matrix') ? 'bold' : 'normal',
                      fontSize: '0.9rem',
                    },
                  }}
                />
                {networkOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={networkOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {networkSubItems.map((sub) => (
                    <ListItem
                      button
                      key={sub.text}
                      onClick={() => {
                        navigate(sub.path);
                        if (isMobile) handleDrawerToggle();
                      }}
                      sx={{
                        pl: 6,
                        borderRadius: 1,
                        backgroundColor: location.pathname === sub.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                      }}
                    >
                      <ListItemText primary={sub.text} primaryTypographyProps={{ sx: { fontSize: '0.88rem' } }} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
            sx={{
              mb: 0.5,
              borderRadius: 1,
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                sx: { 
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  fontSize: '0.9rem',
                }
              }}
            />
          </ListItem>
          )
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List sx={{ px: 1 }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{
              sx: { fontSize: '0.9rem' }
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  if (!isAuthenticated) {
    // Only render children (Outlet) for guests
    return <Outlet />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              src={currentUser?.photo || undefined}
              sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontWeight: 'bold', fontSize: 18, color: 'primary.dark', border: '2px solid #fff', boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)' }}
            >
              {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onOpen={() => setMobileOpen(true)}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </SwipeableDrawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, minWidth: 280, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderRadius: 3, boxShadow: '0 4px 24px 0 rgba(33,203,243,0.10)' }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar
              src={currentUser?.photo || undefined}
              sx={{ width: 56, height: 56, bgcolor: 'primary.light', fontWeight: 'bold', fontSize: 28, color: 'primary.dark', border: '2px solid #fff', boxShadow: '0 2px 8px 0 rgba(33,203,243,0.10)' }}
            >
              {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{currentUser?.name || 'User'}</Typography>
              <Typography variant="body2" color="text.secondary">{currentUser?.email || ''}</Typography>
              {currentUser?.level && <Chip label={currentUser.level} size="small" color="primary" sx={{ mt: 1 }} />}
            </Box>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={() => { navigate('/wallet'); handleMenuClose(); }}>
            <ListItemIcon>
              <AccountBalanceWallet fontSize="small" />
            </ListItemIcon>
            My Wallet
          </MenuItem>
          <MenuItem onClick={() => { navigate('/team'); handleMenuClose(); }}>
            <ListItemIcon>
              <Group fontSize="small" />
            </ListItemIcon>
            My Team
          </MenuItem>
          <MenuItem onClick={() => { navigate('/achievements'); handleMenuClose(); }}>
            <ListItemIcon>
              <EmojiEvents fontSize="small" />
            </ListItemIcon>
            Achievements
          </MenuItem>
          <MenuItem onClick={() => { navigate('/referrals'); handleMenuClose(); }}>
            <ListItemIcon>
              <Group fontSize="small" />
            </ListItemIcon>
            Referrals
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      </Menu>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, minWidth: 320 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Notifications</Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2">New Team Member</Typography>
              <Typography variant="body2" color="text.secondary">
                Sarah Johnson joined your team
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 hours ago
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Commission Earned</Typography>
              <Typography variant="body2" color="text.secondary">
                You earned $150 in commission
              </Typography>
              <Typography variant="caption" color="text.secondary">
                5 hours ago
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Level Up!</Typography>
              <Typography variant="body2" color="text.secondary">
                Congratulations! You've reached Level 3
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 day ago
              </Typography>
            </Box>
          </Stack>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 2 }}
            onClick={handleMenuClose}
          >
            View All Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default UserLayout; 