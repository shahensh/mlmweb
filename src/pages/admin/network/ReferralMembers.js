import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  AccountTree as TreeIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  Refresh,
  Visibility,
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';

const ReferralMembers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [sponsorSearch, setSponsorSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState('all');

  // Sample data for demonstration
  const referralData = {
    totalReferrals: 27,
    totalLevels: 4,
    members: [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        sponsor: 'sponsor1',
        level: 1,
        joinDate: '2024-01-01',
        status: 'Active',
        referrals: 5,
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        sponsor: 'sponsor2',
        level: 2,
        joinDate: '2024-01-02',
        status: 'Active',
        referrals: 3,
      },
      // Add more sample data as needed
    ],
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleProfileClick = (member) => {
    setSelectedProfile(member);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
    setShowProfile(false);
  };

  const handleSponsorSearch = () => {
    // Implement sponsor search functionality
    console.log('Searching sponsor:', sponsorSearch);
  };

  const handleLevelFilter = (event) => {
    setLevelFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleView = (id) => {
    console.log('View member:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit member:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete member:', id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Referral Members
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Add New Member
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Referrals
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {referralData.totalReferrals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Levels
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {referralData.totalLevels}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by name, username, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search by sponsor username..."
                value={sponsorSearch}
                onChange={(e) => setSponsorSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={levelFilter}
                  onChange={handleLevelFilter}
                  label="Level"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  {[...Array(referralData.totalLevels)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      Level {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
                <IconButton>
                  <Refresh />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  height: '56px',
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Sponsor</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Referrals</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referralData.members
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar>{member.name[0]}</Avatar>
                          {member.name}
                        </Box>
                      </TableCell>
                      <TableCell>{member.username}</TableCell>
                      <TableCell>{member.sponsor}</TableCell>
                      <TableCell>
                        <Chip 
                          label={`Level ${member.level}`}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>
                        <Chip 
                          label={member.status}
                          color={getStatusColor(member.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{member.referrals}</TableCell>
                      <TableCell>
                        <IconButton 
                          size="small"
                          onClick={() => handleProfileClick(member)}
                        >
                          <PersonIcon />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleView(member.id)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleEdit(member.id)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={referralData.members.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>

      {/* Profile Dialog */}
      <Dialog 
        open={showProfile} 
        onClose={handleCloseProfile}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        {selectedProfile && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              bgcolor: 'primary.main',
              color: 'white',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar>{selectedProfile.name[0]}</Avatar>
                <Typography variant="h6">{selectedProfile.name}</Typography>
              </Box>
              <IconButton onClick={handleCloseProfile} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Username</Typography>
                  <Typography>{selectedProfile.username}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Sponsor</Typography>
                  <Typography>{selectedProfile.sponsor}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Level</Typography>
                  <Chip 
                    label={`Level ${selectedProfile.level}`}
                    color="primary"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Join Date</Typography>
                  <Typography>{selectedProfile.joinDate}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Status</Typography>
                  <Chip 
                    label={selectedProfile.status}
                    color={getStatusColor(selectedProfile.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" color="text.secondary">Total Referrals</Typography>
                  <Typography>{selectedProfile.referrals}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ReferralMembers; 