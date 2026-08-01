const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = { notFound, errorHandler };
