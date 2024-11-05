import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"
import { setUser } from "./app/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token !== ""){
      fetchUser();

    }
  },[]);
  async function fetchUser(){
    try {
        const res = await fetch(
          "http://localhost:3000/api/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
          <Route exact path="/" element={<Landing />} />
          <Route exact path="register" element={<Registration />} />
          <Route exact path="login" element={<Login />} />

          {/* <Route path="results" element={<ResultsPage />}>
            <Route path=":result_id" element={<AccomodationCard />} />
          </Route> */}
          {/* <Route element={<ProtectedRouteReg auth={user} />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route> */}

          <Route element={<ProtectedRoute />}>
            <Route path="home" element={<HomePage />}>
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
