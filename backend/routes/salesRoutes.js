const express = require("express");
const router = express.Router();
const db = require("../db");

// GET - Ambil semua data sales
router.get("/", (req, res) => {
    const query = "SELECT id, nama_produk, harga, DATE_FORMAT(tanggal, '%Y-%m-%d') AS tanggal FROM sales";
    db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching data", error: err });
    }
    console.log(results); // Menampilkan data sales di backend
    res.json(results);
  });
});

// POST - Tambah data sales
router.post("/", (req, res) => {
  const { nama_produk, harga, tanggal } = req.body;
  const query = "INSERT INTO sales (nama_produk, harga, tanggal) VALUES (?, ?, ?)";
  db.query(query, [nama_produk, harga, tanggal], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error adding sale", error: err });
    }
    res.status(201).json({ message: "Sale added", id: results.insertId });
  });
});

// PUT - Update data sales berdasarkan ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nama_produk, harga, tanggal } = req.body;
  const query = "UPDATE sales SET nama_produk = ?, harga = ?, tanggal = ? WHERE id = ?";
  db.query(query, [nama_produk, harga, tanggal, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error updating sale", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json({ message: "Sale updated" });
  });
});

// DELETE - Hapus data sales berdasarkan ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM sales WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting sale", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json({ message: "Sale deleted" });
  });
});

module.exports = router;
