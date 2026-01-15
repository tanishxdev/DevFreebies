// src/services/users.js
import api from "./api";

// Get user profile
export const getUserProfile = async (id) => {
  const response = await api.get(`/users/profile/${id}`);
  return response;
};

// Get current user profile
export const getCurrentUserProfile = async () => {
  const response = await api.get("/users/me");
  return response;
};

// Update profile
export const updateProfile = async (userData) => {
  const response = await api.put("/users/profile", userData);
  return response;
};

// Toggle bookmark
export const toggleBookmark = async (resourceId) => {
  const response = await api.put(`/users/bookmark/${resourceId}`);
  return response;
};

// Get bookmarks
export const getBookmarks = async () => {
  const response = await api.get("/users/bookmarks");
  return response;
};
