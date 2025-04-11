import React, { useState, useRef, useEffect } from "react";
import "../index.scss";
import logo from "../../public/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

const TopNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const navigate = useNavigate(); // Hook to programmatically navigate
  const searchInputRef = useRef(null); // Ref to manage input focus

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus(); // Auto-focus the input when expanded
    }
  }, [isExpanded]);

  // Handle the search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setIsExpanded(false); // Collapse the search bar after searching
    }
  };

  // Handle key down event for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Toggle search bar visibility or handle search
  const handleButtonClick = () => {
    if (isExpanded) {
      handleSearch(); // Trigger search when expanded
    } else {
      setIsExpanded(true); // Expand the search bar when collapsed
    }
  };

  return (
    <header className="top-navbar">
      
      <div className="logo">
       <NavLink to="/" className="menu-item">
        <img src={logo} alt="Logo" />
      </NavLink>
      </div>
      
      <div className={`search-box ${isExpanded ? "expanded" : ""}`}>
        <button className="btn-search" onClick={handleButtonClick}>
          <FaSearch />
        </button>
        {isExpanded && (
          <div className="search-input-container">
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              onBlur={() => setIsExpanded(false)} // Collapse when losing focus
              onKeyDown={handleKeyDown} // Handle Enter key press
              ref={searchInputRef} // Attach ref to input
            />
            <button className="btn-search" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
