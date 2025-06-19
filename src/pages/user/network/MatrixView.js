import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Avatar, Stack, Tabs, Tab, Dialog, DialogTitle, DialogContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, useMediaQuery } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';

const matrixTypes = [
  { label: '2x2', value: 2 },
  { label: '3x3', value: 3 },
  { label: '4x4', value: 4 },
  { label: '5x5', value: 5 },
];

const userInfo = {
  1: { name: 'You', userId: 'USR000001', email: 'you@example.com', phone: '+1 234 567 8900', joinDate: '2024-01-01', level: 'Admin', avatar: '', isYou: true },
};

function generateMatrixData(n, levels) {
  let id = 2;
  const matrix = [];
  for (let l = 1; l <= levels; l++) {
    const count = Math.pow(n, l);
    const members = [];
    for (let i = 0; i < count; i++) {
      if (l === 1 && i === 0) {
        members.push({ name: 'You', id: 1, avatar: '', isYou: true });
      } else {
        members.push({ name: `User${id}`, id, avatar: '' });
        id++;
      }
    }
    matrix.push({ level: l, members });
  }
  return matrix;
}

const incomePlan5x5 = [
  { level: 1, members: 5, incomePerMember: 50 },
  { level: 2, members: 25, incomePerMember: 40 },
  { level: 3, members: 125, incomePerMember: 30 },
  { level: 4, members: 625, incomePerMember: 20 },
  { level: 5, members: 3125, incomePerMember: 10 },
];

const MatrixView = () => {
  const [matrixType, setMatrixType] = useState(3);
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCardClick = (member) => {
    setSelectedUser(userInfo[member.id] || { name: member.name });
  };

  const handleCloseDialog = () => setSelectedUser(null);

  const matrix = generateMatrixData(matrixType, 5);

  // For 5x5, calculate income totals
  let totalIncome = 0;
  if (matrixType === 5) {
    totalIncome = incomePlan5x5.reduce((sum, row) => sum + row.members * row.incomePerMember, 0);
  }

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
          Matrix View
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={matrixType} 
            onChange={(_, v) => setMatrixType(v)} 
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{ 
              '& .MuiTabs-flexContainer': {
                justifyContent: isMobile ? 'flex-start' : 'center'
              }
            }}
          >
            {matrixTypes.map((type) => (
              <Tab key={type.value} label={type.label} value={type.value} sx={{ minWidth: { xs: 60, sm: 90 } }} />
            ))}
          </Tabs>
        </Box>
        <Typography variant="body1" color="text.secondary" mb={3} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Visualize your downline and placement in the {matrixType}x{matrixType} matrix structure. Each level can have up to {matrixType} members per member.
        </Typography>
        <Stack spacing={2} alignItems="center">
          {matrix.map((level, idx) => (
            <Grid container spacing={1} justifyContent="center" key={level.level} sx={{ width: '100%' }}>
              {level.members.map((member, i) => (
                <Grid item xs={6} sm={4} md={2} lg={1} key={member.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card onClick={() => handleCardClick(member)} sx={{
                    width: '100%',
                    minWidth: { xs: '100px', sm: '120px' },
                    maxWidth: { xs: '140px', sm: '160px' },
                    borderRadius: 3,
                    background: member.isYou ? 'linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)' : 'rgba(255,255,255,0.8)',
                    color: member.isYou ? 'white' : 'inherit',
                    boxShadow: member.isYou ? '0 8px 32px 0 rgba(33,203,243,0.18)' : '0 4px 24px 0 rgba(33,203,243,0.10)',
                    border: '1px solid #e3eafc',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 36px 0 rgba(33,203,243,0.22)',
                    },
                  }}>
                    <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                      <Avatar sx={{ 
                        bgcolor: member.isYou ? 'primary.main' : 'grey.200', 
                        color: member.isYou ? 'white' : 'primary.main', 
                        width: { xs: 40, sm: 48 }, 
                        height: { xs: 40, sm: 48 }, 
                        mx: 'auto', 
                        mb: 1,
                        fontSize: { xs: '1.2rem', sm: '1.5rem' }
                      }}>
                        {member.isYou ? <GroupIcon /> : member.name[0]}
                      </Avatar>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color={member.isYou ? 'inherit' : 'primary'} sx={{ 
                        fontWeight: 600, 
                        letterSpacing: 1,
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        display: 'block',
                        mb: 0.5
                      }}>
                        {userInfo[member.id]?.userId && `ID: ${userInfo[member.id].userId}`}
                      </Typography>
                      <Typography variant="caption" color={member.isYou ? 'inherit' : 'text.secondary'} sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                        Level {level.level}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Stack>
        {/* 5x5 Income Plan Table */}
        {matrixType === 5 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              5x5 Matrix Income Plan
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Level</TableCell>
                    <TableCell>Members</TableCell>
                    <TableCell>Income Per Member</TableCell>
                    <TableCell>Total Income</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomePlan5x5.map((row) => (
                    <TableRow key={row.level}>
                      <TableCell>{row.level}</TableCell>
                      <TableCell>{row.members.toLocaleString()}</TableCell>
                      <TableCell>₹{row.incomePerMember}</TableCell>
                      <TableCell>₹{(row.members * row.incomePerMember).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} align="right"><b>Total</b></TableCell>
                    <TableCell><b>₹{totalIncome.toLocaleString()}</b></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
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
                  bgcolor: selectedUser.isYou ? 'primary.main' : 'grey.200', 
                  color: selectedUser.isYou ? 'white' : 'primary.main', 
                  fontSize: { xs: 40, sm: 32 }
                }}>
                  {selectedUser.isYou ? <GroupIcon /> : selectedUser.name[0]}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">{selectedUser.name}</Typography>
                {selectedUser.userId && (
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                    User ID: {selectedUser.userId}
                  </Typography>
                )}
                {selectedUser.email && (
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    Email: {selectedUser.email}
                  </Typography>
                )}
                {selectedUser.phone && <Typography variant="body2">Phone: {selectedUser.phone}</Typography>}
                {selectedUser.joinDate && <Typography variant="body2">Joined: {selectedUser.joinDate}</Typography>}
                {selectedUser.level && <Typography variant="body2">Level: {selectedUser.level}</Typography>}
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default MatrixView;