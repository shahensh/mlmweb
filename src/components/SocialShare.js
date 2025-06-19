import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
  Share as ShareIcon,
} from '@mui/icons-material';

const SocialShare = ({ title, description, url }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${description}\n${url}`)}`,
  };

  const handleShare = (platform) => {
    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title="Share">
        <IconButton onClick={handleClickOpen} color="primary">
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Share this with your network
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', my: 2 }}>
            <Tooltip title="Share on Facebook">
              <IconButton onClick={() => handleShare('facebook')} color="primary">
                <Facebook />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on Twitter">
              <IconButton onClick={() => handleShare('twitter')} color="info">
                <Twitter />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on LinkedIn">
              <IconButton onClick={() => handleShare('linkedin')} color="primary">
                <LinkedIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on WhatsApp">
              <IconButton onClick={() => handleShare('whatsapp')} color="success">
                <WhatsApp />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Custom Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a personal message to your share..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SocialShare; 