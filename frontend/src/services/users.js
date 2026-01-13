import api from "./api";

/**
 * Users service
 * Handles all user-related API calls
 */

// Get user profile by ID
export const getUserProfile = async (id) => {
  const response = await api.get(`/users/profile/${id}`);
  return response;
};

// Get current user's profile
export const getMyProfile = async () => {
  const response = await api.get("/users/me");
  return response;
};

// Update user profile
export const updateProfile = async (userData) => {
  const response = await api.put("/users/profile", userData);
  return response;
};

// Toggle bookmark on a resource
export const toggleBookmark = async (resourceId) => {
  const response = await api.put(`/users/bookmark/${resourceId}`);
  return response;
};

// Get user's bookmarks
export const getBookmarks = async () => {
  const response = await api.get("/users/bookmarks");
  return response;
};
