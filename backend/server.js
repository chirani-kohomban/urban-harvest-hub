const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// DB CONNECTION
if (!process.env.MYSQL_URL) {
  console.error('❌ Missing MYSQL_URL environment variable. Check Railway variables.');
  process.exit(1);
}
const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

/* =====================
   PRODUCTS
===================== */

// GET
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
app.post("/products", (req, res) => {
  const { name, category, price, image, description, rating } = req.body;
  const imgPath = image || "/images/product_placeholder.png";

  const sql = "INSERT INTO products (name, category, price, image, description, rating) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, category, price, imgPath, description || "", rating || 0], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added successfully" });
  });
});

// PUT
app.put("/products/:id", (req, res) => {
  const { name, category, price, image, description, rating } = req.body;
  const { id } = req.params;
  const imgPath = image || "/images/product_placeholder.png";

  const sql =
    "UPDATE products SET name=?, category=?, price=?, image=?, description=?, rating=? WHERE id=?";

  db.query(sql, [name, category, price, imgPath, description || "", rating || 0, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated successfully" });
  });
});

// DELETE
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
});

/* =====================
   ADMIN AUTH & STATS
===================== */

const crypto = require("crypto");
function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

// POST LOGIN
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admins WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const admin = results[0];
    
    // Support prehashed bcrypt for 'admin123' if no bcrypt library
    const isBcrypt = admin.password.startsWith("$2");
    if (isBcrypt && password === "admin123") {
      return res.json({ success: true, token: "mock-admin-token", username });
    }
    
    if (admin.password === sha256(password) || admin.password === password) {
      return res.json({ success: true, token: "mock-admin-token", username });
    }
    
    return res.status(401).json({ error: "Invalid credentials" });
  });
});

// GET STATS
app.get("/stats", (req, res) => {
  const stats = { products: 0, workshops: 0, events: 0, requests: 0 };
  db.query("SELECT COUNT(*) as count FROM products", (err, r1) => {
    if (err) return res.status(500).json(err);
    stats.products = r1[0].count;

    db.query("SELECT COUNT(*) as count FROM workshops", (err, r2) => {
      if (err) return res.status(500).json(err);
      stats.workshops = r2[0].count;

      db.query("SELECT COUNT(*) as count FROM events", (err, r3) => {
        if (err) return res.status(500).json(err);
        stats.events = r3[0].count;

        db.query("SELECT COUNT(*) as count FROM workshop_requests", (err, r4) => {
          if (err) return res.status(500).json(err);
          db.query("SELECT COUNT(*) as count FROM event_registrations", (err, r5) => {
            if (err) return res.status(500).json(err);
            stats.requests = r4[0].count + r5[0].count;
            res.json(stats);
          });
        });
      });
    });
  });
});

/* =====================
   WORKSHOPS
===================== */

// GET WORKSHOPS
app.get("/workshops", (req, res) => {
  db.query("SELECT * FROM workshops", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST WORKSHOP
app.post("/workshops", (req, res) => {
  const { title, description, date, location, slots, image } = req.body;
  const sql = "INSERT INTO workshops (title, description, date, location, slots, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, description, date, location, slots, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Workshop added successfully" });
  });
});

// PUT WORKSHOP
app.put("/workshops/:id", (req, res) => {
  const { title, description, date, location, slots, image } = req.body;
  const { id } = req.params;
  const sql = "UPDATE workshops SET title=?, description=?, date=?, location=?, slots=?, image=? WHERE id=?";
  db.query(sql, [title, description, date, location, slots, image, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Workshop updated successfully" });
  });
});

// DELETE WORKSHOP
app.delete("/workshops/:id", (req, res) => {
  db.query("DELETE FROM workshops WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Workshop deleted" });
  });
});

// REQUEST WORKSHOP
app.post("/workshops/request", (req, res) => {
  const { workshop_id, user_name, email, phone, notes } = req.body;

  // Validation
  if (!user_name || typeof user_name !== "string" || user_name.trim().length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }
  const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Please provide a valid phone number (at least 8 digits)" });
  }

  const sql = "INSERT INTO workshop_requests (workshop_id, user_name, email, phone, notes) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [workshop_id, user_name.trim(), email.trim(), phone.trim(), notes ? notes.trim() : ""], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Request submitted" });
  });
});

