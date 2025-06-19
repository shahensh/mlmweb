import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import StripePayment from '../../../components/payment/StripePayment';

const steps = ['Select Plan', 'Review Details', 'Payment'];

const Membership = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic Plan',
      price: '49.99',
      duration: '1 month',
      description: 'Perfect for starters',
      features: ['Basic Support', 'Up to 10 referrals', 'Basic Analytics'],
      isPopular: false
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '99.99',
      duration: '3 months',
      description: 'Most popular choice',
      features: ['Priority Support', 'Unlimited referrals', 'Advanced Analytics', 'Priority Processing'],
      isPopular: true
    }
  ]);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [activeStep, setActiveStep] = useState(0);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setOpenDialog(true);
    setActiveStep(0);
    setPaymentError(null);
    setPaymentSuccess(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPlan(null);
    setActiveStep(0);
    setPaymentError(null);
    setPaymentSuccess(false);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Update subscription status in your backend
      const response = await fetch('/api/subscriptions/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan.id,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to activate subscription');
      }

      setPaymentSuccess(true);
      setAlert({
        show: true,
        message: `Successfully subscribed to ${selectedPlan.name}!`,
        severity: 'success'
      });
      setTimeout(() => {
        handleCloseDialog();
        setAlert({ show: false, message: '', severity: 'success' });
      }, 3000);
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  const handlePaymentError = (error) => {
    setPaymentError(error.message);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Selected Plan
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              {selectedPlan.name} - ${selectedPlan.price}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Duration: {selectedPlan.duration}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedPlan.description}
            </Typography>
            <List>
              {selectedPlan.features.map((feature, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Plan Name:</Typography>
                <Typography fontWeight="bold">{selectedPlan.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Duration:</Typography>
                <Typography fontWeight="bold">{selectedPlan.duration}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Price:</Typography>
                <Typography fontWeight="bold" color="primary">
                  ${selectedPlan.price}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  ${selectedPlan.price}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );
      case 2:
        return (
          <Box>
            <StripePayment
              amount={parseFloat(selectedPlan.price)}
              planName={selectedPlan.name}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Membership Plans
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Choose the perfect membership plan for your business growth
        </Typography>

        {alert.show && (
          <Alert severity={alert.severity} sx={{ mb: 3 }}>
            {alert.message}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} lg={4} key={plan.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: plan.isPopular ? 'scale(1.02)' : 'none',
                  '&:hover': {
                    boxShadow: 6,
                    transform: plan.isPopular ? 'scale(1.03)' : 'scale(1.01)'
                  },
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  border: plan.isPopular ? '2px solid #2196f3' : 'none'
                }}
              >
                {plan.isPopular && (
                  <Chip
                    icon={<StarIcon />}
                    label="Most Popular"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
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
                  
                  <List dense>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant={plan.isPopular ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Select Plan
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Subscribe to {selectedPlan?.name}
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box sx={{ pt: 2 }}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              {getStepContent(activeStep)}

              {paymentError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {paymentError}
                </Alert>
              )}

              {paymentSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Payment successful! Your subscription is now active.
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {activeStep > 0 && !paymentSuccess && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext} variant="contained" color="primary">
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Membership; 