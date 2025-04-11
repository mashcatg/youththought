import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BiDonateHeart } from "react-icons/bi";
import { LiaDonateSolid } from "react-icons/lia";
import { MdOutlineIosShare } from "react-icons/md";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import "leaflet/dist/leaflet.css";
import "../index.scss";

import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import LoadingScreen from "../components/LoadingScreen";

const PostPage = () => {
  const { postId } = useParams(); // Extracting the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [totalReacts, setTotalReacts] = useState(0);
  const popupRef = useRef(null);

  // Function to fetch post data
  const fetchPost = async () => {
    try {
      const response = await fetch(
        `https://www.youthsthought.com/backend/get_post_data.php?post_id=${postId}`,
        {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        }
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      setPost(data);
      setLiked(data.has_liked);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Immediately fetch data when component is rendered
  useEffect(() => {
    fetchPost();
  }, [postId]);

  const [liked, setLiked] = useState(false); // Track if the user has liked the post

  const handleLikeToggle = async () => {
    const prevLikedState = liked;
    try {
      const url = liked
        ? "https://www.youthsthought.com/backend/remove_reaction.php"
        : "https://www.youthsthought.com/backend/add_reaction.php";
      const method = liked ? "DELETE" : "POST";

      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          post_id: postId,
        }),
      });

      setLiked(!liked);
    } catch (error) {
      console.error("Error updating reaction:", error);
      setLiked(prevLikedState);
    }
  };

  const handleShare = (platform) => {
    const postUrl = "http://localhost:5173/post/" + postId;
    const postText = post.post_description;

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          postUrl
        )}&text=${encodeURIComponent(postText)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          postUrl
        )}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(
          postText
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          post.title
        )}&body=${encodeURIComponent(postText)}%0A%0A${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          postText
        )}%20${encodeURIComponent(postUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(postUrl);
        alert("Link copied to clipboard!");
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const toggleSharePopup = () => {
    setShowSharePopup(!showSharePopup);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowSharePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getYouTubeVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getGoogleDriveFileId = (url) => {
    const regExp = /(?:drive\.google\.com\/file\/d\/|open\?id=)([\w-]{25,})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-page">
      <TopNavbar />
      <div className="main-container">
        <Sidebar />
        <div className="post">
          <div className="post-header">
            <img
              src={"../../public/dp/" + post.profile_picture}
              alt="Profile"
              className="profile-pic"
            />
            <div className="post-info">
              <span className="name">{post.name}</span>
              <span className="date">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="post-description">{post.post_description}</div>
          {post.attachment_type === "image" && (
            <img
              src={"../../public/posts/" + post.file_link}
              alt="Post media"
              className="post-media"
            />
          )}

          {post.attachment_type === "video" && (
            <>
              {post.file_link.includes("youtube.com") ||
              post.file_link.includes("youtu.be") ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    post.file_link
                  )}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="post-media"
                ></iframe>
              ) : post.file_link.includes("facebook.com") ? (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    post.file_link
                  )}&show_text=0&width=560`}
                  width="560"
                  height="315"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="post-media"
                ></iframe>
              ) : post.file_link.includes("drive.google.com") ? (
                <iframe
                  src={`https://drive.google.com/file/d/${getGoogleDriveFileId(
                    post.file_link
                  )}/preview`}
                  width="640"
                  height="480"
                  allow="autoplay"
                  className="post-media"
                ></iframe>
              ) : (
                <video
                  controls
                  src={post.file_link}
                  className="post-media"
                ></video>
              )}
            </>
          )}
          {post.post_type === "issue" && post.lat && post.lng && (
            <MapContainer
              center={[post.lat, post.lng]}
              zoom={13}
              className="post-map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[post.lat, post.lng]}>
                <Popup>{post.name}'s Location</Popup>
              </Marker>
            </MapContainer>
          )}

          {post.post_type === "crowdfunding" && (
            <div className="funding-info">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(post.raised_fund / post.fund_amount) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="funding-amount">
                <span className="bold-text">
                  {post.raised_fund} {post.currency}
                </span>{" "}
                Raised out of {post.fund_amount} {post.currency}
              </span>
            </div>
          )}
          <div className="post-actions">
            <div className="left-actions">
              <button
                className="action-button"
                style={{
                  color: liked ? "#4080ff" : "inherit", // Change color if liked
                }}
                onClick={handleLikeToggle}
              >
                <BiDonateHeart style={{ marginRight: "8px" }} />
                <span className="total-reacts">{liked ? post.total_reacts+1 : post.total_reacts}</span>
              </button>
              {post.post_type === "crowdfunding" && (
                <button className="action-button">
                  <LiaDonateSolid
                    style={{ strokeWidth: "1", marginRight: "8px" }}
                  />{" "}
                </button>
              )}
            </div>
            <button className="action-button" onClick={toggleSharePopup}>
              <MdOutlineIosShare className="right-action" />
            </button>
            {showSharePopup && (
              <div ref={popupRef} className="share-popup-container">
                <div className="share-options">
                  <button
                    className="share-option"
                    onClick={() => handleShare("facebook")}
                  >
                    <FaFacebook />
                  </button>
                  <button
                    className="share-option"
                    onClick={() => handleShare("twitter")}
                  >
                    <FaTwitter />
                  </button>
                  <button
                    className="share-option"
                    onClick={() => handleShare("linkedin")}
                  >
                    <FaLinkedin />
                  </button>
                  <button
                    className="share-option"
                    onClick={() => handleShare("whatsapp")}
                  >
                    <FaWhatsapp />
                  </button>
                  <button
                    className="share-option"
                    onClick={() => handleShare("email")}
                  >
                    <MdEmail />
                  </button>
                  <button
                    className="share-option"
                    onClick={() => handleShare("copy")}
                  >
                    <MdContentCopy />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default PostPage;
