import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { userId } = useParams();
  const loader = useRef(null);

  const fetchPosts = async (currentOffset) => {
    setLoading(true);
    setError(null);

    try {
      const url = userId
        ? `https://www.youthsthought.com/backend/get_posts.php?user_id=${userId}&offset=${currentOffset}`
        : `https://www.youthsthought.com/backend/get_posts.php?offset=${currentOffset}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setOffset((prevOffset) => prevOffset + 5);
        }
      } else {
        throw new Error("Invalid data format received from server.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(offset);
  }, [userId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
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
  }, [loading, hasMore, offset]);

  return (
    <>
      {error && <div>{error}</div>}
      {loading && posts.length === 0 && <div>Loading...</div>}
      {posts.length === 0 && !loading && <div>No posts available.</div>}
      <div className="newsfeed left">
        {posts
          .filter((post) => post.serial_id % 2 !== 0)
          .map((post) => (
            <Post key={post.post_id} post={post} />
          ))}
      </div>
      <div className="newsfeed right">
        {posts
          .filter((post) => post.serial_id % 2 === 0)
          .map((post) => (
            <Post key={post.post_id} post={post} />
          ))}
      </div>
      <div className="newsfeed mobile">
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </div>
      <div ref={loader} className="loader">
        {loading}
      </div>
    </>
  );
};

export default ProfilePosts;
