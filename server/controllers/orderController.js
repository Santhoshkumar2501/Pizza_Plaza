const Order = require("../models/Order");

const Inventory = require("../models/Inventory");

const sendEmail = require("../utils/sendEmail");

const User = require("../models/User");


// CREATE ORDER
exports.createOrder = async (req, res) => {

  try {

    const {
      pizza,
      totalPrice
    } = req.body;


    // REDUCE BASE STOCK
    await Inventory.findOneAndUpdate(

      {
        category: "base",
        name: pizza.base
      },

      {
        $inc: { quantity: -1 }
      }

    );


    // REDUCE SAUCE STOCK
    await Inventory.findOneAndUpdate(

      {
        category: "sauce",
        name: pizza.sauce
      },

      {
        $inc: { quantity: -1 }
      }

    );


    // REDUCE CHEESE STOCK
    await Inventory.findOneAndUpdate(

      {
        category: "cheese",
        name: pizza.cheese
      },

      {
        $inc: { quantity: -1 }
      }

    );


    // REDUCE VEGGIES STOCK
    for (const veg of pizza.veggies) {

      await Inventory.findOneAndUpdate(

        {
          category: "veggie",
          name: veg
        },

        {
          $inc: { quantity: -1 }
        }

      );

    }


    // CHECK LOW STOCK
    const lowStockItems = await Inventory.find({

      quantity: { $lt: 20 }

    });


    // SEND LOW STOCK EMAIL TO ADMIN
    if (lowStockItems.length > 0) {

      const itemNames = lowStockItems

        .map(item =>
          `${item.name} (${item.quantity})`
        )

        .join(", ");


      await sendEmail(

        process.env.ADMIN_EMAIL,

        "Low Stock Alert 🚨",

        `Low stock items: ${itemNames}`

      );

    }


    // GET USER DETAILS
    const user = await User.findById(req.user.id);


    // SEND ORDER CONFIRMATION EMAIL
    await sendEmail(

      user.email,

      "Pizza Order Confirmed 🍕",

      `
Hello ${user.name},

Your pizza order has been placed successfully.

Order Details:

Base: ${pizza.base}

Sauce: ${pizza.sauce}

Cheese: ${pizza.cheese}

Veggies: ${pizza.veggies.join(", ")}

Total Price: ₹${totalPrice}

Order Status: Order Received

Thank you for ordering with Pizza Plaza 🍕
      `

    );


    // CREATE ORDER
    const order = await Order.create({

      userId: req.user.id,

      pizza,

      totalPrice

    });


    res.status(201).json({

      success: true,

      message: "Order Placed Successfully",

      order

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



// GET USER ORDERS
exports.getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      userId: req.user.id

    });

    res.status(200).json({

      success: true,

      orders

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



// GET ALL ORDERS (ADMIN)
exports.getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()

      .populate("userId", "name email");

    res.status(200).json({

      success: true,

      orders

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



// UPDATE ORDER STATUS (ADMIN)
exports.updateOrderStatus = async (req, res) => {

  try {

    const {
      orderId,
      status
    } = req.body;

    const order = await Order.findByIdAndUpdate(

      orderId,

      {
        status
      },

      {
        new: true
      }

    );

    res.status(200).json({

      success: true,

      message: "Order Status Updated",

      order

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};