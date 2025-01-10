import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DashboardNav() {
  const navigation = useNavigate();

  function navigateProfile() {
    navigation("/home/profile");
  }
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user.user);

  async function becomeSeller() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/become-seller`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok === true) {
        navigation(0);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="DashboardNav">
      <div className="discover" onClick={() => navigation("/")}>
        Discover
      </div>

      {user && user.role && user.role !== "SELLER" ? (
        <div onClick={becomeSeller}>Become seller</div>
      ) : (
        <div onClick={() => alert("Already a seller")}>SELLER</div>
      )}
      <div className="profile-icon" onClick={navigateProfile}>
        <img
          src={user.profilePic !== "" ? user.profilePic : "/images/profile.png"}
        />
      </div>
    </div>
  );
}

export default DashboardNav;
