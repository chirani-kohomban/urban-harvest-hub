# Urban Harvest Hub

Urban Harvest Hub is a full-stack Progressive Web Application (PWA) designed to support urban farming and eco-friendly living. It features an integrated storefront for eco-products, workshop registrations, event management, and push notifications.

## Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Node.js, Express
*   **Database:** MySQL

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   Node.js installed on your machine
*   MySQL Server running locally

### Database Setup

1. Open your MySQL client (e.g., MySQL Workbench or phpMyAdmin).
2. Execute the commands found in `schema.sql` located in the root directory. This will create the `urban_harvest_hub` database and set up the required tables.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (if it doesn't exist) and configure your database credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=urban_harvest_hub
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The application will be available at `http://localhost:5173`.
