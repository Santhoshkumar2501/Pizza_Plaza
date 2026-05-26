import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

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


  // REGISTER USER
  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/register",

        formData

      );

      alert(response.data.message);

      // REDIRECT TO LOGIN
      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };


  return (

    <div className="container">

      <h1>Register Page</h1>

      <form onSubmit={handleRegister}>


        <input

          type="text"

          name="name"

          placeholder="Enter Name"

          value={formData.name}

          onChange={handleChange}

        />

        <br />
        <br />


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

          Register

        </button>
    <br />
<br />

<Link to="/login">

  Already have an account? Login

</Link>
      </form>

    </div>

  );

}

export default Register;