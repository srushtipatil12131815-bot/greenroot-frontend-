import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("greenroot_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("greenroot_user");
    const savedToken = localStorage.getItem("greenroot_token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("greenroot_user", JSON.stringify(userData));
    localStorage.setItem("greenroot_token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("greenroot_user");
    localStorage.removeItem("greenroot_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
