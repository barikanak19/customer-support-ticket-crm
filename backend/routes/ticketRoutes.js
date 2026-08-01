// routes/ticketRoutes.js
// Defines all API endpoints related to tickets

const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} = require("../controllers/ticketController");

// POST /api/tickets - Create a new ticket
router.post("/", createTicket);

// GET /api/tickets - Get all tickets (supports ?search= and ?status=)
router.get("/", getAllTickets);

// GET /api/tickets/:ticketId - Get single ticket details
router.get("/:ticketId", getTicketById);

// PUT /api/tickets/:ticketId - Update ticket status / add note
router.put("/:ticketId", updateTicket);

module.exports = router;
