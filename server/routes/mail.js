const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Mail = require('../models/Mail');
const User = require('../models/User');
const { io } = require('../server');

// Send mail
router.post('/send', auth, async (req, res) => {
  try {
    const { recipient, subject, content, attachments } = req.body;
    if (!recipient || !subject || !content) {
      return res.status(400).json({ message: 'Recipient, subject, and content are required.' });
    }
    const mail = await Mail.create({
      sender: req.user.userId,
      recipient,
      subject,
      content,
      attachments: attachments || [],
      status: 'inbox',
      read: false,
      starred: false,
    });
    // Also create a copy in sender's sent folder
    await Mail.create({
      sender: req.user.userId,
      recipient,
      subject,
      content,
      attachments: attachments || [],
      status: 'sent',
      read: true,
      starred: false,
    });
    // Emit real-time event to recipient
    io.emit(`mail:${recipient}`, { type: 'new', mail });
    res.status(201).json(mail);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send mail.' });
  }
});

// Fetch inbox
router.get('/inbox', auth, async (req, res) => {
  try {
    const inbox = await Mail.find({ recipient: req.user.userId, status: 'inbox' }).sort({ createdAt: -1 });
    res.json(inbox);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inbox.' });
  }
});

// Fetch sent
router.get('/sent', auth, async (req, res) => {
  try {
    const sent = await Mail.find({ sender: req.user.userId, status: 'sent' }).sort({ createdAt: -1 });
    res.json(sent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sent mail.' });
  }
});

// Fetch starred
router.get('/starred', auth, async (req, res) => {
  try {
    const starred = await Mail.find({ recipient: req.user.userId, starred: true, status: { $ne: 'trash' } }).sort({ createdAt: -1 });
    res.json(starred);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch starred mail.' });
  }
});

// Fetch trash
router.get('/trash', auth, async (req, res) => {
  try {
    const trash = await Mail.find({ recipient: req.user.userId, status: 'trash' }).sort({ createdAt: -1 });
    res.json(trash);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trash.' });
  }
});

// Mark as read/unread
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const { read } = req.body;
    const mail = await Mail.findByIdAndUpdate(req.params.id, { read }, { new: true });
    io.emit(`mail:${mail.recipient}`, { type: 'update', mail });
    res.json(mail);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update read status.' });
  }
});

// Star/unstar
router.patch('/:id/star', auth, async (req, res) => {
  try {
    const { starred } = req.body;
    const mail = await Mail.findByIdAndUpdate(req.params.id, { starred }, { new: true });
    io.emit(`mail:${mail.recipient}`, { type: 'update', mail });
    res.json(mail);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update star status.' });
  }
});

// Move to trash/restore
router.patch('/:id/trash', auth, async (req, res) => {
  try {
    const { status } = req.body; // 'trash' or 'inbox'
    const mail = await Mail.findByIdAndUpdate(req.params.id, { status }, { new: true });
    io.emit(`mail:${mail.recipient}`, { type: 'update', mail });
    res.json(mail);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update mail status.' });
  }
});

module.exports = router; 