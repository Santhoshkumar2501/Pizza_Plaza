const Pizza = require("../models/Pizza");


// GET PIZZA OPTIONS
exports.getPizzaOptions = async (req, res) => {

  try {

    let pizza = await Pizza.findOne();

    // create default options if empty
    if (!pizza) {

      pizza = await Pizza.create({

        bases: [
          "Thin Crust",
          "Cheese Burst",
          "Pan Pizza",
          "Whole Wheat",
          "Stuffed Crust"
        ],

        sauces: [
          "Tomato",
          "BBQ",
          "Pesto",
          "White Sauce",
          "Spicy Garlic"
        ],

        cheeses: [
          "Mozzarella",
          "Cheddar",
          "Parmesan"
        ],

        veggies: [
          "Onion",
          "Corn",
          "Mushroom",
          "Olives",
          "Capsicum",
          "Jalapeno"
        ]

      });

    }

    res.status(200).json({
      success: true,
      pizza
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};