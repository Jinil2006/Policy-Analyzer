import React, { createContext, useState, useContext } from 'react';

// --- Auth Context: manages JWT login/logout state with localStorage persistence ---

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || '');

  // Login: store JWT token + user info
  const login = (name, email, token) => {
    setIsLoggedIn(true);
    setUserName(name || 'User');
    setUserEmail(email || '');
    setAuthToken(token || '');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name || 'User');
    localStorage.setItem('userEmail', email || '');
    localStorage.setItem('authToken', token || '');
  };

  // Logout: clear everything
  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setAuthToken('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userEmail, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
