const { pool } = require("../config/db");

const createTicket = async ({ customer_name, customer_email, subject, description }) => {
  const [result] = await pool.query(
    `INSERT INTO tickets (ticket_id, customer_name, customer_email, subject, description, status)
     VALUES (?, ?, ?, ?, ?, 'Open')`,
    ["TEMP", customer_name, customer_email, subject, description]
  );

  const insertedId = result.insertId;
  const ticketId = `TKT-${String(insertedId).padStart(4, "0")}`;

  await pool.query(`UPDATE tickets SET ticket_id = ? WHERE id = ?`, [ticketId, insertedId]);

  return { id: insertedId, ticket_id: ticketId };
};

const getAllTickets = async ({ search, status }) => {
  let query = "SELECT * FROM tickets WHERE 1=1";
  const params = [];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (search) {
    query += ` AND (
      customer_name LIKE ? OR
      customer_email LIKE ? OR
      ticket_id LIKE ? OR
      subject LIKE ? OR
      description LIKE ?
    )`;
    const likeSearch = `%${search}%`;
    params.push(likeSearch, likeSearch, likeSearch, likeSearch, likeSearch);
  }

  query += " ORDER BY created_at DESC";

  const [rows] = await pool.query(query, params);
  return rows;
};

const getTicketByTicketId = async (ticketId) => {
  const [rows] = await pool.query("SELECT * FROM tickets WHERE ticket_id = ?", [ticketId]);
  return rows[0];
};

const updateTicketStatus = async (ticketId, status) => {
  const [result] = await pool.query(
    "UPDATE tickets SET status = ? WHERE ticket_id = ?",
    [status, ticketId]
  );
  return result.affectedRows;
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketByTicketId,
  updateTicketStatus,
};
