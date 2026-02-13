import React from "react";
import {
  FaHome,
  FaCheckCircle,
  FaFileAlt,
  FaFolder,
  FaRobot,
  FaSignOutAlt,
  FaUser,
  FaBalanceScale,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection, user, handleLogout }) => {
  const navItems = [
    { id: "dashboard", icon: <FaHome />, label: "Dashboard" },
    { id: "eligibility", icon: <FaCheckCircle />, label: "My Eligibility" },
    { id: "schemes", icon: <FaFileAlt />, label: "Recommended Schemes" },
    { id: "applications", icon: <FaFolder />, label: "My Applications" },
    { id: "vault", icon: <FaFolder />, label: "Document Vault" },
    { id: "compare", icon: <FaBalanceScale />, label: "Compare Schemes" },
    { id: "assistant", icon: <FaRobot />, label: "AI Assistant" },
    { id: "community", icon: <FaUsers />, label: "Community Help" },
    { id: "settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
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
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => setActiveSection(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-details">
            <p className="user-name">{user?.name || "User"}</p>
            <p className="user-email">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
