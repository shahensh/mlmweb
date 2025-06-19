const mongoose = require('mongoose');

const payoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['requested', 'approved', 'rejected', 'paid'],
    default: 'requested'
  },
  details: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('Payout', payoutSchema); 