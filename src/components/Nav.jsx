import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

function Nav() {
  const [profilePic, setProfilePic] = useState("");
  const user = useSelector((state) => state.user.user);

  const navigation = useNavigate();
  function navigateLogin() {
    navigation("/login");
  }
  function navigateRegister() {
    navigation("/register");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="Nav">
      <div className="logo">Tribe.com</div>
      <div className="nav-links">
        <div>Discover</div>
        {JSON.stringify(user) === "{}" ? (
          <>
            <div onClick={navigateLogin}>Login</div>

            <button className="register-btn" onClick={navigateRegister}>
              Register
            </button>
          </>
        ) : (
          <div className="profile-icon" onClick={navigateProfile}>
            <img src={profilePic !== "" ? profilePic : "/images/profile.png"} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Nav;
