import React, { useState } from "react";
import {
  FaRobot,
  FaLanguage,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaCogs,
  FaFileContract,
  FaMicrophoneAlt,
  FaChartLine,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Header.css";

const Header = ({ onLoginClick, onSignupClick, isAuthenticated }) => {
  const [activeLink, setActiveLink] = useState("home");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
  ];

  const navLinks = [
    { id: "home", icon: <FaHome />, label: "Home" },
    { id: "services", icon: <FaCogs />, label: "Services" },
    { id: "schemas", icon: <FaFileContract />, label: "Schemas" },
    { id: "assistant", icon: <FaMicrophoneAlt />, label: "AI Assistant" },
    { id: "stats", icon: <FaChartLine />, label: "Statistics" },
    { id: "about", icon: <FaInfoCircle />, label: "About" },
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang.name);
    setShowLanguageDropdown(false);
    if (showMobileMenu) setShowMobileMenu(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveLink(sectionId);
      setShowMobileMenu(false);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowLanguageDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => scrollToSection("home")}>
          <div className="logo-icon">
            <FaRobot className="robot-icon" />
            <div className="chakra-animation"></div>
          </div>
          <div className="logo-text">
            <h1 className="logo-title">Saksham AI</h1>
            <span className="logo-subtitle">AI Solutions for Bharat</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="navigation desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeLink === link.id ? "active" : ""}`}
                  onClick={() => scrollToSection(link.id)}
                >
                  <span className="nav-icon">{link.icon}</span>
                  <span className="nav-label">{link.label}</span>
                  <span className="nav-hover-effect"></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side - Desktop */}
        <div className="header-right desktop-header-right">
          {/* Language Selector */}
          <div className="language-selector">
            <button
              className="language-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <FaLanguage className="language-icon" />
              <span className="language-text">{selectedLanguage}</span>
              <div
                className={`language-arrow ${showLanguageDropdown ? "up" : "down"}`}
              >
                <div className="arrow"></div>
              </div>
            </button>

            {showLanguageDropdown && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="language-option"
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    <span className="language-flag">{lang.flag}</span>
                    <span className="language-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            <button className="auth-btn login-btn" onClick={onLoginClick}>
              <FaSignInAlt className="btn-icon" />
              <span className="btn-text">Login</span>
              <div className="btn-hover-effect"></div>
            </button>
            <button className="auth-btn signup-btn" onClick={onSignupClick}>
              <FaUserPlus className="btn-icon" />
              <span className="btn-text">Sign Up</span>
              <div className="btn-hover-effect"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${showMobileMenu ? "active" : ""}`}>
          <nav className="mobile-navigation">
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className={`mobile-nav-link ${activeLink === link.id ? "active" : ""}`}
                    onClick={() => scrollToSection(link.id)}
                  >
                    <span className="mobile-nav-icon">{link.icon}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Language Selector */}
            <div className="mobile-language-section">
              <div className="mobile-language-header">
                <FaLanguage className="mobile-language-icon" />
                <span className="mobile-language-title">Select Language</span>
              </div>
              <div className="mobile-language-grid">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`mobile-language-option ${selectedLanguage === lang.name ? "selected" : ""}`}
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    <span className="mobile-language-flag">{lang.flag}</span>
                    <span className="mobile-language-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="mobile-auth-buttons">
              <button className="mobile-login-btn" onClick={onLoginClick}>
                <FaSignInAlt className="mobile-btn-icon" />
                <span>Login</span>
              </button>
              <button className="mobile-signup-btn" onClick={onSignupClick}>
                <FaUserPlus className="mobile-btn-icon" />
                <span>Sign Up Free</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
