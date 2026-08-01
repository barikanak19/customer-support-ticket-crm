-- ==========================================================
-- Customer Support Ticket CRM - Database Schema
-- ==========================================================
-- Run this file manually in MySQL before starting the server.
-- Example:
--   mysql -u root -p < schema.sql
-- ==========================================================

-- Create the database (uncomment if it does not exist yet)
CREATE DATABASE IF NOT EXISTS customer_support_crm;

USE customer_support_crm;

-- --------------------------------------------------------
-- Table: tickets
-- Stores the main ticket information
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(20) NOT NULL UNIQUE,        -- Display ID, e.g. TKT-0001
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Open', 'In Progress', 'Closed') NOT NULL DEFAULT 'Open',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table: notes
-- Stores support notes/comments linked to a ticket
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,                       -- Foreign key -> tickets.id
    note_text TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notes_ticket
        FOREIGN KEY (ticket_id) REFERENCES tickets(id)
        ON DELETE CASCADE
);

-- --------------------------------------------------------
-- Helpful indexes for search performance
-- --------------------------------------------------------
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_customer_name ON tickets(customer_name);
CREATE INDEX idx_notes_ticket_id ON notes(ticket_id);
