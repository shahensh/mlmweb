import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/api';

// Create the context with a default value
const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true
});

// Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          try {
            // Only verify token if we have both token and stored user
            const user = await auth.getCurrentUser();
            setCurrentUser(user);
          } catch (error) {
            console.error('Token verification failed:', error);
            auth.logout();
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      setLoading(true);
      const response = await auth.login(email, password, role);
      setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await auth.register(userData);
      setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    auth.logout();
    setCurrentUser(null);
    setLoading(false);
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!currentUser || !!localStorage.getItem('token')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 