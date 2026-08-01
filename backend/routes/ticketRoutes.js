const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} = require("../controllers/ticketController");

router.post("/", createTicket);
router.get("/", getAllTickets);

router.get("/:ticketId", getTicketById);
router.put("/:ticketId", updateTicket);

module.exports = router;
