const express = require("express");

const router = express.Router();

const {

  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus

} = require("../controllers/orderController");

const {

  auth,
  isAdmin

} = require("../middleware/authMiddleware");


// USER ROUTES

// CREATE ORDER
router.post(
  "/create",
  auth,
  createOrder
);


// GET MY ORDERS
router.get(
  "/my-orders",
  auth,
  getMyOrders
);



// ADMIN ROUTES

// GET ALL ORDERS
router.get(
  "/all-orders",
  auth,
  isAdmin,
  getAllOrders
);


// UPDATE ORDER STATUS
router.put(
  "/update-status",
  auth,
  isAdmin,
  updateOrderStatus
);


module.exports = router;