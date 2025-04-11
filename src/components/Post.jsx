import React, { useState, useEffect, useRef } from "react";
import { MdOutlineIosShare } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { LiaDonateSolid } from "react-icons/lia";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { NavLink } from "react-router-dom";

const Post = ({ post }) => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [liked, setLiked] = useState(false);
  const postId = post.post_id;
  const [totalReacts, setTotalReacts] = useState(0);
  const popupRef = useRef(null); // Add this line at the top of your component

  useEffect(() => {
    // Fetch initial liked state from the backend
    const fetchLikedState = async () => {
      try {
        const response = await fetch(
          `https://www.youthsthought.com/backend/get_reaction.php?post_id=${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const react = await response.json();
        if (react.liked) {
          setLiked(true);
        }
        setTotalReacts(react.total_reacts);
      } catch (error) {
        console.error("Error fetching liked state:", error);
      }
    };

    fetchLikedState();
  }, [postId]);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "... ";
    }
    return description;
  };

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
    const postUrl = "http://localhost:5173/post/" + post.post_id;
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

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={`../../public/dp/${post.profile_picture}`}
          alt="Profile"
          className="profile-pic"
        />
        <div className="post-info">
          <span className="name">{post.name}</span>
          <span className="date">
            {new Date(post.created_at).toDateString()}
          </span>
        </div>
      </div>
      <NavLink to={`/post/${postId}`} className="menu-item">
        <div className="post-description">
          {truncateDescription(post.post_description, 150)}
          {post.post_description.length > 150 && (
            <a className="view-more" href="#">
              View More
            </a>
          )}
        </div>
        {post.attachment_type === "image" && (
          <img
            src={`../../public/posts/${post.file_link}`}
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
        {post.lat && post.lng && (
          <MapContainer
            center={[post.lat, post.lng]}
            zoom={13}
            className="post-map"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[post.lat, post.lng]}>
              <Popup>{post.user_id}'s Location</Popup>
            </Marker>
          </MapContainer>
        )}
        {post.post_type === "Crowdfunding" && (
          <div className="funding-info">
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(post.fund_amount / post.currency) * 100}%`,
                }}
              ></div>
            </div>
            <span className="funding-amount">
              <span className="bold-text">
                {post.fund_amount} {post.currency}
              </span>{" "}
              Raised
            </span>
          </div>
        )}
      </NavLink>
      <div className="post-actions">
        <div className="left-actions">
          <button
            className="action-button"
            style={{
              color: liked ? "#4080ff" : "inherit", // Change color if liked
            }}
            onClick={handleLikeToggle}
          >
            <BiDonateHeart style={{ marginRight: "8px" }} />{" "}
            <span className="total-reacts">{liked ? totalReacts+1 : totalReacts}</span>
          </button>
          {post.post_type === "crowdfunding" && (
            <button className="action-button">
              <LiaDonateSolid style={{ strokeWidth: "1" }} />{" "}
            </button>
          )}
        </div>
        <div className="right-actions">
          <button className="action-button" onClick={toggleSharePopup}>
            <MdOutlineIosShare />
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
  );
};

export default Post;
