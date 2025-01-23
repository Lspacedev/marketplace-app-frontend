import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    street: "",
    town: "",
    city: "",
    country: "",
    profilePic: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setUserDetails({
      ...userDetails,
      profilePic: e.target.files[0],
    });
  }

  async function handleSubmit() {
    if (
      userDetails.username === "" ||
      userDetails.email === "" ||
      userDetails.password === "" ||
      userDetails.street === "" ||
      userDetails.town === "" ||
      userDetails.city === "" ||
      userDetails.country === ""
    ) {
      alert("Fields are required");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("username", userDetails.username);
    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);
    formData.append("street", userDetails.street);
    formData.append("town", userDetails.town);
    formData.append("city", userDetails.city);
    formData.append("country", userDetails.country);
    formData.append("profilePic", userDetails.profilePic);
    try {
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/register`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        navigation("/login");
      } else {
        setErrors(data.errors);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }

  return (
    <div className="Registration">
      <div className="page-container">
        <div className="register-form-container">
          <h2>Create new account</h2>
          {errors &&
            errors.length > 0 &&
            errors.map((err, i) => (
              <span key={i} className="err">
                {err}
              </span>
            ))}

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
            <div className="address">
              <label htmlFor="street">
                Street name:
                <input
                  type="text"
                  id="street"
                  name="street"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.street}
                />
              </label>
              <label htmlFor="town">
                Town:
                <input
                  type="text"
                  id="town"
                  name="town"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.town}
                />
              </label>
              <label htmlFor="city">
                City:
                <input
                  type="text"
                  id="city"
                  name="city"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.city}
                />
              </label>
              <label htmlFor="country">
                Country:
                <input
                  type="text"
                  id="country"
                  name="country"
                  onChange={(e) => handleChange(e)}
                  value={userDetails.country}
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

            <div className="profile-pic">
              <label htmlFor="profile-pic">
                Profile picture:
                <input
                  type="file"
                  id="profile-pic"
                  name="pic"
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
            </div>

            <button onClick={loading ? console.log() : handleSubmit}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
          <div className="register-to-login">
            Already have an account?
            <p onClick={goToLogin}>Login</p>
          </div>
        </div>
        <div className="register-img">
          <img
            src="/images/pexels-polina-tankilevitch-4440839.jpg"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
}

export default Registration;
