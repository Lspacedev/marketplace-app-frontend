import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";

function UserProfile({ userId }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [userUpdate, setUserUpdate] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [update, setUpdate] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (typeof user !== "undefined") {
      setLoading(false);
      setUserUpdate((prev) => ({ ...prev, username: user.username }));
      setUserUpdate((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }
  const token = localStorage.getItem("token");

  async function handleSubmit() {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_PROD_URL}/api/profile`, {
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
        setLoading(false);

        navigation(0);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="UserProfile">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <button className="close" onClick={() => setUpdate(false)}>
                  <CgClose />
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {
                  <img
                    src={
                      user.profilePic !== ""
                        ? user.profilePic
                        : "/images/profile.png"
                    }
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
                {update ? (
                  <div>
                    <h4>New password:</h4>
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
                  <div className="password-text"></div>
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
