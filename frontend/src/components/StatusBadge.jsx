// components/StatusBadge.jsx
// Displays a colored badge based on ticket status

import React from "react";

const StatusBadge = ({ status }) => {
  // Convert "In Progress" -> "In-Progress" to match CSS class naming
  const className = `status-badge status-${status.replace(/\s+/g, "-")}`;

  return <span className={className}>{status}</span>;
};

export default StatusBadge;
