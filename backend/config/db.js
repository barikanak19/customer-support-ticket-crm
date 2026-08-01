// config/db.js
// Sets up and exports a MySQL connection pool using mysql2

const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool (recommended over single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "customer_support_crm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Simple helper to test the DB connection on server start
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Database connected successfully.");
    connection.release();
  } catch (error) {
    console.error("Failed to connect to MySQL Database:", error.message);
  }
};

module.exports = { pool, testConnection };
