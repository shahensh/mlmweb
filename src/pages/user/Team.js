import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  Group,
  PersonAdd,
  TrendingUp,
  MoreVert,
  Star,
  EmojiEvents,
  AccountBalanceWallet,
} from '@mui/icons-material';

const Team = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  // Mock team data
  const team = {
    totalMembers: 15,
    activeMembers: 12,
    newMembers: 3,
    totalSales: '$50,000',
    monthlyGrowth: '+15%',
    members: [
      {
        id: 1,
        name: 'Alice Johnson',
        level: 'Silver',
        joinDate: '2024-02-01',
        sales: '$12,500',
        teamSize: 5,
        status: 'Active',
        performance: 'High',
      },
      {
        id: 2,
        name: 'Bob Smith',
        level: 'Bronze',
        joinDate: '2024-02-15',
        sales: '$8,000',
        teamSize: 2,
        status: 'Active',
        performance: 'Medium',
      },
      {
        id: 3,
        name: 'Carol White',
        level: 'Gold',
        joinDate: '2024-01-20',
        sales: '$15,000',
        teamSize: 8,
        status: 'Active',
        performance: 'High',
      },
    ],
    achievements: [
      {
        id: 1,
        title: 'Team Builder',
        description: 'Recruited 5 team members',
        date: '2024-02-15',
      },
      {
        id: 2,
        title: 'Sales Leader',
        description: 'Team achieved $50,000 in sales',
        date: '2024-03-01',
      },
    ],
  };

  const handleMenuOpen = (event, member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          My Team
        </Typography>

        <Grid container spacing={3}>
          {/* Team Stats */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Team Size
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {team.totalMembers}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<Group />}
                      label={`${team.activeMembers} Active`}
                      color="success"
                    />
                    <Chip
                      icon={<PersonAdd />}
                      label={`${team.newMembers} New`}
                      color="primary"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Total Sales
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {team.totalSales}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<TrendingUp />}
                      label={team.monthlyGrowth}
                      color="success"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                p: { xs: 2, sm: 3 },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Team Achievements
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {team.achievements.length}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<EmojiEvents />}
                      label="View Achievements"
                      color="primary"
                      onClick={() => {}}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">Team Members</Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                    },
                  }}
                >
                  Add Member
                </Button>
              </Stack>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Level</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Sales</TableCell>
                      <TableCell>Team Size</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Performance</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar>{member.name[0]}</Avatar>
                            <Typography>{member.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={member.level}
                            size="small"
                            color={
                              member.level === 'Gold'
                                ? 'warning'
                                : member.level === 'Silver'
                                ? 'default'
                                : 'primary'
                            }
                          />
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>{member.sales}</TableCell>
                        <TableCell>{member.teamSize}</TableCell>
                        <TableCell>
                          <Chip
                            label={member.status}
                            size="small"
                            color={member.status === 'Active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<Star />}
                            label={member.performance}
                            size="small"
                            color={member.performance === 'High' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, member)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Team Achievements */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Team Achievements
              </Typography>
              <Grid container spacing={2}>
                {team.achievements.map((achievement) => (
                  <Grid item xs={12} sm={6} key={achievement.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <EmojiEvents color="primary" />
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                              {achievement.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Achieved on {achievement.date}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Member Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <AccountBalanceWallet fontSize="small" sx={{ mr: 1 }} />
            View Sales
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Group fontSize="small" sx={{ mr: 1 }} />
            View Sub-team
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <TrendingUp fontSize="small" sx={{ mr: 1 }} />
            Performance Report
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default Team; 