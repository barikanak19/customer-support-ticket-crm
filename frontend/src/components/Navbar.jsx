import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/tickets" className={({ isActive }) => (isActive ? "active" : "")}>
        All Tickets
      </NavLink>
      <NavLink to="/tickets/create" className={({ isActive }) => (isActive ? "active" : "")}>
        Create Ticket
      </NavLink>
    </nav>
  );
};

export default Navbar;
