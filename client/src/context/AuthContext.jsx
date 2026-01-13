import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Load stored token on refresh ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (token && userEmail) {
      setIsAuthenticated(true);
      setUser({ email: userEmail, name: userName });
    }
    setLoading(false);
  }, []);

  // --- Handle Login ---
  const login = async (email, password) => {
    try {
      // 1️⃣ Call backend API
      const res = await loginUser(email, password);

      // 2️⃣ Get response data
      const { token, name, email: userEmail } = res.data;

      // 3️⃣ Store token & user info
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", name);

      // 4️⃣ Update state
      setIsAuthenticated(true);
      setUser({ email: userEmail, name });

      // 5️⃣ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      throw err;
    }
  };

  // --- Handle Register ---
  const register = async (name, email, password) => {
    try {
      // 1️⃣ Call backend API
      const res = await registerUser(name, email, password);

      // 2️⃣ Get response data
      const { token, name: userName, email: userEmail } = res.data;

      // 3️⃣ Store token & user info
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userName", userName);

      // 4️⃣ Update state
      setIsAuthenticated(true);
      setUser({ email: userEmail, name: userName });

      // 5️⃣ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      throw err;
    }
  };

  // --- Logout ---
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
