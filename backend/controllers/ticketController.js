// controllers/ticketController.js
// Handles the request/response logic for ticket-related routes

const ticketModel = require("../models/ticketModel");
const noteModel = require("../models/noteModel");

const VALID_STATUSES = ["Open", "In Progress", "Closed"];

// @desc   Create a new ticket
// @route  POST /api/tickets
const createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    // Basic validation
    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "customer_name, customer_email, subject and description are required.",
      });
    }

    const newTicket = await ticketModel.createTicket({
      customer_name,
      customer_email,
      subject,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully.",
      data: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({ success: false, message: "Server error while creating ticket." });
  }
};

// @desc   Get all tickets (supports search and status filter)
// @route  GET /api/tickets?search=&status=
const getAllTickets = async (req, res) => {
  try {
    const { search, status } = req.query;

    const tickets = await ticketModel.getAllTickets({ search, status });

    return res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    return res.status(500).json({ success: false, message: "Server error while fetching tickets." });
  }
};

// @desc   Get single ticket details along with its notes
// @route  GET /api/tickets/:ticketId
const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await ticketModel.getTicketByTicketId(ticketId);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    const notes = await noteModel.getNotesByTicketInternalId(ticket.id);

    return res.status(200).json({
      success: true,
      data: { ...ticket, notes },
    });
  } catch (error) {
    console.error("Error fetching ticket:", error.message);
    return res.status(500).json({ success: false, message: "Server error while fetching ticket." });
  }
};

// @desc   Update ticket status and/or add a note
// @route  PUT /api/tickets/:ticketId
const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, note_text } = req.body;

    const ticket = await ticketModel.getTicketByTicketId(ticketId);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    // Update status if provided
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        });
      }
      await ticketModel.updateTicketStatus(ticketId, status);
    }

    // Add a note if provided
    if (note_text && note_text.trim() !== "") {
      await noteModel.addNote(ticket.id, note_text.trim());
    }

    // Return the updated ticket with notes
    const updatedTicket = await ticketModel.getTicketByTicketId(ticketId);
    const notes = await noteModel.getNotesByTicketInternalId(updatedTicket.id);

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully.",
      data: { ...updatedTicket, notes },
    });
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    return res.status(500).json({ success: false, message: "Server error while updating ticket." });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
};
