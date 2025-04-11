// src/components/BottomNavbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBell, FaEnvelope, FaPlus, FaUser } from "react-icons/fa";
import AddPostModal from "./AddPostModal"; // Import the modal component
import "../index.scss";

const BottomNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bottom-navbar-container">
        <NavLink
          to="/"
          end
          className="bottom-menu-item"
          activeClassName="active"
        >
          <FaHome />
        </NavLink>
        <button className="bottom-menu-item" onClick={handleOpenModal}>
          <FaPlus />
        </button>
        <NavLink
          to="/inbox"
          className="bottom-menu-item"
          activeClassName="active"
        >
          <FaEnvelope />
        </NavLink>
        <NavLink
          to="/notifications"
          className="bottom-menu-item"
          activeClassName="active"
        >
          <FaBell />
        </NavLink>
        <NavLink
          to="/profile"
          className="bottom-menu-item"
          activeClassName="active"
        >
          <FaUser />
        </NavLink>
      </nav>
      <AddPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default BottomNavbar;
