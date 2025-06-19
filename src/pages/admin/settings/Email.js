import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Reply as ReplyIcon } from '@mui/icons-material';

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

const EmailSettings = () => {
  const [messages, setMessages] = useState(getStoredMessages().filter(m => m.recipient === 'admin'));
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleOpenMsg = (msg) => setSelectedMsg(msg);
  const handleCloseMsg = () => setSelectedMsg(null);

  const handleReply = () => {
    setReplyOpen(true);
    setReplyContent('');
  };
  const handleSendReply = () => {
    if (!replyContent) return;
    const reply = {
      id: Date.now(),
      subject: 'Re: ' + selectedMsg.subject,
      content: replyContent,
      sender: 'admin',
      recipient: 'You',
      date: new Date().toISOString(),
      unread: false,
      starred: false,
      folder: 'sent',
    };
    storeMessage(reply);
    setReplyOpen(false);
    setSelectedMsg(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Messages
      </Typography>
      <Paper sx={{ p: 3 }}>
        <List>
          {messages.length === 0 && (
            <Typography color="text.secondary">No messages from users.</Typography>
          )}
          {messages.map((msg) => (
            <ListItem button key={msg.id} onClick={() => handleOpenMsg(msg)}>
              <ListItemText
                primary={msg.subject}
                secondary={`From: ${msg.sender} | ${new Date(msg.date).toLocaleString()}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => { setSelectedMsg(msg); handleReply(); }}>
                  <ReplyIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* Message Dialog */}
      <Dialog open={!!selectedMsg} onClose={handleCloseMsg} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedMsg?.subject}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            From: {selectedMsg?.sender} | {selectedMsg && new Date(selectedMsg.date).toLocaleString()}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{selectedMsg?.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMsg}>Close</Button>
          <Button onClick={handleReply} variant="contained" startIcon={<ReplyIcon />}>Reply</Button>
        </DialogActions>
      </Dialog>
      {/* Reply Dialog */}
      <Dialog open={replyOpen} onClose={() => setReplyOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reply to User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Message"
            multiline
            minRows={3}
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyOpen(false)}>Cancel</Button>
          <Button onClick={handleSendReply} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailSettings; 