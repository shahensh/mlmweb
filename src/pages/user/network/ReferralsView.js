import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar, Stack, Dialog, DialogTitle, DialogContent, IconButton, useTheme, useMediaQuery } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';

const mockReferrals = [
  {
    level: 1,
    title: 'Direct Referrals',
    members: [
      { name: 'Alice', id: 2, joinDate: '2024-02-01' },
      { name: 'Bob', id: 3, joinDate: '2024-02-15' },
    ],
  },
  {
    level: 2,
    title: 'Indirect Referrals',
    members: [
      { name: 'Carol', id: 4, joinDate: '2024-03-01' },
      { name: 'David', id: 5, joinDate: '2024-03-10' },
      { name: 'Eve', id: 6, joinDate: '2024-03-12' },
    ],
  },
];

const userInfo = {
  2: { name: 'Alice', userId: 'USR000002', email: 'alice@example.com', phone: '+1 234 567 8901', joinDate: '2024-02-01', level: 'Member', avatar: '' },
  3: { name: 'Bob', userId: 'USR000003', email: 'bob@example.com', phone: '+1 234 567 8902', joinDate: '2024-02-15', level: 'Member', avatar: '' },
  4: { name: 'Carol', userId: 'USR000004', email: 'carol@example.com', phone: '+1 234 567 8903', joinDate: '2024-03-01', level: 'Member', avatar: '' },
  5: { name: 'David', userId: 'USR000005', email: 'david@example.com', phone: '+1 234 567 8904', joinDate: '2024-03-10', level: 'Member', avatar: '' },
  6: { name: 'Eve', userId: 'USR000006', email: 'eve@example.com', phone: '+1 234 567 8905', joinDate: '2024-03-12', level: 'Member', avatar: '' },
};

const ReferralsView = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCardClick = (member) => {
    setSelectedUser(userInfo[member.id] || { name: member.name });
  };

  const handleCloseDialog = () => setSelectedUser(null);

  return (
    <Box sx={{ mt: 2, mb: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', px: { xs: 1, sm: 2 } }}>
      <Paper sx={{ p: { xs: 1.5, sm: 4 }, mb: 3, borderRadius: 4, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)', border: '1px solid #e3eafc' }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          fontSize: { xs: '1.5rem', sm: '2rem' },
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}>
          Referrals & Downlines
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Visualize your direct and indirect referrals, and see your downline tree.
        </Typography>
        <Stack spacing={3} alignItems="stretch">
          {mockReferrals.map((section) => (
            <Box key={section.level} sx={{ width: '100%' }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                {section.title}
              </Typography>
              <Grid container spacing={2}>
                {section.members.map((member) => (
                  <Grid item xs={12} sm={6} md={4} key={member.id}>
                    <Card onClick={() => handleCardClick(member)} sx={{
                      height: '100%',
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.8)',
                      boxShadow: '0 4px 24px 0 rgba(33,203,243,0.10)',
                      border: '1px solid #e3eafc',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 12px 36px 0 rgba(33,203,243,0.22)',
                      },
                    }}>
                      <CardContent sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'row', sm: 'column' }, 
                        alignItems: { xs: 'center', sm: 'center' },
                        gap: { xs: 2, sm: 1 },
                        p: { xs: 2, sm: 3 }
                      }}>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main', 
                          color: 'white', 
                          width: { xs: 48, sm: 56 }, 
                          height: { xs: 48, sm: 56 },
                          flexShrink: 0
                        }}>
                          <GroupAddIcon />
                        </Avatar>
                        <Box sx={{ 
                          flex: 1,
                          textAlign: { xs: 'left', sm: 'center' }
                        }}>
                          <Typography variant="subtitle1" fontWeight="bold" sx={{ 
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: 0.5
                          }}>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="primary" sx={{ 
                            fontWeight: 600, 
                            letterSpacing: 1,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            display: 'block',
                            mb: 0.5
                          }}>
                            {userInfo[member.id]?.userId && `ID: ${userInfo[member.id].userId}`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.8rem' }
                          }}>
                            Level {section.level}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{
                            fontSize: { xs: '0.75rem', sm: '0.8rem' }
                          }}>
                            Joined: {member.joinDate}
                          </Typography>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                            {userInfo[member.id]?.userId && `ID: ${userInfo[member.id].userId}`}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>
        <Dialog 
          open={!!selectedUser} 
          onClose={handleCloseDialog} 
          maxWidth="xs" 
          fullWidth
          fullScreen={isMobile}
        >
          <DialogTitle sx={{ pr: 6 }}>
            User Info
            <IconButton 
              onClick={handleCloseDialog} 
              sx={{ 
                position: 'absolute', 
                right: 8, 
                top: 8,
                color: 'text.secondary'
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Stack spacing={2} alignItems="center" sx={{ py: 2 }}>
                <Avatar sx={{ 
                  width: { xs: 80, sm: 64 }, 
                  height: { xs: 80, sm: 64 }, 
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontSize: { xs: 40, sm: 32 }
                }}>
                  <GroupAddIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}>
                  {selectedUser.name}
                </Typography>
                {selectedUser.email && (
                  <Typography variant="body2" sx={{ 
                    wordBreak: 'break-word',
                    fontSize: { xs: '0.9rem', sm: '0.875rem' }
                  }}>
                    Email: {selectedUser.email}
                  </Typography>
                )}
                {selectedUser.phone && (
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '0.875rem' } }}>
                    Phone: {selectedUser.phone}
                  </Typography>
                )}
                {selectedUser.joinDate && (
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '0.875rem' } }}>
                    Joined: {selectedUser.joinDate}
                  </Typography>
                )}
                {selectedUser.level && (
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '0.875rem' } }}>
                    Level: {selectedUser.level}
                  </Typography>
                )}
                {selectedUser.userId && (
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                    User ID: {selectedUser.userId}
                  </Typography>
                )}
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default ReferralsView; 