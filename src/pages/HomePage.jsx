import Sidebar from "../components/Sidebar";
import DashboardNav from "../components/DashboardNav";

// import Profile from "../pages/Profile";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setUser } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
    const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(()=>{
    fetchUser();
  },[]);
  const token = localStorage.getItem("token");
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

//   function navigateAccomodation() {
//     navigation("/home/accomodations");
//   }
//   function navigateReservations() {
//     navigation("/home/reservations");
  
  return (
    <div className="HomePage">
      <Sidebar>
        <div>Orders</div>

        <div>Reviews</div>

        <div className="logout" >
          Logout
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;