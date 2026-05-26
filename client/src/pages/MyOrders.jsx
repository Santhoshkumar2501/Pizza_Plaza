import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/orders/my-orders",

        {
          headers: {
            Authorization: token
          }
        }

      );

      setOrders(response.data.orders);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>My Orders 🍕</h1>

      {orders.length === 0 ? (

        <p>No Orders Found</p>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>Pizza Details</h3>

            <p>Base: {order.pizza.base}</p>

            <p>Sauce: {order.pizza.sauce}</p>

            <p>Cheese: {order.pizza.cheese}</p>

            <p>
              Veggies:
              {" "}
              {order.pizza.veggies.join(", ")}
            </p>

            <p>Price: ₹{order.totalPrice}</p>

            <p>Status: {order.status}</p>

          </div>

        ))

      )}

    </div>

  );

}

export default MyOrders;