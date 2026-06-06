const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  user: process.env.DB_USER || process.env.MYSQLUSER || "root",
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "",
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || "urban_harvest_hub"
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
  `INSERT INTO admins (username, password) SELECT 'admin', 'admin123' WHERE NOT EXISTS (SELECT * FROM admins WHERE username='admin')`,
  
  // Seed Products
  `INSERT INTO products (name, category, price, image, description, rating) 
   SELECT 'Organic Tomatoes', 'Vegetables', 4.99, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Freshly picked organic tomatoes from local farms.', 4.8
   FROM DUAL WHERE NOT EXISTS (SELECT * FROM products WHERE name='Organic Tomatoes')`,
  
  `INSERT INTO products (name, category, price, image, description, rating) 
   SELECT 'Fresh Basil Bundle', 'Herbs', 2.49, 'https://images.unsplash.com/photo-1618164420084-29ec3ce4970f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Aromatic fresh basil perfect for pesto.', 4.9
   FROM DUAL WHERE NOT EXISTS (SELECT * FROM products WHERE name='Fresh Basil Bundle')`,

  // Seed Workshops
  `INSERT INTO workshops (title, description, date, location, slots, image) 
   SELECT 'Balcony Gardening 101', 'Learn how to maximize your small apartment balcony to grow fresh vegetables.', '2026-07-15 10:00:00', 'Downtown Center', 15, 'https://images.unsplash.com/photo-1416879598555-46747209e99a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
   FROM DUAL WHERE NOT EXISTS (SELECT * FROM workshops WHERE title='Balcony Gardening 101')`,
   
  // Seed Events
  `INSERT INTO events (title, description, date, location, category, image) 
   SELECT 'Summer Harvest Festival', 'Join the community to celebrate this seasons bountiful harvest.', '2026-08-20 14:00:00', 'City Park', 'Festival', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
   FROM DUAL WHERE NOT EXISTS (SELECT * FROM events WHERE title='Summer Harvest Festival')`
];

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to DB during init:", err.message);
    return;
  }
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
