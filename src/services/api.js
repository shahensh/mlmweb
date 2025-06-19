import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and network errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (!error.response) {
      // Network error
      console.error('Network error:', error);
      // You might want to show a notification to the user here
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email, password, role) => {
    // Mock login for both user and admin
    if (
      email === 'shaik.test@gmail.com' &&
      password === '12345678' &&
      (role === 'user' || role === 'admin')
    ) {
      const mockUser = {
        id: role === 'admin' ? 'admin-demo' : 'user-demo',
        email,
        role,
        profile: { firstName: role === 'admin' ? 'Admin' : 'User', lastName: 'Demo' }
      };
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { token: 'demo-token', user: mockUser };
    }
    // All other credentials fail
    const error = new Error('Invalid credentials');
    error.response = { data: { message: 'Invalid credentials' } };
    throw error;
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/profile');
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const users = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  getNetwork: async () => {
    const response = await api.get('/users/network');
    return response.data;
  },

  getDownlines: async () => {
    const response = await api.get('/users/downlines');
    return response.data;
  },

  getReferrals: async () => {
    const response = await api.get('/users/referrals');
    return response.data;
  },

  getReferralCode: async () => {
    const response = await api.get('/users/referral-code');
    return response.data;
  },
};

export const wallet = {
  getBalance: async () => {
    const response = await api.get('/users/wallet');
    return response.data;
  },

  getTransactions: async () => {
    const response = await api.get('/users/wallet/transactions');
    return response.data;
  },
};

export const products = {
  getAll: async () => {
    // Return mock products for frontend-only demo
    return [
      {
        _id: '1',
        name: 'MLM Starter Kit',
        description: 'Everything you need to start your MLM journey.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
        category: 'starter',
        isActive: true,
      },
      {
        _id: '2',
        name: 'Pro Marketing Tools',
        description: 'Advanced tools for serious networkers.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        category: 'tools',
        isActive: true,
      },
      {
        _id: '3',
        name: 'Team Training Bundle',
        description: 'Train your team with these resources.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        category: 'training',
        isActive: true,
      },
      {
        _id: '4',
        name: 'VIP Event Ticket',
        description: 'Access to exclusive MLM events.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
        category: 'events',
        isActive: true,
      },
      {
        _id: '5',
        name: 'Personal Coaching Session',
        description: 'One-on-one coaching with an MLM expert.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
        category: 'coaching',
        isActive: true,
      },
    ];
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const payouts = {
  getAll: async () => {
    const response = await api.get('/payouts');
    return response.data;
  },
  request: async (data) => {
    const response = await api.post('/payouts/request', data);
    return response.data;
  },
};

export default api; 