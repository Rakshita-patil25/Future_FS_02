require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Mini CRM Server Running");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});