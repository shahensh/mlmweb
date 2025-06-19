import React, { useState } from 'react';
import {  Box,  Container,  Paper,  Typography,  Grid,  Card,  CardContent,  Tabs,  Tab,  Avatar,  Stack,  Divider,  useTheme,  List,  ListItem,  ListItemText,  ListItemIcon,  Collapse,  IconButton,} from '@mui/material';
import {  ExpandMore,  ExpandLess,  Person,  Group,  TrendingUp,  EmojiEvents,  Star,} from '@mui/icons-material';

const Performance = () => {
  const theme = useTheme();
  const [matrixSize, setMatrixSize] = useState('2x2');
  const [activeTab, setActiveTab] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  // Mock data for tree view
  const treeData = {
    id: 'root',
    name: 'You',
    children: [
      {
        id: '1',
        name: 'John Doe',
        children: [
          { id: '1-1', name: 'Alice Smith' },
          { id: '1-2', name: 'Bob Johnson' },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        children: [
          { id: '2-1', name: 'Charlie Brown' },
          { id: '2-2', name: 'Diana Prince' },
        ],
      },
    ],
  };
  // Mock data for matrix views
  const matrixData = {
    '2x2': [
      { id: 1, name: 'John Doe', level: 'Bronze', points: 1500 },
      { id: 2, name: 'Jane Smith', level: 'Silver', points: 2500 },
      { id: 3, name: 'Alice Johnson', level: 'Gold', points: 3500 },
      { id: 4, name: 'Bob Brown', level: 'Platinum', points: 4500 },
    ],
    '3x3': [
      { id: 1, name: 'John Doe', level: 'Bronze', points: 1500 },
      { id: 2, name: 'Jane Smith', level: 'Silver', points: 2500 },
      { id: 3, name: 'Alice Johnson', level: 'Gold', points: 3500 },
      { id: 4, name: 'Bob Brown', level: 'Platinum', points: 4500 },
      { id: 5, name: 'Charlie Wilson', level: 'Bronze', points: 1200 },
      { id: 6, name: 'Diana Ross', level: 'Silver', points: 2200 },
      { id: 7, name: 'Edward Norton', level: 'Gold', points: 3200 },
      { id: 8, name: 'Fiona Apple', level: 'Platinum', points: 4200 },
      { id: 9, name: 'George Clooney', level: 'Diamond', points: 5200 },
    ],
    '4x4': Array(16).fill(null).map((_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      level: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)],
      points: Math.floor(Math.random() * 5000) + 1000,
    })),
    '5x5': Array(25).fill(null).map((_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      level: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'][Math.floor(Math.random() * 5)],
      points: Math.floor(Math.random() * 5000) + 1000,
    })),
  };
  // Mock user performance data
  const userPerformance = {
    totalPoints: 12500,
    rank: 'Gold',
    level: 3,
    achievements: [
      { id: 1, name: 'First Sale', date: '2024-03-01', points: 500 },
      { id: 2, name: 'Team Builder', date: '2024-03-05', points: 1000 },
      { id: 3, name: 'Top Performer', date: '2024-03-10', points: 1500 },
    ],
    stats: {
      totalSales: 25,
      teamSize: 8,
      monthlyGrowth: '15%',
      conversionRate: '65%',
    },
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderTreeItem = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    return (
      <React.Fragment key={node.id}>
        <ListItem
          sx={{
            pl: level * 2,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ListItemIcon>
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              {node.name[0]}
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={node.name} />
          {hasChildren && (
            <IconButton onClick={() => toggleNode(node.id)}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {node.children.map((child) => renderTreeItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const MatrixView = ({ size }) => (
    <Grid container spacing={2}>
      {matrixData[size].map((user) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {user.name[0]}
                  </Avatar>
                  <Typography variant="subtitle1">{user.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Level: {user.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Points: {user.points}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 3,
        px: { xs: 2, sm: 3 },
        width: '100%',
        ml: { sm: '240px' },
        transition: 'margin 0.2s ease-in-out',
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          px: { xs: 2, sm: 3 },
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Performance Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* User Performance Summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
                height: 'calc(100vh - 180px)',
                overflow: 'auto',
              }}
            >
              <Stack spacing={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    <Person sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h6">Your Performance</Typography>
                  <Typography variant="h4" color="primary" sx={{ my: 1 }}>
                    {userPerformance.totalPoints} Points
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Rank: {userPerformance.rank}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Total Sales
                      </Typography>
                      <Typography variant="h6">
                        {userPerformance.stats.totalSales}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Team Size
                      </Typography>
                      <Typography variant="h6">
                        {userPerformance.stats.teamSize}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Monthly Growth
                      </Typography>
                      <Typography variant="h6">
                        {userPerformance.stats.monthlyGrowth}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Conversion Rate
                      </Typography>
                      <Typography variant="h6">
                        {userPerformance.stats.conversionRate}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Recent Achievements
                  </Typography>
                  <Stack spacing={1}>
                    {userPerformance.achievements.map((achievement) => (
                      <Box
                        key={achievement.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'action.hover',
                        }}
                      >
                        <EmojiEvents color="primary" />
                        <Box>
                          <Typography variant="body2">
                            {achievement.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {achievement.date} • {achievement.points} points
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Tree View and Matrix */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)',
                border: '1px solid',
                borderColor: 'divider',
                height: 'calc(100vh - 180px)',
                overflow: 'auto',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 3 }}
              >
                <Tab label="Tree View" />
                <Tab label="Matrix View" />
              </Tabs>
              {activeTab === 0 ? (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {renderTreeItem(treeData)}
                </List>
              ) : (
                <Box>
                  <Tabs
                    value={matrixSize}
                    onChange={(e, newValue) => setMatrixSize(newValue)}
                    sx={{ mb: 3 }}
                  >
                    <Tab value="2x2" label="2x2" />
                    <Tab value="3x3" label="3x3" />
                    <Tab value="4x4" label="4x4" />
                    <Tab value="5x5" label="5x5" />
                  </Tabs>
                  <MatrixView size={matrixSize} />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Performance; 