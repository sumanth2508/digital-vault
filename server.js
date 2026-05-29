const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
// Middleware: Tells the server to understand JSON
app.use(express.json());

app.use('/api', require('./routes/auth'));

// --- DATABASE CONNECTION ---
// Using Mongoose to talk to our Warehouse
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database is Connected and Ready!"))
  .catch((err) => console.error("❌ Connection failed:"));

// --- BASIC ROUTE ---
app.get("/", (req, res) => {
  res.send("Vault Server is Live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});