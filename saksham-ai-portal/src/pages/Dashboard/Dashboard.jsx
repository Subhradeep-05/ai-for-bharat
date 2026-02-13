import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardHome from "./components/sections/DashboardHome";
import MyEligibility from "./components/sections/MyEligibility";
import RecommendedSchemes from "./components/sections/RecommendedSchemes";
import MyApplications from "./components/sections/MyApplications";
import DocumentVault from "./components/sections/DocumentVault";
import CompareSchemes from "./components/sections/CompareSchemes";
import AIAssistant from "./components/sections/AIAssistant";
import CommunityHelp from "./components/sections/CommunityHelp";
import Settings from "./components/sections/Settings";
import "./dashboard-sections.css";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/");
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome user={user} />;
      case "eligibility":
        return <MyEligibility user={user} />;
      case "schemes":
        return <RecommendedSchemes user={user} />;
      case "applications":
        return <MyApplications user={user} />;
      case "vault":
        return <DocumentVault user={user} />;
      case "compare":
        return <CompareSchemes user={user} />;
      case "assistant":
        return <AIAssistant user={user} />;
      case "community":
        return <CommunityHelp user={user} />;
      case "settings":
        return <Settings user={user} setUser={setUser} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  if (loading) {
    return <div className="loading">Loading Saarthi Dashboard...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="flag-pattern"></div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <Header user={user} />

        <div className="section-content">{renderSection()}</div>
      </main>

      {/* Floating AI Assistant Button */}
      <button
        className="floating-ai-btn"
        onClick={() => setActiveSection("assistant")}
      >
        <span>🤖</span>
        <span>Ask Saarthi</span>
      </button>
    </div>
  );
};

export default Dashboard;
