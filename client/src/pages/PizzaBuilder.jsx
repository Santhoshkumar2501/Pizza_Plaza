import { useState } from "react";

import axios from "axios";

function PizzaBuilder() {

  const [pizza, setPizza] = useState({

    base: "",

    sauce: "",

    cheese: "",

    veggies: []

  });


  // HANDLE VEGGIES
  const handleVeggies = (veg) => {

    if (pizza.veggies.includes(veg)) {

      setPizza({

        ...pizza,

        veggies: pizza.veggies.filter(
          (item) => item !== veg
        )

      });

    } else {

      setPizza({

        ...pizza,

        veggies: [...pizza.veggies, veg]

      });

    }

  };


  // PLACE ORDER
  const placeOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(

        "http://localhost:5000/api/orders/create",

        {

          pizza,

          totalPrice: 500

        },

        {

          headers: {

            Authorization: token

          }

        }

      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

    }

  };


  // FAKE PAYMENT
  const handlePayment = async () => {

    alert("Payment Successful ✅");

    placeOrder();

  };


  return (

    <div className="container">

      <h1>Build Your Pizza 🍕</h1>


      {/* BASE */}
      <h3>Select Base</h3>

      <select

        onChange={(e) =>
          setPizza({
            ...pizza,
            base: e.target.value
          })
        }

      >

        <option>Select Base</option>

        <option>Thin Crust</option>

        <option>Cheese Burst</option>

        <option>Classic</option>

        <option>Fresh Pan</option>

        <option>Wheat Thin Crust</option>

      </select>


      {/* SAUCE */}
      <h3>Select Sauce</h3>

      <select

        onChange={(e) =>
          setPizza({
            ...pizza,
            sauce: e.target.value
          })
        }

      >

        <option>Select Sauce</option>

        <option>Tomato</option>

        <option>BBQ</option>

        <option>Cheesy</option>

        <option>Spicy</option>

        <option>Garlic</option>

      </select>


      {/* CHEESE */}
      <h3>Select Cheese</h3>

      <select

        onChange={(e) =>
          setPizza({
            ...pizza,
            cheese: e.target.value
          })
        }

      >

        <option>Select Cheese</option>

        <option>Mozzarella</option>

        <option>Cheddar</option>

        <option>Parmesan</option>

        <option>Swiss</option>

        <option>Goat Cheese</option>

      </select>


      {/* VEGGIES */}
      <h3>Select Veggies</h3>

      <div>

        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleVeggies("Onion")
            }
          />
          Onion
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleVeggies("Corn")
            }
          />
          Corn
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleVeggies("Capsicum")
            }
          />
          Capsicum
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleVeggies("Mushroom")
            }
          />
          Mushroom
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            onChange={() =>
              handleVeggies("Olives")
            }
          />
          Olives
        </label>

      </div>


      <br />


      {/* PAYMENT BUTTON */}
      <button onClick={handlePayment}>

        Pay Now 💳

      </button>

    </div>

  );

}

export default PizzaBuilder;