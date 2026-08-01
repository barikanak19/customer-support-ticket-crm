import React from "react";

const StatusBadge = ({ status }) => {
  const className = `status-badge status-${status.replace(/\s+/g, "-")}`;

  return <span className={className}>{status}</span>;
};

export default StatusBadge;
