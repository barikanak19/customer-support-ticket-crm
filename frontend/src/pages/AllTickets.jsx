import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTickets } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTickets();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, status]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllTickets({ search, status });
      setTickets(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Search by name, email, ticket ID, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ minWidth: "280px" }}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <Link to="/tickets/create" className="btn btn-success">
            + Create Ticket
          </Link>
        </div>

        {error && <div className="message message-error">{error}</div>}

        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="empty-state">No tickets found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Customer Name</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.customer_name}</td>
                  <td>{ticket.subject}</td>
                  <td>
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td>{formatDate(ticket.created_at)}</td>
                  <td>
                    <Link to={`/tickets/${ticket.ticket_id}`} className="btn">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
