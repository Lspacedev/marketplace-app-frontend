import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
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
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
      const data = await res.json();
      console.log({ res, data });
      if (res.ok === true) {
        alert(data.message);
        localStorage.setItem("token", data.token);
        navigation("/home");
        navigation(0);
      } else {
        setErrors(data.errors);
      }
    } catch (err) {
      console.log(err.message);
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

            <button onClick={() => handleSubmit()}>Submit</button>
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
