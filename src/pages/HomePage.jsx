import Sidebar from "../components/Sidebar";
import DashboardNav from "../components/DashboardNav";
import AddProduct from "../components/AddProduct";
// import Profile from "../pages/Profile";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setUser } from "../app/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBox } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
function HomePage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { pathname } = useLocation();

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
    navigation("/home");
  }
  function navigateReviews() {
    navigation("/home/reviews");
  }
  function logOut() {
    localStorage.clear();
    navigation("/");
    navigation(0);
  }
  function closeSearchMenu() {
    const search = document.querySelector(".Cart");
    search.classList.toggle("active");
  }
  const user = useSelector((state) => state.user.user);
  return (
    <div className="HomePage">
      <Sidebar>
        {user && user.role === "SELLER" && (
          <div onClick={navigateProducts}>
            <FaBox />
            <div>Products</div>
          </div>
        )}
        <div onClick={navigateOrders}>
          <FaReceipt />
          <div>Orders</div>
        </div>
        <div onClick={navigateReviews}>
          <BsFillFileTextFill />
          <div>Reviews</div>
        </div>
        <div className="logout" onClick={logOut}>
          <IoLogOut />
          <div>Logout</div>
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <div className="cat-add">
          {user && user.role === "SELLER" && pathname === "/home/products" && (
            <AddProduct />
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
