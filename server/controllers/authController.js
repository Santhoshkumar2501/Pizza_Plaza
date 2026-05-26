const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      name,
      email,
      password: hashedPassword

    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User not found"
      });

    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password"
      });

    }

    // CREATE JWT TOKEN
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      success: true,
      message: "Login Successful",

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};