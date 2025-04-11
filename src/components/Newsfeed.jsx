import React, { useState, useRef, useEffect, useCallback } from "react";
import Post from "./Post"; // Import the Post component
import "leaflet/dist/leaflet.css";
import "../index.scss";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // State to track if there are more posts to load
  const loader = useRef(null);

  const fetchPosts = useCallback(
    async (newOffset = 0) => {
      if (loading || !hasMore) return; // Prevent fetching if already loading or no more posts
      setLoading(true);

      try {
        const response = await fetch("https://www.youthsthought.com/backend/fetch_posts.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ offset: newOffset }),
          credentials: "include",
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.length === 0) {
          setHasMore(false); // No more posts to load
        } else {
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setOffset((prevOffset) => prevOffset + 5);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    fetchPosts(0); // Fetch initial posts on component mount
  }, [fetchPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(offset);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [fetchPosts, offset, hasMore]);

  return (
    <>
      {/* Left and right newsfeeds for larger screens */}
      <div className="newsfeed-container">
        <div className="newsfeed left">
          {posts
            .filter((_, index) => index % 2 !== 0) // Show odd-indexed posts
            .map((post) => (
              <Post key={post.post_id} post={post} />
            ))}
        </div>

        <div className="newsfeed right">
          {posts
            .filter((_, index) => index % 2 === 0) // Show even-indexed posts
            .map((post) => (
              <Post key={post.post_id} post={post} />
            ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="newsfeed mobile">
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </div>

      {/* Loader element for infinite scroll */}
      <div ref={loader} className="loader">
        {loading}
      </div>
    </>
  );
};

export default NewsFeed;
