# MLM Web Backend

This is the backend server for the MLM Web application.

## Setup Instructions

1. Install MongoDB on your system if you haven't already
2. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mlmweb
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```
3. Install dependencies:
   ```bash
   cd server
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Login user
- POST `/api/auth/register` - Register new user

### User
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- GET `/api/users/wallet` - Get wallet balance
- GET `/api/users/wallet/transactions` - Get wallet transactions

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

### Settings
- GET `/api/settings` - Get system settings
- PUT `/api/settings` - Update system settings 