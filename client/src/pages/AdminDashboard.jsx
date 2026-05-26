import { useEffect, useState } from "react";

import axios from "axios";

function AdminDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ALL ORDERS
  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:5000/api/orders/all-orders",

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

  // UPDATE STATUS
  const updateStatus = async (orderId, status) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(

        "http://localhost:5000/api/orders/update-status",

        {
          orderId,
          status
        },

        {
          headers: {
            Authorization: token
          }
        }

      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>Admin Dashboard 👨‍🍳</h1>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>Customer Details</h3>

          <p>Name: {order.userId?.name}</p>

          <p>Email: {order.userId?.email}</p>

          <hr />

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

          <button
            onClick={() =>
              updateStatus(order._id, "Order Received")
            }
          >
            Order Received
          </button>

          <button
            onClick={() =>
              updateStatus(order._id, "In Kitchen")
            }
          >
            In Kitchen
          </button>

          <button
            onClick={() =>
              updateStatus(order._id, "Sent To Delivery")
            }
          >
            Sent To Delivery
          </button>

        </div>

      ))}

    </div>

  );

}

export default AdminDashboard;