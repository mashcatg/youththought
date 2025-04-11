import React, { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import NewsFeed from "../components/Newsfeed.jsx";
import UserProfileColumn from "../components/UserProfileColumn";
import BottomNavbar from "../components/BottomNavbar";
import LoadingScreen from "../components/LoadingScreen";
import ErrorMessage from "../components/ErrorMessage";
import "../index.scss";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("https://www.youthsthought.com/backend/check_auth.php", {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Authentication check failed");
        }
        // Handle the response as needed
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="app">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <NewsFeed />
          <UserProfileColumn />
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Home;
