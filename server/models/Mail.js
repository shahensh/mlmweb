const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['inbox', 'sent', 'starred', 'trash'],
    default: 'inbox'
  },
  read: {
    type: Boolean,
    default: false
  },
  starred: {
    type: Boolean,
    default: false
  },
  attachments: [{
    filename: String,
    url: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Mail', mailSchema); 