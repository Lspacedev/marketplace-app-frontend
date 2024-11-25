import Sidebar from "../components/Sidebar";
import DashboardNav from "../components/DashboardNav";
import AddProduct from "../components/AddProduct";
// import Profile from "../pages/Profile";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setUser } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";
function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);
  const token = localStorage.getItem("token");
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

  function navigateProducts() {
    navigation("/home/products");
  }
  function navigateOrders() {
    navigation("/home/orders");
  }
  function navigateReviews() {
    navigation("/home/reviews");
  }
  function logOut() {
    localStorage.clear();
    navigation("/");
  }
  function closeSearchMenu() {
    const search = document.querySelector(".Cart");
    search.classList.toggle("active");
}
  return (
    <div className="HomePage">
      <Sidebar>
        <div onClick={navigateProducts}>Products</div>
        <div onClick={navigateOrders}>Orders</div>
        <div onClick={navigateReviews}>Reviews</div>

        <div>Reviews</div>

        <div className="logout" onClick={logOut}>
          Logout
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <div className="cat-add">
          <AddProduct />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
