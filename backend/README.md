# Customer Support Ticket CRM - Backend

Node.js + Express + MySQL REST API for managing customer support tickets.

## Folder Structure

```
backend/
  config/
    db.js               MySQL connection pool
  controllers/
    ticketController.js Request handlers / business logic
  models/
    ticketModel.js       Ticket queries
    noteModel.js          Note queries
  routes/
    ticketRoutes.js      API route definitions
  middleware/
    errorHandler.js       404 + error handler
  server.js               App entry point
  schema.sql              Database schema (run manually)
  .env.example             Environment variable template
```

## Setup Instructions

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and update the values to match your MySQL setup:

```bash
cp .env.example .env
```

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=customer_support_crm
```

### 3. Create the database and tables

This project does NOT auto-create tables. Run the schema file manually in MySQL:

```bash
mysql -u root -p < schema.sql
```

This will create the `customer_support_crm` database along with the `tickets` and `notes` tables.

### 4. Start the server

```bash
# Production
npm start

# Development (auto-restart with nodemon)
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint              | Description                          |
|--------|------------------------|---------------------------------------|
| POST   | /api/tickets            | Create a new ticket                  |
| GET    | /api/tickets             | Get all tickets (supports `?search=` and `?status=`) |
| GET    | /api/tickets/:ticketId   | Get a single ticket with its notes  |
| PUT    | /api/tickets/:ticketId   | Update ticket status and/or add a note |

### Example Request Bodies

**Create Ticket** - `POST /api/tickets`
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Unable to login",
  "description": "I am getting an error when trying to login to my account."
}
```

**Update Ticket** - `PUT /api/tickets/TKT-0001`
```json
{
  "status": "In Progress",
  "note_text": "Reached out to customer for more details."
}
```
