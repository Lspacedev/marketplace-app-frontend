import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  //navigation
  const navigation = useNavigate();

  function goToLogin() {
    navigation("/login");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserDetails({
        ...userDetails,
        profilePic: event.target.result,
      });
    };
  }

  async function handleSubmit() {
    try {
      const res = await fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = res.json();
      alert(data.message);
      navigation("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="Registration">
      <div className="register-form-container">
        <h2>Create new account</h2>
        <div className="register-to-login">
          Already have an account?
          <p onClick={goToLogin}>Login</p>
        </div>
        <div className="form">
          <div className="username">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => handleChange(e)}
                value={userDetails.username}
              />
            </label>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={userDetails.email}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={userDetails.password}
              />
            </label>
          </div>

          {/* <div className="profile-pic">
            <label htmlFor="profile-pic">
              Profile picture:
              <input
                type="file"
                id="profile-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div> */}

          <button onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
      <div className="register-img">
        {/* <img src="images/login-register.jpg" alt="register" /> */}
      </div>
    </div>
  );
}

export default Registration;
