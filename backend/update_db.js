const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "urban_harvest_hub"
});

db.connect((err) => {
  if (err) throw err;
  
  db.query("ALTER TABLE products ADD COLUMN description TEXT, ADD COLUMN rating DECIMAL(3,1) DEFAULT 0.0;", (err) => {
    if (err && err.code !== 'ER_DUP_FIELDNAME') {
      console.error(err);
    } else {
      console.log("Columns added successfully (or already exist).");
    }
    
    // Set a default description for existing products to prevent nulls
    db.query("UPDATE products SET description = 'A wonderful sustainable product for your urban garden.' WHERE description IS NULL", () => {
      console.log("Default descriptions set.");
      process.exit();
    });
  });
});
