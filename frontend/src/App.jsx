import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<AllTickets />} />
        <Route path="/tickets/create" element={<CreateTicket />} />
        <Route path="/tickets/:ticketId" element={<TicketDetails />} />
      </Routes>
    </>
  );
}

export default App;
