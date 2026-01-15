// src/services/admin.js
import api from "./api";

// Get pending resources
export const getPendingResources = async () => {
  const response = await api.get("/admin/resources/pending");
  return response;
};

// Approve resource
export const approveResource = async (id) => {
  const response = await api.put(`/admin/resources/${id}/approve`);
  return response;
};

// Reject resource
export const rejectResource = async (id) => {
  const response = await api.put(`/admin/resources/${id}/reject`);
  return response;
};

// Feature resource
export const featureResource = async (id) => {
  const response = await api.put(`/admin/resources/${id}/feature`);
  return response;
};

// Unfeature resource
export const unfeatureResource = async (id) => {
  const response = await api.put(`/admin/resources/${id}/unfeature`);
  return response;
};
