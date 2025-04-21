const mysql = require("mysql2");

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Ganti jika menggunakan user lain
  password: "", // Ganti dengan password MySQL Anda
  database: "forecast_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;
