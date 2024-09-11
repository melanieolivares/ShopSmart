import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/authentication/check-auth`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const delay = 1200;
    const start = Date.now();

    const fetchAuth = async () => {
      await checkAuth();
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, delay - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    fetchAuth();

    const intervalId = setInterval(() => {
      checkAuth();
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{ setIsAuthenticated, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
