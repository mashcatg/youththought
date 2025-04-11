import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Post from "../components/Post";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import LoadingScreen from "../components/LoadingScreen";
import { NavLink } from "react-router-dom";

function SearchResult() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Page for lazy loading

  const { keywords } = useParams(); // Get the keywords from the URL params

  const loader = useRef(null); // Ref to observe last user profile

  // Fetch users and posts based on keywords and page number
  const fetchData = async (loadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch user profiles
      const userResponse = await fetch(
        `https://www.youthsthought.com/backend/get_search_users.php?keywords=${keywords}&page=${page}`
      );
      if (!userResponse.ok) throw new Error("Failed to fetch users");
      const userData = await userResponse.json();

      // Fetch posts only once
      if (page === 1) {
        const postResponse = await fetch(
          `https://www.youthsthought.com/backend/get_search_posts.php?keywords=${keywords}`
        );
        if (!postResponse.ok) throw new Error("Failed to fetch posts");
        const postData = await postResponse.json();
        setPosts(postData);
      }

      setUsers((prevUsers) =>
        loadMore ? [...prevUsers, ...userData] : userData
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [keywords, page]);

  // Intersection Observer to load more users when the last user is visible
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // Load next page
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  if (loading && users.length === 0) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="search-results">
            <h2>Users</h2>
            <div className="user-profiles-horizontal">
              {users.length === 0 ? (
                <div className="no-users-found">No users found</div>
              ) : (
                users.map((user, index) => (
                  <NavLink
                    to={`/profile/${user.user_id}`}
                    className="menu-item"
                  >
                    <div className="user-container">
                      <div className="user-image">
                        <img
                          src={`../../public/dp/${user.profile_picture}`}
                          alt={user.name}
                        />
                      </div>
                      <div className="details">
                        <div className="user-name">{user.name}</div>
                        <div className="user-designation">
                          {user.designation}
                        </div>
                        <button className="message-btn">Message</button>
                      </div>
                    </div>
                  </NavLink>
                ))
              )}
              {/* Loader div to observe for lazy loading */}
              <div
                ref={loader}
                style={{ visibility: "hidden", height: "1px" }}
              ></div>
            </div>
            <div className="results">
              <h2>Posts</h2>
              <div className="posts-grid">
                {posts.length === 0 ? (
                  <div className="no-posts-found">No posts found</div>
                ) : (
                  posts.map((post) => <Post key={post.post_id} post={post} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default SearchResult;
