// server.js
// Entry point for the Customer Support Ticket CRM backend

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./config/db");
const ticketRoutes = require("./routes/ticketRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- Routes -----------------
app.get("/", (req, res) => {
  res.json({ message: "Customer Support Ticket CRM API is running." });
});

app.use("/api/tickets", ticketRoutes);

// ----------------- Error Handling -----------------
app.use(notFound);
app.use(errorHandler);

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testConnection();
});
