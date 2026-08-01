// middleware/errorHandler.js
// Centralized error handling middleware and 404 handler

// Handles requests to routes that do not exist
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
};

// Generic error handler - catches any error passed via next(error)
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = { notFound, errorHandler };
