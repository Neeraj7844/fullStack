const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();


// ======================
// Database Connection
// ======================

connectDB();


// ======================
// Middleware
// ======================

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://loginsignup-form-seven.vercel.app",
      "http://localhost:5173",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true,
  })
);


// ======================
// Test Route
// ======================

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});


// ======================
// Routes
// ======================

app.use("/", userRoutes);


// ======================
// Error Handling
// ======================

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Server Error",
  });
});


// ======================
// Server Start
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});