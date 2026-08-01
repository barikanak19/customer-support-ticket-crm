// models/noteModel.js
// Contains all direct database queries related to ticket notes

const { pool } = require("../config/db");

// Add a note for a ticket using the internal numeric ticket id
const addNote = async (ticketInternalId, noteText) => {
  const [result] = await pool.query(
    "INSERT INTO notes (ticket_id, note_text) VALUES (?, ?)",
    [ticketInternalId, noteText]
  );
  return result.insertId;
};

// Get all notes for a ticket using the internal numeric ticket id
const getNotesByTicketInternalId = async (ticketInternalId) => {
  const [rows] = await pool.query(
    "SELECT * FROM notes WHERE ticket_id = ? ORDER BY created_at DESC",
    [ticketInternalId]
  );
  return rows;
};

module.exports = {
  addNote,
  getNotesByTicketInternalId,
};
