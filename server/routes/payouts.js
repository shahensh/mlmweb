const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Payout = require('../models/Payout');
const User = require('../models/User');
const { io } = require('../server');

// Middleware to check admin
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (user && user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden: Admins only' });
};

// User submits a withdrawal request
router.post('/request', auth, async (req, res) => {
  try {
    const { amount, method, details } = req.body;
    if (!amount || !method) return res.status(400).json({ message: 'Amount and method are required.' });
    const payout = await Payout.create({
      user: req.user.userId,
      amount,
      method,
      details: details || {},
      status: 'requested',
    });
    // Emit real-time event to the user (and optionally admin)
    io.emit(`payout:${req.user.userId}`, { type: 'created', payout });
    io.emit('payout:new', { payout }); // For admin dashboard
    res.status(201).json(payout);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit payout request.' });
  }
});

// User fetches their payout requests
router.get('/', auth, async (req, res) => {
  try {
    const payouts = await Payout.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payouts.' });
  }
});

// Admin updates payout status
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'paid'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }
    const payout = await Payout.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!payout) return res.status(404).json({ message: 'Payout not found.' });
    // Emit real-time event to the user
    io.emit(`payout:${payout.user}`, { type: 'status', payout });
    res.json(payout);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payout status.' });
  }
});

module.exports = router; 