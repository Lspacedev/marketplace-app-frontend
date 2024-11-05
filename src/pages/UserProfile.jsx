import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";

function UserProfile({ userId }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [userUpdate, setUserUpdate] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [update, setUpdate] = useState(false);

  const isLoading = false;

  const user = useSelector((state) => state.user.user);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }
  const token = localStorage.getItem("token");

  async function handleSubmit() {
    try {
      const res = await fetch(`http://localhost:3000/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userUpdate),
      });
      const data = await res.json();
      if (res.ok === true) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="UserProfile">
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <button className="close" onClick={() => setUpdate(false)}>
                  x
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {
                  <img
                    src={profilePic !== "" ? profilePic : "/images/profile.png"}
                  />
                }
              </div>
            )}
          </div>
          <div className="profile-content">
            <h2>Account details</h2>
            <div className="name-div">
              <h4>Username</h4>
              {update ? (
                <div className="username">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.username}
                  />
                </div>
              ) : (
                <div>{user && user.username}</div>
              )}
            </div>

            <div className="email-div">
              <h4>Email</h4>
              {update ? (
                <div className="email">
                  <div>
                    {" "}
                    <input
                      type="text"
                      id="email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      value={userUpdate.email}
                    />
                  </div>
                </div>
              ) : (
                <div>{user && user.email}</div>
              )}
            </div>

            <div className="user-pass">
              <div className="pass">
                <h4>Password:</h4>
                {update ? (
                  <div>
                    <div className="password">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={userUpdate.passsword}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="password-text">{user && user.password}</div>
                )}
              </div>
            </div>
            <div className="account-update">
              <button
                onClick={() => (update ? handleSubmit() : setUpdate(true))}
              >
                {update ? "Submit" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserProfile;
