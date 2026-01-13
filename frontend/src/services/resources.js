import api from "./api";

/**
 * Resources service
 * Handles all resource-related API calls
 */

// Get all resources with filters
export const getResources = async (params = {}) => {
  const response = await api.get("/resources", { params });
  return response;
};

// Get single resource by ID
export const getResource = async (id) => {
  const response = await api.get(`/resources/${id}`);
  return response;
};

// Create new resource
export const createResource = async (resourceData) => {
  const response = await api.post("/resources", resourceData);
  return response;
};

// Update resource
export const updateResource = async (id, resourceData) => {
  const response = await api.put(`/resources/${id}`, resourceData);
  return response;
};

// Delete resource
export const deleteResource = async (id) => {
  const response = await api.delete(`/resources/${id}`);
  return response;
};

// Upvote/downvote resource
export const upvoteResource = async (id) => {
  const response = await api.put(`/resources/${id}/upvote`);
  return response;
};

// Get all categories with counts
export const getCategories = async () => {
  const response = await api.get("/resources/categories");
  return response;
};
