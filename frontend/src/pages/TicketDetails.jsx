// pages/TicketDetails.jsx
// Shows full details of a single ticket, allows status update and adding notes

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTicketById, updateTicket } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const TicketDetails = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getTicketById(ticketId);
      setTicket(response.data.data);
      setStatus(response.data.data.status);
    } catch (err) {
      console.error(err);
      setError("Failed to load ticket details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      setUpdating(true);
      const response = await updateTicket(ticketId, {
        status,
        note_text: noteText,
      });
      setTicket(response.data.data);
      setNoteText("");
      setSuccessMsg("Ticket updated successfully.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update ticket.");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading ticket details...</p>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="container">
        <div className="message message-error">{error}</div>
        <Link to="/tickets" className="btn btn-secondary">
          Back to All Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="toolbar">
          <h2>Ticket Details</h2>
          <Link to="/tickets" className="btn btn-secondary">
            Back to All Tickets
          </Link>
        </div>

        <div className="detail-row">
          <span className="label">Ticket ID:</span> {ticket.ticket_id}
        </div>
        <div className="detail-row">
          <span className="label">Customer Name:</span> {ticket.customer_name}
        </div>
        <div className="detail-row">
          <span className="label">Email:</span> {ticket.customer_email}
        </div>
        <div className="detail-row">
          <span className="label">Subject:</span> {ticket.subject}
        </div>
        <div className="detail-row">
          <span className="label">Description:</span> {ticket.description}
        </div>
        <div className="detail-row">
          <span className="label">Status:</span> <StatusBadge status={ticket.status} />
        </div>
        <div className="detail-row">
          <span className="label">Created Date:</span> {formatDate(ticket.created_at)}
        </div>
      </div>

      <div className="card">
        <h3>Update Ticket</h3>

        {error && <div className="message message-error">{error}</div>}
        {successMsg && <div className="message message-success">{successMsg}</div>}

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="status">Update Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="note">Notes</label>
            <textarea
              id="note"
              rows="4"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note about this ticket (optional)"
            />
          </div>

          <button type="submit" className="btn" disabled={updating}>
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Notes History</h3>
        {ticket.notes && ticket.notes.length > 0 ? (
          ticket.notes.map((note) => (
            <div className="note-item" key={note.id}>
              <div>{note.note_text}</div>
              <div className="note-date">{formatDate(note.created_at)}</div>
            </div>
          ))
        ) : (
          <div className="empty-state">No notes added yet.</div>
        )}
      </div>
    </div>
  );
};

export default TicketDetails;
