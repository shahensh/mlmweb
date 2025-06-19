import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  Share as ShareIcon,
  WhatsApp,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { users } from '../../services/api';
import { whatsapp } from '../../services/whatsapp';
import SocialShare from '../../components/SocialShare';
import ForceGraph2D from 'react-force-graph-2d';

const Network = () => {
  const [networkData, setNetworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetchNetwork();
  }, []);

  const fetchNetwork = async () => {
    try {
      setLoading(true);
      const data = await users.getNetwork();
      setNetworkData(data);
      
      // Transform data for force graph
      const nodes = [
        { id: 'root', name: 'You', level: 0 },
        ...data.map(member => ({
          id: member._id,
          name: member.name,
          level: member.level,
          ...member
        }))
      ];
      
      const links = data.map(member => ({
        source: 'root',
        target: member._id,
        value: member.downlineCount
      }));

      setGraphData({ nodes, links });
    } catch (err) {
      setError('Failed to load network data. Please try again later.');
      console.error('Error fetching network:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleCloseDialog = () => {
    setSelectedMember(null);
  };

  const handleSendWhatsApp = async (phone) => {
    try {
      await whatsapp.sendNotification(phone, 'Hello from your network!');
    } catch (err) {
      console.error('Error sending WhatsApp message:', err);
    }
  };

  const handleShareReferral = async () => {
    try {
      const code = await users.getReferralCode();
      setReferralCode(code);
    } catch (err) {
      console.error('Error getting referral code:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            My Network
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Your Referral Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              size="small"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShareReferral}>
                      <ShareIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <SocialShare
              title="Join My Network"
              description="Join my MLM network and start your journey to success!"
              url={`${window.location.origin}/register?ref=${referralCode}`}
            />
          </Box>
        </Box>

        {/* Interactive Network Tree */}
        <Paper sx={{ p: 2, mb: 3, height: '500px' }}>
          <ForceGraph2D
            graphData={graphData}
            nodeLabel="name"
            nodeColor={node => node.level === 0 ? '#1976d2' : '#4caf50'}
            nodeRelSize={6}
            linkWidth={link => Math.sqrt(link.value)}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={d => d.value * 0.001}
            onNodeClick={node => {
              if (node.id !== 'root') {
                handleMemberClick(node);
              }
            }}
          />
        </Paper>

        {/* Network Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Members
                </Typography>
                <Typography variant="h3">
                  {networkData.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Members
                </Typography>
                <Typography variant="h3">
                  {networkData.filter(m => m.salesCount > 0).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Downlines
                </Typography>
                <Typography variant="h3">
                  {networkData.reduce((sum, m) => sum + m.downlineCount, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Member List */}
        <Grid container spacing={3}>
          {networkData.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleMemberClick(member)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={member.profile?.avatar}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    >
                      {member.name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{member.email}</Typography>
                    </Box>
                    {member.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{member.phone}</Typography>
                      </Box>
                    )}
                    {member.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{member.location}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<Business />}
                      label={`Level ${member.level}`}
                      size="small"
                      color="primary"
                    />
                    <Chip
                      label={`${member.downlineCount} Downlines`}
                      size="small"
                      color="secondary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={Boolean(selectedMember)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedMember && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={selectedMember.profile?.avatar}
                  sx={{ width: 64, height: 64 }}
                >
                  {selectedMember.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedMember.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMember.role}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1">{selectedMember.email}</Typography>
                  </Box>
                  {selectedMember.phone && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">{selectedMember.phone}</Typography>
                    </Box>
                  )}
                  {selectedMember.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">{selectedMember.location}</Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Network Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<PeopleIcon />}
                      label={`${selectedMember.downlineCount} Downlines`}
                    />
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`${selectedMember.salesCount} Sales`}
                    />
                    <Chip
                      icon={<Person />}
                      label={`Level ${selectedMember.level}`}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {selectedMember.phone && (
                <Button
                  startIcon={<WhatsApp />}
                  onClick={() => handleSendWhatsApp(selectedMember.phone)}
                >
                  Send WhatsApp
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Network; 