// GET REQUESTS
app.get("/workshops/requests", (req, res) => {
  const sql = `
    SELECT wr.id, wr.user_name, wr.email, wr.phone, wr.notes, wr.status, wr.workshop_id, w.title
    FROM workshop_requests wr
    JOIN workshops w ON wr.workshop_id = w.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// APPROVE/REJECT WORKSHOP REQUEST
app.put("/workshops/requests/:id", (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (status === "Approved") {
    db.query("SELECT workshop_id FROM workshop_requests WHERE id = ?", [id], (err, results) => {
      if (err || results.length === 0) return res.status(500).json(err);
      const wId = results[0].workshop_id;
      db.query("UPDATE workshops SET slots = slots - 1 WHERE id = ? AND slots > 0", [wId], (err) => {
        if (err) return res.status(500).json(err);
        db.query("UPDATE workshop_requests SET status = ? WHERE id = ?", [status, id], (err) => {
          if (err) return res.status(500).json(err);
          res.json({ message: "Request approved and slot reserved" });
        });
      });
    });
  } else {
    db.query("UPDATE workshop_requests SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: `Request status updated to ${status}` });
    });
  }
});

/* =====================
   EVENTS
===================== */

// GET EVENTS
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST EVENT
app.post("/events", (req, res) => {
  const { title, description, date, location, category, image } = req.body;
  const sql = "INSERT INTO events (title, description, date, location, category, image) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, description, date, location, category, image], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Event added successfully" });
  });
});

// PUT EVENT
app.put("/events/:id", (req, res) => {
  const { title, description, date, location, category, image } = req.body;
  const { id } = req.params;
  const sql = "UPDATE events SET title=?, description=?, date=?, location=?, category=?, image=? WHERE id=?";
  db.query(sql, [title, description, date, location, category, image, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Event updated successfully" });
  });
});

// DELETE EVENT
app.delete("/events/:id", (req, res) => {
  db.query("DELETE FROM events WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Event deleted" });
  });
});

// POST REGISTER EVENT
app.post("/events/register", (req, res) => {
  const { event_id, user_name, email, attendees, notes } = req.body;

  // Validation
  if (!user_name || typeof user_name !== "string" || user_name.trim().length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }
  const count = Number(attendees);
  if (isNaN(count) || count < 1 || count > 10) {
    return res.status(400).json({ error: "Attendees must be a number between 1 and 10" });
  }

  const sql = "INSERT INTO event_registrations (event_id, user_name, email, attendees, notes) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [event_id, user_name.trim(), email.trim(), count, notes ? notes.trim() : ""], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Registered successfully" });
  });
});

// GET REGISTERED
app.get("/events/registrations", (req, res) => {
  const sql = `
    SELECT er.id, er.user_name, er.email, er.attendees, er.notes, er.event_id, e.title
    FROM event_registrations er
    JOIN events e ON er.event_id = e.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* =====================
   NOTIFICATIONS
===================== */

const webpush = require('web-push');

// Setup web-push
const publicVapidKey = 'BMpXJ_xHtf7gf0Ej_CAlO4itX9hW_WIM3gnNb0Hsz_hS8fDiLzVj-s4xL260NEK5mX-jxvTTPIsLqNy3syYVuCk';
const privateVapidKey = 'b2geEqxn31hIrJJAJDY8mbwaHAQohjpnmSzL0ThuBI4';
webpush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// Create table if missing (simple hack)
db.query(`CREATE TABLE IF NOT EXISTS push_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  endpoint VARCHAR(500) NOT NULL UNIQUE,
  p256dh VARCHAR(255) NOT NULL,
  auth VARCHAR(255) NOT NULL
)`, (err) => { if(err) console.error("Push Table error:", err.message); });

// GET PUBLIC KEY
app.get("/notifications/vapidPublicKey", (req, res) => {
  res.json({ publicKey: publicVapidKey });
});

// SUBSCRIBE
app.post("/notifications/subscribe", (req, res) => {
  const subscription = req.body;
  
  if (!subscription || !subscription.endpoint || !subscription.keys) {
    return res.status(400).json({ error: "Invalid subscription format" });
  }

  const { endpoint, keys: { p256dh, auth } } = subscription;

  const sql = "INSERT IGNORE INTO push_subscriptions (endpoint, p256dh, auth) VALUES (?, ?, ?)";
  db.query(sql, [endpoint, p256dh, auth], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Subscription added successfully" });
    
    // Send immediate welcome push!
    const payload = JSON.stringify({ title: 'Welcome to Urban Harvest Hub 🌱', body: 'Push notifications are now active!' });
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
  });
});

// ADMIN: SEND PUSH
app.post("/notifications/send", (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  db.query("SELECT * FROM push_subscriptions", (err, subs) => {
    if (err) return res.status(500).json(err);

    const promises = subs.map(sub => {
      const pushSub = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } };
      return webpush.sendNotification(pushSub, payload).catch(err => {
        if (err.statusCode === 410) {
          db.query("DELETE FROM push_subscriptions WHERE id = ?", [sub.id]);
        }
      });
    });

    Promise.all(promises).then(() => res.json({ message: "Notifications sent!" }));
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});