const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "urban_harvest_hub"
});

const queries = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    rating DECIMAL(3,1) DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS workshops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    slots INT NOT NULL,
    image VARCHAR(255)
  )`,
  `CREATE TABLE IF NOT EXISTS workshop_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workshop_id INT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Pending'
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255)
  )`,
  `CREATE TABLE IF NOT EXISTS event_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    attendees INT NOT NULL,
    notes TEXT
  )`,
  `INSERT INTO admins (username, password) SELECT 'admin', 'admin123' WHERE NOT EXISTS (SELECT * FROM admins WHERE username='admin')`
];

db.connect((err) => {
  if (err) throw err;
  console.log("Connected. Initializing tables...");
  
  let completed = 0;
  queries.forEach(q => {
    db.query(q, (err) => {
      if (err) console.error("Error creating table: ", err);
      completed++;
      if (completed === queries.length) {
        console.log("Database initialized successfully!");
        db.end();
      }
    });
  });
});
