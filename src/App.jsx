import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth";
import { setUser } from "./app/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Products from "./pages/Products";
import Product from "./pages/Product";
import MarketPlace from "./pages/MarketPlace";
import Item from "./pages/Item";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Orders from "./pages/Orders";
import UserProfile from "./pages/UserProfile";
import Reviews from "./pages/Reviews";
function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (typeof token !== "undefined" && token !== null) {
      fetchUser();
    }
  }, [token]);
  async function fetchUser() {
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok === true) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />}>
            <Route index element={<MarketPlace />} />
            <Route path="marketplace" element={<MarketPlace />}>
              <Route path=":item_id" element={<Item />} />
            </Route>
          </Route>
          <Route element={<ProtectedAuth />}>
            <Route exact path="register" element={<Registration />} />
            <Route exact path="login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />}>
              <Route index element={<Orders />} />

              <Route path="products" element={<Products />}>
                <Route path=":product_id" element={<Product />} />
              </Route>
              <Route path="reviews" element={<Reviews />} />

              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
