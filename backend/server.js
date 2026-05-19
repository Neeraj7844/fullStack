const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

// app.use(cors());
app.use(
  cors({
    origin: "https://loginsignup-form-seven.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server Running On Port ${PORT}`);

});