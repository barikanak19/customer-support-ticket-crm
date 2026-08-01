# Customer Support Ticket CRM System

A simple Customer Support Ticket Management System built using **React**, **Node.js**, **Express**, and **MySQL**.

The application allows users to create support tickets, view all tickets, search and filter tickets, update ticket status, and maintain ticket notes.

---

# Tech Stack

## Frontend
- React (Vite)
- React Router
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MySQL

---

# Features

- Create Support Ticket
- View All Tickets
- Search Tickets
- Filter by Status
- View Ticket Details
- Update Ticket Status
- Add Ticket Notes
- REST API
- MySQL Database Integration

---

# Project Structure

```
Customer-Support-CRM/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── schema.sql
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=customer_support_crm
DB_PORT=3306
```

Start Backend

```bash
npm run dev
```

or

```bash
npm start
```

---

## Database Setup

Open MySQL Workbench.

Run the following file:

```
schema.sql
```

This will create:

- Database
- Tickets Table
- Notes Table

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on

```
http://localhost:3000
```

Backend

```
http://localhost:3000
```

---

# REST APIs

## Create Ticket

```
POST /api/tickets
```

## Get All Tickets

```
GET /api/tickets
```

Supports

- Search
- Status Filter

---

## Get Ticket Details

```
GET /api/tickets/:ticketId
```

---

## Update Ticket

```
PUT /api/tickets/:ticketId
```

Example Request

```json
{
    "status": "Closed",
    "note_text": "Issue resolved successfully."
}
```

---

# Ticket Status

- Open
- In Progress
- Closed

---

# Database Tables

## tickets

- id
- ticket_id
- customer_name
- customer_email
- subject
- description
- status
- created_at
- updated_at

---

## notes

- id
- ticket_id
- note_text
- created_at

---

# Future Improvements

- User Authentication
- Admin Login
- Email Notifications
- Dashboard Analytics
- File Attachments
- Role-Based Access

---

# Author

Kanak Bari

---

# License

This project is created for assessment purposes only.