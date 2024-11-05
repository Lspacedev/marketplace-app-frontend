import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const navigation = useNavigate();

  function navigateProfile() {
    navigation("/home/profile");
  }
  const token = localStorage.getItem("token");

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
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="DashboardNav">
      <div onClick={becomeSeller}>Become seller</div>
      <div className="profile-icon" onClick={navigateProfile}>
        <img src="/images/profile.png" />
      </div>
    </div>
  );
}

export default DashboardNav;
