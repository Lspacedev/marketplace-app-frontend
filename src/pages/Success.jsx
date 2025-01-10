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
        <div className="link" onClick={navigateHome}>
          Go back to Marketplace
        </div>
      </div>
    </div>
  );
}

export default Success;
