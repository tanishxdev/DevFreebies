import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/auth";

/**
 * Authentication Context for managing user state and authentication
 * Handles login, register, logout, and token management
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user data on mount if token exists
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Load current user data
  const loadUser = async () => {
    try {
      const data = await authService.getCurrentUser();
      setUser(data.user);
    } catch (error) {
      console.error("Load user error:", error);
      // If token is invalid, clear it
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success("Account created successfully!");
      navigate("/");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);

      toast.success("Welcome back!");
      navigate("/");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Update user data
  const updateUser = (userData) => {
    setUser((prevUser) => ({ ...prevUser, ...userData }));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
