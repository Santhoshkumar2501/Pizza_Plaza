import { Link, useNavigate } from "react-router-dom";


function Dashboard() {

  const navigate = useNavigate();


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/login");

  };


  return (

    <div className="container">

      <h1>User Dashboard 🍕</h1>

      <h2>User Logged In Successfully ✅</h2>

      <br />


      <Link to="/pizza">

        <button>
          Build Pizza
        </button>

      </Link>


      <br />
      <br />


      <Link to="/my-orders">

        <button>
          My Orders
        </button>

      </Link>


      <br />
      <br />


      <Link to="/inventory">

        <button>
          Inventory
        </button>

      </Link>


      <br />
      <br />


      <Link to="/admin">

        <button>
          Admin Dashboard
        </button>

      </Link>


      <br />
      <br />


      <button onClick={handleLogout}>

        Logout

      </button>

    </div>

  );

}

export default Dashboard;