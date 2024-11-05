import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const navigation = useNavigate();

  function navigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="DashboardNav">
      <div className="profile-icon" onClick={navigateProfile}>
        <img src="/images/profile.png" />
      </div>
    </div>
  );
}

export default DashboardNav;