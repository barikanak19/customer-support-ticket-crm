const { pool } = require("../config/db");

const addNote = async (ticketInternalId, noteText) => {
  const [result] = await pool.query(
    "INSERT INTO notes (ticket_id, note_text) VALUES (?, ?)",
    [ticketInternalId, noteText]
  );
  return result.insertId;
};

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
