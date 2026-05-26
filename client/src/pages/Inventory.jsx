import { useEffect, useState } from "react";

import axios from "axios";

function Inventory() {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {

    fetchInventory();

  }, []);

  // FETCH INVENTORY
  const fetchInventory = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/inventory"
      );

      setInventory(response.data.inventory);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1>Inventory Dashboard 📦</h1>

      {inventory.map((item) => (

        <div
          key={item._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{item.name}</h3>

          <p>Category: {item.category}</p>

          <p>Remaining Stock: {item.quantity}</p>

        </div>

      ))}

    </div>

  );

}

export default Inventory;