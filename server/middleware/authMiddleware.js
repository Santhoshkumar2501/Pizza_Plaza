const jwt = require("jsonwebtoken");


// AUTH MIDDLEWARE
exports.auth = async (req, res, next) => {

  try {

    // GET TOKEN
    const token = req.headers.authorization;

    // CHECK TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Token Missing"
      });

    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // SAVE USER DATA
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }

};


// ADMIN MIDDLEWARE
exports.isAdmin = async (req, res, next) => {

  try {

    // CHECK ROLE
    if (req.user.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Admin Access Required"
      });

    }

    next();

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};