import React, { useState } from "react";
import { FaBell, FaSearch, FaMicrophone } from "react-icons/fa";

const Header = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="content-header">
      <div className="header-title">
        <h1>Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋</h1>
        <p className="header-subtitle">
          Your personal government benefits assistant
        </p>
      </div>

      <div className="header-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search schemes, documents, questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-mic">
            <FaMicrophone />
          </button>
        </div>
      </div>

      <div className="header-actions">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <div className="language-badge">
          🇮🇳 {user?.preferredLanguage || "English"}
        </div>
      </div>
    </header>
  );
};

export default Header;
