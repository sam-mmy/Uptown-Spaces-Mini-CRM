import api from "./api";

export const createLead = (data) => {
  return api.post("/leads", data);
};

export const getLeads = (params) => {
  return api.get("/leads", { params });
};

export const getLeadById = (id) => {
  return api.get(`/leads/${id}`);
};

export const updateLeadStatus = (id, status) => {
  return api.patch(`/leads/${id}/status`, { status });
};