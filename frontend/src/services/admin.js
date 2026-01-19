// src/services/admin.js
import api from "./api";

// Get pending resources
export const getPendingResources = async () => {
  return api.get("/admin/resources/pending");
};

// Approve resource
export const approveResource = async (id) => {
  return api.post(`/admin/resources/${id}/approve`);
};

// Reject resource
export const rejectResource = async (id) => {
  return api.post(`/admin/resources/${id}/reject`);
};

// Feature resource
export const featureResource = async (id) => {
  return api.post(`/admin/resources/${id}/feature`);
};

// Unfeature resource
export const unfeatureResource = async (id) => {
  return api.post(`/admin/resources/${id}/unfeature`);
};
