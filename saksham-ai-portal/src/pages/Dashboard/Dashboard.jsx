import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaCheckCircle,
  FaFileAlt,
  FaFolder,
  FaRobot,
  FaSignOutAlt,
  FaMicrophone,
  FaBell,
  FaChartLine,
  FaRegClock,
  FaRupeeSign,
  FaGraduationCap,
  FaHeartbeat,
  FaTractor,
} from "react-icons/fa";
import { authService } from "../../services/authService";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const schemes = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      icon: <FaTractor />,
      benefit: "₹6,000/year",
      eligibility: "95%",
      status: "Eligible",
      color: "#ff9933",
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      icon: <FaHeartbeat />,
      benefit: "₹5,00,000 cover",
      eligibility: "88%",
      status: "Eligible",
      color: "#138808",
    },
    {
      id: 3,
      name: "PM Scholarship",
      icon: <FaGraduationCap />,
      benefit: "₹12,000/year",
      eligibility: "72%",
      status: "Partially",
      color: "#000080",
    },
  ];

  return (
    <div className="dashboard">
      {/* Indian Flag Background Pattern */}
      <div className="flag-pattern"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <FaRobot className="robot-icon" />
              <div className="chakra-animation"></div>
            </div>
            <h2>Saarthi</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            <FaHome /> Dashboard
          </button>
          <button
            className={`nav-item ${activeSection === "eligibility" ? "active" : ""}`}
            onClick={() => setActiveSection("eligibility")}
          >
            <FaCheckCircle /> My Eligibility
          </button>
          <button
            className={`nav-item ${activeSection === "schemes" ? "active" : ""}`}
            onClick={() => setActiveSection("schemes")}
          >
            <FaFileAlt /> Recommended Schemes
          </button>
          <button
            className={`nav-item ${activeSection === "applications" ? "active" : ""}`}
            onClick={() => setActiveSection("applications")}
          >
            <FaFolder /> My Applications
          </button>
          <button
            className={`nav-item ${activeSection === "vault" ? "active" : ""}`}
            onClick={() => setActiveSection("vault")}
          >
            <FaFolder /> Document Vault
          </button>
          <button
            className={`nav-item ${activeSection === "assistant" ? "active" : ""}`}
            onClick={() => setActiveSection("assistant")}
          >
            <FaRobot /> AI Assistant
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-details">
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-title">
            <h1>Welcome back, {user.name.split(" ")[0]}! 👋</h1>
            <p className="header-subtitle">
              Your personal government benefits assistant
            </p>
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            <div className="language-badge">
              🇮🇳 {user.preferredLanguage || "English"}
            </div>
          </div>
        </header>

        {/* Eligibility Score Card */}
        <div className="eligibility-card">
          <div className="eligibility-score">
            <div className="score-circle">
              <span className="score-number">85%</span>
              <span className="score-label">Eligibility Score</span>
            </div>
            <div className="score-details">
              <h3>You're eligible for 7 schemes!</h3>
              <p>Complete your profile to increase score</p>
              <button className="complete-profile-btn">
                Complete Profile →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fff4e5" }}>
              <FaCheckCircle style={{ color: "#ff9933" }} />
            </div>
            <div className="stat-info">
              <h3>5</h3>
              <p>Active Applications</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e8f5e9" }}>
              <FaRupeeSign style={{ color: "#138808" }} />
            </div>
            <div className="stat-info">
              <h3>₹24,000</h3>
              <p>Total Benefits</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e6f0ff" }}>
              <FaRegClock style={{ color: "#000080" }} />
            </div>
            <div className="stat-info">
              <h3>2</h3>
              <p>Pending Documents</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f3e5f5" }}>
              <FaChartLine style={{ color: "#6a1b9a" }} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Schemes Available</p>
            </div>
          </div>
        </div>

        {/* Recommended Schemes */}
        <section className="schemes-section">
          <div className="section-header">
            <h2>Recommended for You</h2>
            <button className="view-all">View All →</button>
          </div>

          <div className="schemes-grid">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="scheme-card">
                <div
                  className="scheme-icon"
                  style={{ background: `${scheme.color}20` }}
                >
                  {scheme.icon}
                </div>
                <div className="scheme-content">
                  <h3>{scheme.name}</h3>
                  <p className="scheme-benefit">{scheme.benefit}</p>
                  <div className="scheme-footer">
                    <span
                      className="eligibility-badge"
                      style={{
                        background: `${scheme.color}20`,
                        color: scheme.color,
                      }}
                    >
                      {scheme.eligibility} Match
                    </span>
                    <button className="apply-btn">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant Quick Chat */}
        <div className="ai-quick-chat">
          <div className="ai-header">
            <FaRobot className="ai-icon" />
            <h3>Need help? Ask Saarthi AI</h3>
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Type your question or click mic to speak..."
              className="chat-input"
            />
            <button className="mic-btn">
              <FaMicrophone />
            </button>
          </div>
        </div>
      </main>

      {/* Floating AI Assistant Button */}
      <button className="floating-ai-btn">
        <FaRobot />
        <span>Ask Saarthi</span>
      </button>
    </div>
  );
};

export default Dashboard;
