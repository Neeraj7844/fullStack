const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Get Users
router.get("/users", getUsers);


module.exports = router;