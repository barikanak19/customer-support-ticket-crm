// pages/Home.jsx
// Simple landing page with links to main sections

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to the Customer Support CRM</h2>
        <p>
          Use this system to create and manage customer support tickets. You can view all
          tickets, search and filter them, and update their status as they are resolved.
        </p>
        <div className="toolbar-left">
          <Link to="/tickets" className="btn">
            View All Tickets
          </Link>
          <Link to="/tickets/create" className="btn btn-success">
            Create New Ticket
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
