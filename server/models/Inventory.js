const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({

  category: {
    type: String
  },

  name: {
    type: String
  },

  quantity: {
    type: Number,
    default: 50
  }

});

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);