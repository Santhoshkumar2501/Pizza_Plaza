import { Link, useNavigate } from "react-router-dom";


function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged Out");

    navigate("/login");

  };


  return (

    <div
      style={{
        padding: "15px",
        borderBottom: "1px solid black",
        marginBottom: "20px"
      }}
    >

      <Link to="/dashboard">

        <button>Dashboard</button>

      </Link>

      {" "}

      <Link to="/pizza">

        <button>Pizza</button>

      </Link>

      {" "}

      <Link to="/my-orders">

        <button>My Orders</button>

      </Link>

      {" "}

      <Link to="/inventory">

        <button>Inventory</button>

      </Link>

      {" "}

      <Link to="/admin">

        <button>Admin</button>

      </Link>

      {" "}

      {!token ? (

        <>

          <Link to="/login">

            <button>Login</button>

          </Link>

          {" "}

          <Link to="/register">

            <button>Register</button>

          </Link>

        </>

      ) : (

        <button onClick={handleLogout}>

          Logout

        </button>

      )}

    </div>

  );

}

export default Navbar;