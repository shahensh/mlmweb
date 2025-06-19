const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Get user's current subscription
router.get('/current', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active'
    });

    res.json(subscription || { status: 'none' });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ message: 'Error fetching subscription' });
  }
});

// Activate subscription after successful payment
router.post('/activate', auth, async (req, res) => {
  try {
    const { planId, paymentIntentId } = req.body;

    // Get plan details (in a real app, this would come from your database)
    const plans = {
      1: {
        name: 'Basic Plan',
        price: 49.99,
        durationMonths: 1,
        features: ['Basic Support', 'Up to 10 referrals', 'Basic Analytics']
      },
      2: {
        name: 'Premium Plan',
        price: 99.99,
        durationMonths: 3,
        features: ['Priority Support', 'Unlimited referrals', 'Advanced Analytics', 'Priority Processing']
      }
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    // Calculate end date based on plan duration
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationMonths);

    // Create new subscription
    const subscription = new Subscription({
      userId: req.user.id,
      planId,
      planName: plan.name,
      price: plan.price,
      paymentIntentId,
      features: plan.features,
      endDate
    });

    await subscription.save();

    // Update user's membership status
    await User.findByIdAndUpdate(req.user.id, {
      membershipStatus: 'active',
      currentPlan: plan.name
    });

    res.json({
      message: 'Subscription activated successfully',
      subscription
    });
  } catch (error) {
    console.error('Error activating subscription:', error);
    res.status(500).json({ message: 'Error activating subscription' });
  }
});

// Cancel subscription
router.post('/cancel', auth, async (req, res) => {
  try {
    const { reason } = req.body;

    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (!subscription) {
      return res.status(404).json({ message: 'No active subscription found' });
    }

    subscription.status = 'cancelled';
    subscription.cancelReason = reason;
    await subscription.save();

    // Update user's membership status
    await User.findByIdAndUpdate(req.user.id, {
      membershipStatus: 'inactive',
      currentPlan: null
    });

    res.json({
      message: 'Subscription cancelled successfully',
      subscription
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Error cancelling subscription' });
  }
});

// Get subscription history
router.get('/history', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    res.status(500).json({ message: 'Error fetching subscription history' });
  }
});

module.exports = router; 