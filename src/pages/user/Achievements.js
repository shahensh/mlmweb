import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Chip,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  TrendingUp,
  Group,
  AccountBalanceWallet,
  LocalShipping,
  Diamond,
} from '@mui/icons-material';

const Achievements = () => {
  const theme = useTheme();

  // Mock achievements data
  const achievements = {
    totalPoints: 2500,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNextLevel: 500,
    totalAchievements: 12,
    unlockedAchievements: 8,
    categories: [
      {
        id: 1,
        title: 'Sales',
        icon: <TrendingUp />,
        achievements: [
          {
            id: 1,
            title: 'First Sale',
            description: 'Complete your first sale',
            points: 100,
            status: 'Completed',
            date: '2024-01-20',
          },
          {
            id: 2,
            title: 'Sales Champion',
            description: 'Achieve $10,000 in sales',
            points: 500,
            status: 'Completed',
            date: '2024-02-15',
          },
          {
            id: 3,
            title: 'Elite Seller',
            description: 'Achieve $50,000 in sales',
            points: 1000,
            status: 'In Progress',
            progress: 75,
          },
        ],
      },
      {
        id: 2,
        title: 'Team Building',
        icon: <Group />,
        achievements: [
          {
            id: 4,
            title: 'Team Starter',
            description: 'Recruit your first team member',
            points: 200,
            status: 'Completed',
            date: '2024-01-25',
          },
          {
            id: 5,
            title: 'Team Builder',
            description: 'Build a team of 5 members',
            points: 500,
            status: 'Completed',
            date: '2024-02-20',
          },
          {
            id: 6,
            title: 'Team Leader',
            description: 'Build a team of 20 members',
            points: 1000,
            status: 'In Progress',
            progress: 40,
          },
        ],
      },
      {
        id: 3,
        title: 'Rewards',
        icon: <Diamond />,
        achievements: [
          {
            id: 7,
            title: 'First Commission',
            description: 'Earn your first commission',
            points: 100,
            status: 'Completed',
            date: '2024-01-22',
          },
          {
            id: 8,
            title: 'Commission Master',
            description: 'Earn $5,000 in commissions',
            points: 500,
            status: 'Completed',
            date: '2024-02-28',
          },
          {
            id: 9,
            title: 'Commission Elite',
            description: 'Earn $20,000 in commissions',
            points: 1000,
            status: 'In Progress',
            progress: 60,
          },
        ],
      },
    ],
    recentAchievements: [
      {
        id: 1,
        title: 'Sales Champion',
        description: 'Achieved $10,000 in sales',
        date: '2024-02-15',
        points: 500,
      },
      {
        id: 2,
        title: 'Team Builder',
        description: 'Built a team of 5 members',
        date: '2024-02-20',
        points: 500,
      },
      {
        id: 3,
        title: 'Commission Master',
        description: 'Earned $5,000 in commissions',
        date: '2024-02-28',
        points: 500,
      },
    ],
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
          Achievements
        </Typography>

        <Grid container spacing={3}>
          {/* Achievement Stats */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Total Points
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {achievements.totalPoints}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<Star />}
                      label={achievements.level}
                      color="warning"
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
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Next Level
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {achievements.nextLevel}
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      {achievements.pointsToNextLevel} points needed
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={((achievements.totalPoints - 2000) / achievements.pointsToNextLevel) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
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
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" color="text.secondary">
                    Achievements
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {achievements.unlockedAchievements}/{achievements.totalAchievements}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      icon={<EmojiEvents />}
                      label="View All"
                      color="primary"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Achievement Categories */}
          {achievements.categories.map((category) => (
            <Grid item xs={12} key={category.id}>
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
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  {category.icon}
                  <Typography variant="h6">{category.title}</Typography>
                </Stack>

                <Grid container spacing={2}>
                  {category.achievements.map((achievement) => (
                    <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Stack spacing={2}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {achievement.title}
                              </Typography>
                              <Chip
                                label={achievement.status}
                                size="small"
                                color={achievement.status === 'Completed' ? 'success' : 'primary'}
                              />
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.description}
                            </Typography>
                            {achievement.status === 'In Progress' && (
                              <Stack spacing={1}>
                                <Typography variant="body2" color="text.secondary">
                                  Progress: {achievement.progress}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={achievement.progress}
                                  sx={{ height: 6, borderRadius: 3 }}
                                />
                              </Stack>
                            )}
                            {achievement.status === 'Completed' && (
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="body2" color="text.secondary">
                                  Completed on {achievement.date}
                                </Typography>
                                <Chip
                                  icon={<Star />}
                                  label={`${achievement.points} points`}
                                  size="small"
                                  color="warning"
                                />
                              </Stack>
                            )}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}

          {/* Recent Achievements */}
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
                Recent Achievements
              </Typography>
              <Grid container spacing={2}>
                {achievements.recentAchievements.map((achievement) => (
                  <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <EmojiEvents color="primary" />
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {achievement.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {achievement.description}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              {achievement.date}
                            </Typography>
                            <Chip
                              icon={<Star />}
                              label={`${achievement.points} points`}
                              size="small"
                              color="warning"
                            />
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Achievements; 