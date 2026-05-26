const express = require("express");

const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");

const { auth } = require("../middleware/authMiddleware");


// REGISTER ROUTE
router.post("/register", register);


// LOGIN ROUTE
router.post("/login", login);


// PROTECTED DASHBOARD ROUTE
router.get("/dashboard", auth, (req, res) => {

  res.status(200).json({
    success: true,
    message: "Welcome to Dashboard",
    user: req.user
  });

});


module.exports = router;