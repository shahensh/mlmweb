const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const { io } = require('../server');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's network (downlines)
router.get('/network', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path: 'network.downline',
      select: '-password',
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const downlines = user.network.downline || [];
    // Optionally, add more info (level, sales, etc.)
    const network = downlines.map(member => ({
      _id: member._id,
      name: member.profile?.firstName + ' ' + member.profile?.lastName,
      email: member.email,
      phone: member.profile?.phone,
      location: [member.profile?.city, member.profile?.country].filter(Boolean).join(', '),
      role: member.role,
      level: 1, // For now, only direct downlines
      downlineCount: member.network?.downline?.length || 0,
      salesCount: 0, // Placeholder, implement sales logic if needed
      profile: member.profile,
    }));
    res.json(network);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to load network data.' });
  }
});

// Get user earnings
router.get('/earnings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      balance: user.wallet?.balance || 0,
      total: user.wallet?.balance || 0, // For demo, use balance as total
      today: 120 // Mock value for today
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user commissions
router.get('/commissions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      total: user.commissions?.total || 0,
      today: user.commissions?.today || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user bonuses
router.get('/bonuses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      total: user.bonuses?.total || 0,
      today: user.bonuses?.today || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user team stats
router.get('/team-stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('network.downline');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const total = user.network.downline.length;
    const active = Math.floor(total * 0.85); // Mock: 85% active
    const newThisMonth = Math.floor(total * 0.15); // Mock: 15% new
    res.json({ total, active, newThisMonth });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user recent activity
router.get('/activity', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.activity || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (name, email, phone, address, etc.)
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { profile: updates } },
      { new: true }
    );
    io.emit(`user:${user._id}:profile`, { type: 'profile', user });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});

// Update notification controls
router.patch('/notifications', auth, async (req, res) => {
  try {
    const { notifications } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { notifications } },
      { new: true }
    );
    io.emit(`user:${user._id}:notifications`, { type: 'notifications', notifications });
    res.json(user.notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notifications.' });
  }
});

// Update password
router.patch('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    user.password = newPassword;
    await user.save();
    io.emit(`user:${user._id}:password`, { type: 'password', status: 'updated' });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update password.' });
  }
});

// Update payment details
router.patch('/payment', auth, async (req, res) => {
  try {
    const { payment } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { payment } },
      { new: true }
    );
    io.emit(`user:${user._id}:payment`, { type: 'payment', payment });
    res.json(user.payment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment details.' });
  }
});

module.exports = router; 