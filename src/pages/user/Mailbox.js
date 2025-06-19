import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  IconButton,
  Button,
  Avatar,
  Chip,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  InputAdornment,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Inbox,
  Send,
  Star,
  Delete,
  Add,
  Close,
  Search,
  StarBorder,
  Menu as MenuIcon,
  Reply,
  Forward,
} from '@mui/icons-material';

const folders = [
  { key: 'inbox', label: 'Inbox', icon: <Inbox /> },
  { key: 'sent', label: 'Sent', icon: <Send /> },
  { key: 'starred', label: 'Starred', icon: <Star /> },
  { key: 'trash', label: 'Trash', icon: <Delete /> },
];

const mockEmails = {
    inbox: [
      {
        id: 1,
        subject: 'Welcome to MLM Portal',
        sender: 'support@mlmportal.com',
        date: '2024-02-20T10:00:00',
        content: 'Welcome to our MLM platform...',
        unread: true,
        starred: false,
      },
    // ...
    ],
  sent: [],
    starred: [],
    trash: [],
  };

const getStoredMessages = () => {
  try {
    return JSON.parse(localStorage.getItem('mlm_messages')) || [];
  } catch {
    return [];
  }
};
const storeMessage = (msg) => {
  const messages = getStoredMessages();
  messages.push(msg);
  localStorage.setItem('mlm_messages', JSON.stringify(messages));
};

const Mailbox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sentMessages, setSentMessages] = useState(getStoredMessages());
  const [composeData, setComposeData] = useState({ subject: '', content: '' });

  // TODO: Replace with backend data and real-time updates
  const emails = mockEmails;

  const filteredEmails = emails[currentFolder].filter(
    (email) =>
      email.subject.toLowerCase().includes(search.toLowerCase()) ||
      (email.sender && email.sender.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedEmail(null);
  };

  // Sidebar content
  const sidebarContent = (
    <Box sx={{ width: { xs: 260, md: '100%' }, p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">Mailbox</Typography>
        {!isMobile && (
          <Fab color="primary" size="small" onClick={() => setComposeOpen(true)}>
            <Add />
          </Fab>
        )}
        </Stack>
      <List>
        {folders.map((folder) => (
          <ListItem
            button
            key={folder.key}
            selected={currentFolder === folder.key}
            onClick={() => {
              setCurrentFolder(folder.key);
              setSidebarOpen(false);
            }}
            sx={{ borderRadius: 2, mb: 1, background: currentFolder === folder.key ? 'rgba(33,150,243,0.08)' : 'none' }}
          >
            <ListItemIcon>{folder.icon}</ListItemIcon>
            <ListItemText primary={folder.label} />
            {emails[folder.key] && emails[folder.key].some(e => e.unread) && folder.key === 'inbox' && (
              <Badge color="error" variant="dot" />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Send message handler
  const handleSend = () => {
    if (!composeData.subject || !composeData.content) return;
    const msg = {
      id: Date.now(),
      subject: composeData.subject,
      content: composeData.content,
      sender: 'You',
      recipient: 'admin',
      date: new Date().toISOString(),
      unread: false,
      starred: false,
      folder: 'sent',
    };
    storeMessage(msg);
    setSentMessages(getStoredMessages());
    setComposeOpen(false);
    setComposeData({ subject: '', content: '' });
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Top App Bar for mobile */}
      {isMobile && (
        <AppBar position="sticky" color="default" elevation={1} sx={{ mb: 2 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>Mailbox</Typography>
            <IconButton color="primary" onClick={() => setComposeOpen(true)}>
              <Add />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth="lg" sx={{ pt: isMobile ? 1 : 4 }}>
        <Grid container spacing={2}>
          {/* Sidebar: Drawer on mobile, static on desktop */}
          {isMobile ? (
            <Drawer
              anchor="left"
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              PaperProps={{ sx: { width: 260 } }}
                >
              {sidebarContent}
            </Drawer>
          ) : (
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 3, mb: 2, minHeight: 400 }}>{sidebarContent}</Paper>
          </Grid>
          )}

          {/* Main Mail List */}
          <Grid item xs={12} md={9}>
            <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} mb={2}>
                <TextField
                  placeholder="Search mail..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ flex: 1, maxWidth: 300 }}
                />
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {filteredEmails.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography color="text.secondary" align="center">No emails found.</Typography>
                  </Grid>
                ) : (
                  filteredEmails.map((email) => (
                    <Grid item xs={12} sm={6} md={4} key={email.id}>
                      <Paper
                        elevation={2}
                      sx={{
                          p: 2,
                          borderRadius: 2,
                          height: '100%',
                          cursor: 'pointer',
                          background: email.unread ? 'rgba(33,150,243,0.07)' : 'white',
                          boxShadow: email.unread ? '0 0 0 2px #2196f3' : undefined,
                          transition: 'box-shadow 0.2s',
                        }}
                        onClick={() => handleEmailClick(email)}
                      >
                        <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                          <Avatar>{email.sender ? email.sender[0].toUpperCase() : '?'}</Avatar>
                          <Box flex={1}>
                            <Typography variant="subtitle1" fontWeight={email.unread ? 'bold' : 'normal'}>
                              {email.subject}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {email.content}
                            </Typography>
                      </Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton size="small" onClick={e => { e.stopPropagation(); /* TODO: handle star/unstar */ }}>
                              {email.starred ? <Star color="warning" /> : <StarBorder />}
                            </IconButton>
                            <IconButton size="small" onClick={e => { e.stopPropagation(); /* TODO: handle delete */ }}>
                              <Delete />
                            </IconButton>
                          </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            {new Date(email.date).toLocaleString()}
                        </Typography>
                          {email.unread && <Chip label="Unread" color="primary" size="small" />}
                        </Stack>
            </Paper>
          </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Email Detail Drawer */}
        <Drawer
          anchor={isMobile ? 'bottom' : 'right'}
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{ sx: { width: { xs: '100%', md: 500 }, maxHeight: '90vh', borderRadius: 3 } }}
        >
          {selectedEmail && (
            <Box sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">{selectedEmail.subject}</Typography>
                <IconButton onClick={handleDrawerClose}><Close /></IconButton>
              </Stack>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                From: {selectedEmail.sender}
              </Typography>
              <Typography variant="caption" color="text.secondary" mb={2}>
                {new Date(selectedEmail.date).toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{selectedEmail.content}</Typography>
              <Stack direction="row" spacing={1} mt={3}>
                <Button startIcon={<Reply />}>Reply</Button>
                <Button startIcon={<Forward />}>Forward</Button>
              </Stack>
            </Box>
          )}
        </Drawer>

        {/* Compose Dialog */}
        <Dialog open={composeOpen} onClose={() => setComposeOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Compose Mail</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="To" sx={{ mb: 2 }} />
            <TextField fullWidth label="Subject" sx={{ mb: 2 }} />
            <TextField fullWidth label="Message" multiline rows={6} sx={{ mb: 2 }} />
            {/* TODO: Add attachment upload */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setComposeOpen(false)}>Cancel</Button>
            <Button variant="contained">Send</Button>
          </DialogActions>
        </Dialog>

        {/* Floating Compose Button for mobile */}
        {isMobile && (
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1201 }}
            onClick={() => setComposeOpen(true)}
          >
            <Add />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default Mailbox; 