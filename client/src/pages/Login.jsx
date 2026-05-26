import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    password: ""

  });


  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  // LOGIN USER
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
  "http://localhost:5000/api/auth/login",
  formData
);


      // SAVE TOKEN
      localStorage.setItem(

        "token",

        response.data.token

      );


      alert(response.data.message);


      // REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };


  return (

    <div className="container">

      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>


        <input

          type="email"

          name="email"

          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

        />

        <br />
        <br />


        <input

          type="password"

          name="password"

          placeholder="Enter Password"

          value={formData.password}

          onChange={handleChange}

        />

        <br />
        <br />


        <button type="submit">

          Login

        </button>
<br />
<br />

<Link to="/register">

  New User? Register

</Link>
      </form>

    </div>

  );

}

export default Login;