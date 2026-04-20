import api from "./api";


export const getNotesByLeadId = (leadId) => {

  return api.get(`/leads/notes/${leadId}`);

};


export const addNote = (data) => {

  return api.post(`/leads/notes/${data.lead_id}`, data);

};