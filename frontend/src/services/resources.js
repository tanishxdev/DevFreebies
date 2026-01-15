// src/services/resources.js
import api from "./api";

// Get all resources with filters
export const getResources = async (params = {}) => {
  const response = await api.get("/resources", { params });
  return response;
};

// Get single resource
export const getResource = async (id) => {
  const response = await api.get(`/resources/${id}`);
  return response;
};

// Create resource
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

// Upvote resource
export const upvoteResource = async (id) => {
  const response = await api.put(`/resources/${id}/upvote`);
  return response;
};

// Get categories
export const getCategories = async () => {
  const response = await api.get("/resources/categories");
  return response;
};

// Get user's resource stats
export const getUserResourceStats = async () => {
  const response = await api.get("/users/me");
  return {
    submittedCount: response.data?.submittedResources?.length || 0,
  };
};
