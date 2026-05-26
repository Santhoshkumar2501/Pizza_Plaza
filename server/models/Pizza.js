const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({

  bases: [String],

  sauces: [String],

  cheeses: [String],

  veggies: [String]

});

module.exports = mongoose.model("Pizza", pizzaSchema);