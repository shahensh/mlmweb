import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Chip, Avatar, Stack } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReplyIcon from '@mui/icons-material/Reply';
import LockIcon from '@mui/icons-material/Lock';

const mockThreads = [
  {
    id: 1,
    title: 'How do I maximize my referral income?',
    replies: 14,
    lastReply: '2024-06-25',
    status: 'open',
    author: 'Alice',
  },
  {
    id: 2,
    title: 'Best strategies for new members',
    replies: 8,
    lastReply: '2024-06-24',
    status: 'open',
    author: 'Bob',
  },
  {
    id: 3,
    title: 'Archived: 2023 Top Earners Q&A',
    replies: 32,
    lastReply: '2023-12-31',
    status: 'locked',
    author: 'Admin',
  },
];

const DiscussionBoard = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    setTimeout(() => setThreads(mockThreads), 500);
  }, []);

  return (
    <Box sx={{ mt: 4, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.12)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Discussion Board
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Start or join a discussion. Share your experience, ask questions, and help others. (Admins can lock or archive threads.)
        </Typography>
        <Grid container spacing={3}>
          {threads.map((thread) => (
            <Grid item xs={12} sm={6} md={4} key={thread.id}>
              <Card sx={{
                height: '100%',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.7)',
                boxShadow: '0 4px 24px 0 rgba(33,203,243,0.10)',
                border: '1px solid #e3eafc',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.03)',
                  boxShadow: '0 8px 32px 0 rgba(33,203,243,0.18)',
                },
              }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <ForumIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{thread.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" gutterBottom>By: {thread.author}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <ReplyIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">{thread.replies} replies</Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" gutterBottom>Last Reply: {thread.lastReply}</Typography>
                  <Chip label={thread.status === 'open' ? 'Open' : 'Locked'} icon={thread.status === 'open' ? undefined : <LockIcon fontSize="small" />} color={thread.status === 'open' ? 'success' : 'default'} size="small" sx={{ mb: 1, ml: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default DiscussionBoard; 