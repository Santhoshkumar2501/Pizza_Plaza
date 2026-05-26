const Inventory = require("../models/Inventory");


// GET INVENTORY
exports.getInventory = async (req, res) => {

  try {

    const items = await Inventory.find();

    // create default stock if empty
    if (items.length === 0) {

      const defaultItems = [

        // BASES
        {
          category: "base",
          name: "Thin Crust",
          quantity: 50
        },

        {
          category: "base",
          name: "Cheese Burst",
          quantity: 50
        },

        // SAUCES
        {
          category: "sauce",
          name: "Tomato",
          quantity: 50
        },

        {
          category: "sauce",
          name: "BBQ",
          quantity: 50
        },

        // CHEESE
        {
          category: "cheese",
          name: "Mozzarella",
          quantity: 50
        },

        // VEGGIES
        {
          category: "veggie",
          name: "Onion",
          quantity: 50
        },

        {
          category: "veggie",
          name: "Corn",
          quantity: 50
        }

      ];

      await Inventory.insertMany(defaultItems);

    }

    const updatedItems = await Inventory.find();

    res.status(200).json({
      success: true,
      inventory: updatedItems
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};