import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigation = useNavigate();
  function navigateHome() {
    navigation("/");
  }
  return (
    <div className="Cancel">
      <div>Payment cancelled</div>
      <div className="link" onClick={navigateHome}>
        Go back to Tribe.com
      </div>
    </div>
  );
}

export default Cancel;
