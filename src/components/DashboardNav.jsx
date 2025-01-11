import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
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
        `${import.meta.env.VITE_PROD_URL}/api/profile/become-seller`,
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
        <MdOutlineExplore fontSize="1.4rem" />
        <div>Expore</div>
      </div>

      {user && user.role && user.role !== "SELLER" ? (
        <div className="seller" onClick={becomeSeller}>
          <MdOutlineSell fontSize="1.4rem" />

          <div>Become seller</div>
        </div>
      ) : (
        <div className="seller" onClick={() => alert("Already a seller")}>
          <MdOutlineSell fontSize="1.4rem" />
          <div>SELLER</div>
        </div>
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
