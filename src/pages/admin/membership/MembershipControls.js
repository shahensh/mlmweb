import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Stack,
  Alert,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishIcon from '@mui/icons-material/UnpublishedOutlined';

const initialPlan = {
  name: '',
  price: '',
  duration: '',
  description: '',
  features: [],
  isPublished: false
};

const MembershipControls = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      price: '49.99',
      duration: '1 month',
      description: 'Perfect for starters',
      features: ['Basic Support', 'Up to 10 referrals', 'Basic Analytics'],
      isPublished: true
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '99.99',
      duration: '3 months',
      description: 'Most popular choice',
      features: ['Priority Support', 'Unlimited referrals', 'Advanced Analytics', 'Priority Processing'],
      isPublished: false
    }
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [editMode, setEditMode] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setCurrentPlan(plan);
      setEditMode(true);
    } else {
      setCurrentPlan(initialPlan);
      setEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPlan(initialPlan);
    setEditMode(false);
    setNewFeature('');
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setCurrentPlan({
        ...currentPlan,
        features: [...currentPlan.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setCurrentPlan({
      ...currentPlan,
      features: currentPlan.features.filter((_, i) => i !== index)
    });
  };

  const handleSavePlan = () => {
    if (editMode) {
      setPlans(plans.map(p => p.id === currentPlan.id ? currentPlan : p));
      showAlert('Plan updated successfully!', 'success');
    } else {
      const newPlan = {
        ...currentPlan,
        id: Date.now(),
        isPublished: false
      };
      setPlans([...plans, newPlan]);
      showAlert('New plan created successfully!', 'success');
    }
    handleCloseDialog();
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id));
    showAlert('Plan deleted successfully!', 'success');
  };

  const handleTogglePublish = (id) => {
    setPlans(plans.map(p => {
      if (p.id === id) {
        return { ...p, isPublished: !p.isPublished };
      }
      return p;
    }));
    showAlert('Publication status updated!', 'success');
  };

  const showAlert = (message, severity) => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Membership Controls
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Create New Plan
          </Button>
        </Box>

        {alert.show && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(plan)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleTogglePublish(plan.id)}
                      color={plan.isPublished ? 'primary' : 'default'}
                    >
                      {plan.isPublished ? <PublishIcon /> : <UnpublishIcon />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeletePlan(plan.id)}
                      color="error"
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Typography variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    ${plan.price}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Duration: {plan.duration}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {plan.description}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Features:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {plan.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={plan.isPublished ? 'Published' : 'Draft'}
                      color={plan.isPublished ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Membership Plan' : 'Create New Membership Plan'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  value={currentPlan.name}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price ($)"
                  type="number"
                  value={currentPlan.price}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={currentPlan.duration}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, duration: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={currentPlan.description}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Features
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                    {currentPlan.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        onDelete={() => handleRemoveFeature(index)}
                        size="small"
                      />
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      label="Add Feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button variant="outlined" onClick={handleAddFeature}>
                      Add
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentPlan.isPublished}
                      onChange={(e) => setCurrentPlan({ ...currentPlan, isPublished: e.target.checked })}
                    />
                  }
                  label="Publish Plan"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePlan} variant="contained" color="primary">
            {editMode ? 'Update Plan' : 'Create Plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MembershipControls; 