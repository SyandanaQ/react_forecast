const express = require("express");
const cors = require("cors");
require("dotenv").config();

const salesRoutes = require("./routes/salesRoutes"); // Pastikan ini diimpor dengan benar

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes); // Menggunakan salesRoutes untuk API sales

// Route untuk root
app.get("/", (req, res) => {
  res.send("Hello, welcome to the sales server!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
