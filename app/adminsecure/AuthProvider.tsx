import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // Start with null
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start with false

  useEffect(() => {
    // This effect runs only on the client side
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); // User is authenticated if token exists
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store the token in localStorage
    setIsAuthenticated(true); // User is authenticated
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // User is no longer authenticated
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
