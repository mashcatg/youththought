import React, { useEffect, useState } from "react";
import "../index.scss";
import LoadingScreen from "../components/LoadingScreen";
import { NavLink } from "react-router-dom";

const UserProfileColumn = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleLogout = () => {
    window.location.href = "https://www.youthsthought.com/backend/logout.php";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://www.youthsthought.com/backend/get_profile_data.php",
          { credentials: "include" }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://www.youthsthought.com/backend/fetch_users.php?offset=${offset}`,
          { credentials: "include" }
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUsers((prevUsers) => [...prevUsers, ...data]);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchUsers();
  }, [offset]);

  const handleViewMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="user-profile-column">
      {user?.loggedIn ? (
        <div className="profile">
          <img
            src={
              user.profile_pic
                ? `../../public/dp/${user.profile_pic}`
                : `../../public/dp/default.png`
            }
            alt={user.name}
            className="user-pic"
          />
          <div className="details">
            <span className="name">{user.name}</span>
            <span className="designation">{user.designation}</span>
            <div className="buttons">
              <NavLink to="/edit-profile">
                <button className="edit-profile-btn">Edit Profile</button>
              </NavLink>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-buttons">
          <button onClick={() => (window.location.href = "/login")}>
            Login
          </button>
          <button onClick={() => (window.location.href = "/signup")}>
            Sign Up
          </button>
        </div>
      )}
      <div className="suggestions">
        <div className="divider">
          <span>Rising Youths</span>
        </div>
        <ul>
          {users.map((user) => (
            <NavLink to={`/profile/${user.user_id}`} className="menu-item">
              <li key={user.user_id}>
                {/* Use user.user_id instead of user.id */}
                <img
                  src={`../../public/dp/${user.profile_picture}`} // Adjusted for image path
                  alt={user.name}
                  className="suggested-pic"
                />
                <div className="suggested-details">
                  <span className="suggested-name">{user.name}</span>
                  <span className="suggested-designation">
                    {user.designation || "No Designation"}{" "}
                    {/* Handle null values */}
                  </span>
                </div>
              </li>
            </NavLink>
          ))}
        </ul>

        <div className="view-more-btn-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileColumn;
