require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mlmweb');
    console.log('Connected to MongoDB');

    // Create test user
    const testUser = new User({
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      profile: {
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890'
      }
    });

    await testUser.save();
    console.log('Test user created successfully');
    
    // Create test admin
    const testAdmin = new User({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '0987654321'
      }
    });

    await testAdmin.save();
    console.log('Test admin created successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestUser(); 