-- SQL Script to expand Urban Harvest Hub database

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS workshops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  date DATE,
  location VARCHAR(150),
  slots INT NOT NULL,
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  date DATE,
  location VARCHAR(150),
  category VARCHAR(50),
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS workshop_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  workshop_id INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  attendees INT DEFAULT 1,
  notes TEXT,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
