import React from "react";
import { MdOutlineIosShare } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { RiMessage3Line } from "react-icons/ri";
import { LiaDonateSolid } from "react-icons/lia";

import "leaflet/dist/leaflet.css";
import "../index.scss";

const posts = [
  {
    id: 1,
    type: "Issue",
    profilePic: "https://via.placeholder.com/50",
    name: "Jane Doe",
    date: "Aug 13, 2024",
    description:
      "This is an issue post description. It's a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    media: "https://via.placeholder.com/800x400",
    location: {
      lat: 51.505,
      lng: -0.09,
    },
  },
  {
    id: 2,
    type: "Crowdfunding",
    profilePic: "https://via.placeholder.com/50",
    name: "John Smith",
    date: "Aug 13, 2024",
    description:
      "This is a crowdfunding post description. It's a shorter description.",
    media: "https://via.placeholder.com/800x400",
    fundedAmount: 6500,
    goalAmount: 10000,
  },
  {
    id: 3,
    type: "The 1% Youth",
    profilePic: "https://via.placeholder.com/50",
    name: "Alice Johnson",
    date: "Aug 13, 2024",
    description:
      "This is a 1% Youth post description. It's another long description that should be truncated if it exceeds 250 characters. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla.",
    media: "https://via.placeholder.com/800x400",
  },
  {
    id: 4,
    type: "Issue",
    profilePic: "https://via.placeholder.com/50",
    name: "Jane Doe",
    date: "Aug 13, 2024",
    description:
      "This is an issue post description. It's a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    media: "https://via.placeholder.com/800x400",
    location: {
      lat: 51.505,
      lng: -0.09,
    },
  },
  {
    id: 5,
    type: "Crowdfunding",
    profilePic: "https://via.placeholder.com/50",
    name: "John Smith",
    date: "Aug 13, 2024",
    description:
      "This is a crowdfunding post description. It's a shorter description.",
    media: "https://via.placeholder.com/800x400",
    fundedAmount: 5000,
    goalAmount: 10000,
  },
  {
    id: 6,
    type: "The 1% Youth",
    profilePic: "https://via.placeholder.com/50",
    name: "Alice Johnson",
    date: "Aug 13, 2024",
    description:
      "This is a 1% Youth post description. It's another long description that should be truncated if it exceeds 250 characters. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla.",
    media: "https://via.placeholder.com/800x400",
  },
  // Add more posts as needed
];

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "... ";
  }
  return description;
};

const NewsFeed = () => {
  return (
    <>
      <div className="newsfeed left">
        {posts
          .filter((post) => post.id % 2 !== 0) // Show odd ID posts
          .map((post, index) => (
            <div className="post" key={index}>
              <div className="post-header">
                <img
                  src={post.profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
                <div className="post-info">
                  <span className="name">{post.name}</span>
                  <span className="date">{post.date}</span>
                </div>
              </div>
              <div className="post-description">
                {truncateDescription(post.description, 150)}
                {post.description.length > 150 && (
                  <a className="view-more" href="#">
                    {" "}
                    View More
                  </a>
                )}
              </div>
              {post.media && (
                <img src={post.media} alt="Post media" className="post-media" />
              )}
              {post.location && (
                <MapContainer
                  center={[post.location.lat, post.location.lng]}
                  zoom={13}
                  className="post-map"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[post.location.lat, post.location.lng]}>
                    <Popup>{post.name}'s Location</Popup>
                  </Marker>
                </MapContainer>
              )}
              {post.type === "Crowdfunding" && (
                <div className="funding-info">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${
                          (post.fundedAmount / post.goalAmount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="funding-amount">
                    <span className="bold-text">{post.fundedAmount} BDT</span>{" "}
                    Raised out of {post.goalAmount} BDT
                  </span>
                </div>
              )}
              <div className="post-actions">
                <div className="left-actions">
                  <button className="action-button">
                    <BiDonateHeart />
                  </button>
                  <button className="action-button">
                    <RiMessage3Line />
                  </button>
                  {post.type === "Crowdfunding" && (
                    <button className="action-button">
                      <LiaDonateSolid style={{ strokeWidth: "1" }} />
                    </button>
                  )}
                </div>
                <MdOutlineIosShare className="right-action" />
              </div>
            </div>
          ))}
      </div>

      <div className="newsfeed right">
        {posts
          .filter((post) => post.id % 2 === 0) // Show even ID posts
          .map((post, index) => (
            <div className="post" key={index}>
              <div className="post-header">
                <img
                  src={post.profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
                <div className="post-info">
                  <span className="name">{post.name}</span>
                  <span className="date">{post.date}</span>
                </div>
              </div>
              <div className="post-description">
                {truncateDescription(post.description, 150)}
                {post.description.length > 150 && (
                  <a className="view-more" href="#">
                    {" "}
                    View More
                  </a>
                )}
              </div>
              {post.media && (
                <img src={post.media} alt="Post media" className="post-media" />
              )}
              {post.location && (
                <MapContainer
                  center={[post.location.lat, post.location.lng]}
                  zoom={13}
                  className="post-map"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[post.location.lat, post.location.lng]}>
                    <Popup>{post.name}'s Location</Popup>
                  </Marker>
                </MapContainer>
              )}
              {post.type === "Crowdfunding" && (
                <div className="funding-info">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${
                          (post.fundedAmount / post.goalAmount) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="funding-amount">
                    <span className="bold-text">{post.fundedAmount} BDT</span>{" "}
                    Raised out of {post.goalAmount} BDT
                  </span>
                </div>
              )}
              <div className="post-actions">
                <div className="left-actions">
                  <button className="action-button">
                    <BiDonateHeart />
                  </button>
                  <button className="action-button">
                    <RiMessage3Line />
                  </button>
                  {post.type === "Crowdfunding" && (
                    <button className="action-button">
                      <LiaDonateSolid style={{ strokeWidth: "1" }} />
                    </button>
                  )}
                </div>
                <MdOutlineIosShare className="right-action" />
              </div>
            </div>
          ))}
      </div>

      <div className="newsfeed mobile">
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <div className="post-header">
              <img
                src={post.profilePic}
                alt="Profile"
                className="profile-pic"
              />
              <div className="post-info">
                <span className="name">{post.name}</span>
                <span className="date">{post.date}</span>
              </div>
            </div>
            <div className="post-description">
              {truncateDescription(post.description, 150)}
              {post.description.length > 150 && (
                <a className="view-more" href="#">
                  {" "}
                  View More
                </a>
              )}
            </div>
            {post.media && (
              <img src={post.media} alt="Post media" className="post-media" />
            )}
            {post.location && (
              <MapContainer
                center={[post.location.lat, post.location.lng]}
                zoom={13}
                className="post-map"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[post.location.lat, post.location.lng]}>
                  <Popup>{post.name}'s Location</Popup>
                </Marker>
              </MapContainer>
            )}
            {post.type === "Crowdfunding" && (
              <div className="funding-info">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${(post.fundedAmount / post.goalAmount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="funding-amount">
                  <span className="bold-text">{post.fundedAmount} BDT</span>{" "}
                  Raised out of {post.goalAmount} BDT
                </span>
              </div>
            )}
            <div className="post-actions">
              <div className="left-actions">
                <button className="action-button">
                  <BiDonateHeart />
                </button>
                <button className="action-button">
                  <RiMessage3Line />
                </button>
                {post.type === "Crowdfunding" && (
                  <button className="action-button">
                    <LiaDonateSolid style={{ strokeWidth: "1" }} />
                  </button>
                )}
              </div>
              <MdOutlineIosShare className="right-action" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsFeed;
