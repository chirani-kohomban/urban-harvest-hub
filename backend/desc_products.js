const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "urban_harvest_hub"
});

db.query("DESCRIBE products", (err, results) => {
  if (err) throw err;
  console.log(results);
  process.exit();
});
