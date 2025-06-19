import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeContextProvider>
          <AppRoutes />
        </ThemeContextProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
