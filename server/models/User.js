const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  wallet: {
    balance: {
      type: Number,
      default: 0
    },
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }]
  },
  commissions: {
    total: { type: Number, default: 0 },
    today: { type: Number, default: 0 }
  },
  bonuses: {
    total: { type: Number, default: 0 },
    today: { type: Number, default: 0 }
  },
  activity: [
    {
      type: { type: String }, // 'earning', 'referral', 'bonus', 'team', etc.
      message: String,
      time: String
    }
  ],
  network: {
    upline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    downline: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique userId before saving if not present
userSchema.pre('save', async function(next) {
  if (!this.userId) {
    // Generate a unique userId (e.g., 'USR' + timestamp + random 3 digits)
    this.userId = 'USR' + Date.now() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 