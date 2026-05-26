import { BrowserRouter, Routes, Route } from "react-router-dom";
import PizzaBuilder from "./pages/PizzaBuilder";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";

function App() {

  return (

    <BrowserRouter>
<Navbar />
      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/pizza"
          element={<PizzaBuilder />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

  <Route
    path="/admin"
     element={<AdminDashboard />}
    />

        <Route
  path="/inventory"
  element={<Inventory />}
/>
      </Routes>

    </BrowserRouter>

  );

}

export default App;