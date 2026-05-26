const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pizza: {

    base: String,

    sauce: String,

    cheese: String,

    veggies: [String]

  },

  totalPrice: Number,

  status: {
    type: String,
    default: "Order Received"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);