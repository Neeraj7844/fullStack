const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ======================
// REGISTER
// ======================

const registerUser = async (req, res) => {

  try {

    const { name, email, pass } = req.body;

    if (!name || !email || !pass) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = new User({
      name,
      email,
      pass: hashedPassword,
    });

    await newUser.save();

    if (!process.env.JWT_SECRET) {

      return res.status(500).json({
        message: "JWT_SECRET missing",
      });

    }

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "User Registered Successfully",
      token,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ======================
// LOGIN
// ======================

const loginUser = async (req, res) => {

  try {

    const { email, pass } = req.body;

    if (!email || !pass) {

      return res.status(400).json({
        message: "All fields are required",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    if (!process.env.JWT_SECRET) {

      return res.status(500).json({
        message: "JWT_SECRET missing",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ======================
// GET USERS
// ======================

const getUsers = async (req, res) => {

  try {

    const users = await User.find().select("-pass");

    res.status(200).json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


module.exports = {
  registerUser,
  loginUser,
  getUsers,
};