// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBell, FaEnvelope, FaPlus, FaUser } from "react-icons/fa";
import AddPostModal from "./AddPostModal"; // Import the modal component
import "../index.scss";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("default.png");

  useEffect(() => {
    // Fetch the profile image from the server
    fetch("http://localhost/youthsthought/backend/get_dp_address.php", {
      credentials: "include", // Ensure cookies are included in the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.imageUrl) {
          setProfileImage(data.imageUrl);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error fetching profile image:", error));
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="sidebar-container">
        <div className="profile-picture">
        <NavLink to="/profile" className="menu-item">
          <img src={"../../public/dp/" + profileImage} alt="Profile" />
        </NavLink>
        </div>
        <nav className="menu-list">
          <NavLink to="/" end className="menu-item">
            <FaHome />
          </NavLink>
          <NavLink to="/inbox" className="menu-item">
            <FaEnvelope />
          </NavLink>
          <NavLink to="/notifications" className="menu-item">
            <FaBell />
          </NavLink>
          <NavLink to="/profile" className="menu-item">
            <FaUser />
          </NavLink>
        </nav>
        <button className="add-button" onClick={handleOpenModal}>
          <FaPlus />
        </button>
      </aside>
      <AddPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Sidebar;
