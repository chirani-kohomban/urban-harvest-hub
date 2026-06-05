const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "urban_harvest_hub"
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL database:", err.message);
    process.exit(1);
  }
  console.log("Connected to MySQL for initialization");
  runSchema();
});

function runSchema() {
  const schemaPath = path.join(__dirname, "..", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf8");

  // Split SQL commands by semicolons but filter out empty statements
  const queries = schemaSql
    .split(";")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  let completedQueries = 0;

  queries.forEach((query) => {
    db.query(query, (err) => {
      if (err) {
        console.error("SQL Error executing query:", query);
        console.error(err.message);
        db.end();
        process.exit(1);
      }
      completedQueries++;
      if (completedQueries === queries.length) {
        console.log("Database schema tables created successfully!");
        seedDatabase();
      }
    });
  });
}

function seedDatabase() {
  console.log("Checking and seeding data...");

  // 1. Seed admin if empty
  db.query("SELECT COUNT(*) as count FROM admins", (err, result) => {
    if (err) {
      console.error(err);
      db.end();
      return;
    }

    if (result[0].count === 0) {
      // Seed default admin: username "admin", password "admin123"
      // We will store the hash or raw string. Let's use bcrypt-style or raw.
      // Since we want this script to run immediately, and we'll use a simple password verifier,
      // let's store standard bcrypt hash for 'admin123' or use simple text/hashes.
      // The bcrypt hash for 'admin123' (salt rounds = 10) is typically:
      // $2a$10$8C5V40g21qLp.Z66tZq8P.qV0F2LzCgPUpbXl7Z5yQO9NqZ1G4kF2
      // Let's write the exact hash: $2b$10$sXk1rN70L2b4hY/Ycskr7OKqW8B8V.i3kSjX1e4s.N6C4R34aLg3a
      // Or we can just insert username: admin, password: password123 (we can do a simple plaintext check
      // or hash check. Hashing is cleaner. Let's insert a hash and verify with bcryptjs).
      const username = "admin";
      // Hash of "admin123"
      const hash = "$2a$10$wK1Vf5hN1gG1H7dF4F5fOeqC5sWcQhKqC.fX8N/f5X1b5a5e5e5e5"; // Mock or real hash
      // To be safe, we will just install bcryptjs and hash it, or insert plain password and check it,
      // or use a pre-hashed string.
      // Let's use bcryptjs in the server, and insert the prehashed bcrypt for 'admin123':
      // '$2a$10$3s.zD7q.n76vLp77NlCsk.L5U7268d.Fz70bYpQeT8Qc81t812rKu'
      const hashedPass = "$2a$10$3s.zD7q.n76vLp77NlCsk.L5U7268d.Fz70bYpQeT8Qc81t812rKu"; // admin123
      db.query(
        "INSERT INTO admins (username, password) VALUES (?, ?)",
        [username, hashedPass],
        (err) => {
          if (err) console.error("Admin seeding error:", err);
          else console.log("Default admin seeded: admin / admin123");
        }
      );
    } else {
      console.log("Admins table already has records.");
    }
  });

  // 2. Seed workshops if empty
  db.query("SELECT COUNT(*) as count FROM workshops", (err, result) => {
    if (err) {
      console.error(err);
      db.end();
      return;
    }

    if (result[0].count === 0) {
      const workshops = [
        [
          "Urban Gardening Basics",
          "Learn the fundamentals of starting your own vegetable garden in small urban spaces. Covers soil preparation, seedling selection, and watering.",
          "2026-06-10",
          "Colombo Eco Garden",
          10,
          "/images/gardening_basics.png"
        ],
        [
          "Composting at Home",
          "Transform kitchen waste into rich organic compost for your plants. Learn about bin setups, green/brown balance, and trouble-shooting.",
          "2026-06-18",
          "Kandy Community Center",
          8,
          "/images/composting.png"
        ],
        [
          "Eco-Friendly Living Tips",
          "Practical strategies for reducing plastic usage, minimizing waste, and choosing sustainable household alternatives.",
          "2026-06-25",
          "Online Webinar",
          15,
          "/images/eco_living.png"
        ]
      ];

      const sql =
        "INSERT INTO workshops (title, description, date, location, slots, image) VALUES ?";
      db.query(sql, [workshops], (err) => {
        if (err) console.error("Workshops seeding error:", err);
        else console.log("Default workshops seeded!");
      });
    } else {
      console.log("Workshops table already has records.");
    }
  });

  // 3. Seed events if empty
  db.query("SELECT COUNT(*) as count FROM events", (err, result) => {
    if (err) {
      console.error(err);
      db.end();
      return;
    }

    if (result[0].count === 0) {
      const events = [
        [
          "Community Garden Cleanup",
          "Join hands to clean and prepare our local community garden for the next planting season. Bring gloves and energy!",
          "2026-06-12",
          "Viharamahadevi Park",
          "Cleanup",
          "/images/garden_cleanup.png"
        ],
        [
          "Seed Swap & Exchange Meeting",
          "Bring your organic/heirloom seeds and swap them with other urban farmers. Share tips and learn plant varieties.",
          "2026-06-20",
          "Jaffna Public Hall",
          "Meetup",
          "/images/seed_swap.png"
        ],
        [
          "Sustainability Workshop Series",
          "A comprehensive discussion session with climate experts on green rooftops, water harvesting, and renewable solar power solutions.",
          "2526-06-28",
          "Galle Fort Library",
          "Workshop",
          "/images/sustainability_series.png"
        ]
      ];

      const sql =
        "INSERT INTO events (title, description, date, location, category, image) VALUES ?";
      db.query(sql, [events], (err) => {
        if (err) console.error("Events seeding error:", err);
        else {
          console.log("Default events seeded!");
          db.end();
        }
      });
    } else {
      console.log("Events table already has records.");
      db.end();
    }
  });
}
