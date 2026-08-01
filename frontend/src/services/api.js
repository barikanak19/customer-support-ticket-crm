import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://customer-support-ticket-crm.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTicket = (ticketData) => api.post("/tickets", ticketData);

export const getAllTickets = (params) => api.get("/tickets", { params });

export const getTicketById = (ticketId) => api.get(`/tickets/${ticketId}`);

export const updateTicket = (ticketId, updateData) => api.put(`/tickets/${ticketId}`, updateData);

export default api;
