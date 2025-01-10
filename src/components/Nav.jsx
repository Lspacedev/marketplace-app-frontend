import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
function Nav() {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigate();
  function navigateLogin() {
    navigation("/login");
  }
  function navigateRegister() {
    navigation("/register");
  }
  function navigateProfile() {
    navigation("/home");
  }
  function openSearchMenu() {
    const search = document.querySelector(".Cart");
    search.classList.toggle("active");
  }
  return (
    <div className="Nav">
      <div
        className="logo"
        onClick={() => {
          navigation("/");
          navigation(0);
        }}
      >
        Tribe.com
      </div>
      <div className="nav-links">
        {JSON.stringify(user) === "{}" ? (
          <>
            <div onClick={navigateLogin}>Login</div>

            <button className="register-btn" onClick={navigateRegister}>
              Register
            </button>
          </>
        ) : (
          <>
            <div className="cart-icon" onClick={openSearchMenu}>
              <IoCartOutline className="icon" />
              <span>{user && user.cart.length}</span>
            </div>

            <div className="profile-icon" onClick={navigateProfile}>
              <img
                src={
                  user.profilePic !== ""
                    ? user.profilePic
                    : "/images/profile.png"
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Nav;
