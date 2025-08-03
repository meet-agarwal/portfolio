import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  // If authentication is not required, render children directly
  if (!requireAuth) {
    return children;
  }

  // If user is authenticated, render children
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, show login
  return (
    <Login 
      onLoginSuccess={() => setShowLogin(false)} 
    />
  );
};

export default ProtectedRoute; 