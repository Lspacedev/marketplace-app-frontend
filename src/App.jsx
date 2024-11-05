import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { setUser } from "./app/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Products from "./pages/Products";
import Product from "./pages/Product";
import MarketPlace from "./pages/MarketPlace";
import Item from "./pages/Item";
function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== "") {
      fetchUser();
    }
  }, []);
  async function fetchUser() {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
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
          <Route exact path="register" element={<Registration />} />
          <Route exact path="login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />}>
              <Route path="products" element={<Products />}>
                <Route path=":product_id" element={<Product />} />
              </Route>
              {/* <Route index element={<Bookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="favourites" element={<Favourites />} />

              <Route path="profile" element={<UserProfile userId={user} />} /> */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
