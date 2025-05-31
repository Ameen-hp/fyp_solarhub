import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  // Fetch role and name from localStorage if available, else set to null/empty
  const storedRole = localStorage.getItem('role');
  const storedName = localStorage.getItem('name');

  const [role, setRole] = useState(storedRole || null); // Persist role
  const [name, setName] = useState(storedName || '');    // Persist name

  useEffect(() => {
    // Update localStorage when role or name changes
    if (role) {
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    } else {
      // Clear localStorage if logged out
      localStorage.removeItem('role');
      localStorage.removeItem('name');
    }
  }, [role, name]);

  const login = (userRole, userName) => {
    setRole(userRole);
    setName(userName); // Store the user's name if needed
  };

  const logout = () => {
    setRole(null);
    setName('');
  };

  return (
    <AuthContext.Provider value={{ role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the context
export const useAuth = () => useContext(AuthContext);
