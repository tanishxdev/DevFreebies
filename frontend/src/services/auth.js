import api from "./api";

/**
 * Authentication service
 * Handles all authentication-related API calls
 */

// Register new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response;
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
