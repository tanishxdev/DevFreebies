// src/services/auth.js
import api from "./api";

// Register user
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
