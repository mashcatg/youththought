import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink, useParams } from "react-router-dom"; // Added useParams import
import { checkAuth } from "../utils/auth";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import LoadingScreen from "../components/LoadingScreen";
import ProfilePosts from "../components/ProfilePosts";
import "../index.scss";
const handleLogout = () => {
  window.location.href = "https://www.youthsthought.com/backend/logout.php";
};
const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams(); // Extract userId from URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const authData = await checkAuth();
        if (authData.status !== "success") {
          navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        navigate("/login");
      }
    };

    verifySession();
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = userId
          ? `https://www.youthsthought.com/backend/get_profile_data.php?user_id=${userId}`
          : "https://www.youthsthought.com/backend/get_profile_data.php";

        const response = await fetch(url, {
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data); // Log the response to inspect it
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  // Check if a userId is present in the URL to determine if viewing own profile or another user's
  const isViewingOwnProfile = !userId;

  return (
    <div className="profile-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="profile-header">
            <div className="profile-header__avatar">
              <img
                src={
                  user.profile_pic
                    ? `../../public/dp/${user.profile_pic}`
                    : `../../public/dp/default.png`
                }
                alt={user.name}
              />
            </div>
            <div className="profile-header__details">
              <h1 className="username">{user.name}</h1>
              <p className="designation">{user.designation}</p>
              <p className="bio">{user.bio}</p>
              {isViewingOwnProfile ? (
                <>
                  <NavLink to="/edit-profile">
                    <button className="edit-profile-btn">Edit Profile</button>
                  </NavLink>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                
                  <NavLink to={`/inbox/${user.id}`} className="message-profile-btn">
                    Message
                  </NavLink>

              )}
            </div>
          </div>
          <div className="newsfeed-container">
            <ProfilePosts />
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default ProfilePage;
