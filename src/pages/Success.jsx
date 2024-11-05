import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Success() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user.user);
  function navigateHome() {
    navigation("/");
  }

  return (
    <div className="Success">
      <div>
        Payment successful
        <div onClick={navigateHome}>Go back to Zahotels.com</div>
      </div>
    </div>
  );
}

export default Success;
