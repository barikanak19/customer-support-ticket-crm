// services/api.js
// Central place for all Axios API calls to the backend

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://customer-support-ticket-crm.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a new ticket
export const createTicket = (ticketData) => api.post("/tickets", ticketData);

// Get all tickets, optionally filtered by search keyword and status
export const getAllTickets = (params) => api.get("/tickets", { params });

// Get a single ticket by its ticket_id (e.g. TKT-0001)
export const getTicketById = (ticketId) => api.get(`/tickets/${ticketId}`);

// Update ticket status and/or add a note
export const updateTicket = (ticketId, updateData) => api.put(`/tickets/${ticketId}`, updateData);

export default api;
