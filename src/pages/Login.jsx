import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  //navigation
  const navigation = useNavigate();

  function handleNavigateRegister() {
    navigation("/register");
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      if (loginDetails.username === "" || loginDetails.password === "") {
        alert("Fields are required");
        return;
      }
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok === true) {
        alert(data.message);
        localStorage.setItem("token", data.token);

        navigation("/home");
        navigation(0);
      } else {
        setErrors(data.errors);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async function guestSignIn() {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PROD_URL}/api/guest-log-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "Content-length": 0 },
        }
      );
      const data = await res.json();
      setLoading(false);
      if (typeof data.errors !== "undefined") {
        setErrors(data.errors);
      } else {
        alert(data.message);
        localStorage.setItem("token", data.token);
        navigation("/home");
        navigation(0);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Login">
      <div className="page-container">
        <div className="login-form-container">
          <h2>Welcome back!</h2>
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
                  value={loginDetails.username}
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
                  value={loginDetails.password}
                />
              </label>
            </div>
            <button onClick={loading ? console.log() : handleSubmit}>
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              className="guest-submit"
              onClick={loading ? console.log() : guestSignIn}
            >
              {loading ? "Loading..." : "Guest"}
            </button>{" "}
          </div>
          <div className="login-to-register">
            Don't have an account?{" "}
            <p onClick={handleNavigateRegister}>Register here</p>
          </div>
        </div>
        <div className="login-img">
          <img
            src="/images/pexels-polina-tankilevitch-4440839.jpg"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
