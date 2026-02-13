import React from "react";
import {
  FaCheckCircle,
  FaRupeeSign,
  FaRegClock,
  FaChartLine,
  FaTractor,
  FaHeartbeat,
  FaGraduationCap,
  FaMicrophone,
  FaRobot,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const DashboardHome = ({ user }) => {
  const schemes = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      icon: <FaTractor />,
      benefit: "₹6,000/year",
      eligibility: "95%",
      status: "Eligible",
      color: "#ff9933",
      description: "Income support for farmers",
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      icon: <FaHeartbeat />,
      benefit: "₹5,00,000 cover",
      eligibility: "88%",
      status: "Eligible",
      color: "#138808",
      description: "Health insurance coverage",
    },
    {
      id: 3,
      name: "PM Scholarship",
      icon: <FaGraduationCap />,
      benefit: "₹12,000/year",
      eligibility: "72%",
      status: "Partially",
      color: "#000080",
      description: "For meritorious students",
    },
    {
      id: 4,
      name: "PM Awas Yojana",
      icon: "🏠",
      benefit: "₹2,50,000",
      eligibility: "82%",
      status: "Eligible",
      color: "#ff6b6b",
      description: "Housing for all",
    },
    {
      id: 5,
      name: "Sukanya Samriddhi",
      icon: "👧",
      benefit: "8.2% Interest",
      eligibility: "94%",
      status: "Eligible",
      color: "#ff1493",
      description: "Girl child savings scheme",
    },
    {
      id: 6,
      name: "PM Mudra Yojana",
      icon: "💼",
      benefit: "₹50,000 - ₹10L",
      eligibility: "68%",
      status: "Partially",
      color: "#20b2aa",
      description: "Loans for small businesses",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Applied for PM Kisan",
      date: "2 hours ago",
      status: "Under Review",
    },
    {
      id: 2,
      action: "Document verified - Aadhaar",
      date: "1 day ago",
      status: "Completed",
    },
    {
      id: 3,
      action: "Eligibility checked for Scholarship",
      date: "2 days ago",
      status: "Eligible",
    },
  ];

  return (
    <div className="dashboard-home">
      {/* Eligibility Score Card */}
      <div className="eligibility-card">
        <div className="eligibility-score">
          <div className="score-circle">
            <span className="score-number">85%</span>
            <span className="score-label">Eligibility Score</span>
          </div>
          <div className="score-details">
            <h3>You're eligible for 12 schemes!</h3>
            <p>Complete your profile to increase score and find more schemes</p>
            <button className="complete-profile-btn">Complete Profile →</button>
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
            <h3>8</h3>
            <p>Active Applications</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e8f5e9" }}>
            <FaRupeeSign style={{ color: "#138808" }} />
          </div>
          <div className="stat-info">
            <h3>₹42,500</h3>
            <p>Total Benefits</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e6f0ff" }}>
            <FaRegClock style={{ color: "#000080" }} />
          </div>
          <div className="stat-info">
            <h3>3</h3>
            <p>Pending Documents</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f3e5f5" }}>
            <FaChartLine style={{ color: "#6a1b9a" }} />
          </div>
          <div className="stat-info">
            <h3>24</h3>
            <p>Schemes Available</p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="two-column-layout">
        {/* Left Column - Recommended Schemes */}
        <div className="left-column">
          <section className="schemes-section">
            <div className="section-header">
              <h2>Recommended for You</h2>
              <button className="view-all">View All →</button>
            </div>

            <div className="schemes-grid">
              {schemes.slice(0, 3).map((scheme) => (
                <div key={scheme.id} className="scheme-card">
                  <div
                    className="scheme-icon"
                    style={{ background: `${scheme.color}20` }}
                  >
                    {scheme.icon}
                  </div>
                  <div className="scheme-content">
                    <h3>{scheme.name}</h3>
                    <p className="scheme-description">{scheme.description}</p>
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
                      <button className="apply-btn">Apply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - Recent Activity & Quick Actions */}
        <div className="right-column">
          {/* Recent Activity */}
          <div className="recent-activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-time">{activity.date}</p>
                  </div>
                  <span
                    className={`activity-status ${activity.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="quick-action-btn">
                <FaMicrophone /> Voice Search
              </button>
              <button className="quick-action-btn">
                <FaRobot /> Ask AI
              </button>
              <button className="quick-action-btn">📄 New Application</button>
              <button className="quick-action-btn">📁 Upload Document</button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Chat */}
      <div className="ai-quick-chat">
        <div className="ai-header">
          <FaRobot className="ai-icon" />
          <h3>Need help? Ask Saarthi AI in your language</h3>
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
        <div className="suggested-questions">
          <span className="suggested-tag">Suggested:</span>
          <button className="suggestion-chip">PM Kisan eligibility</button>
          <button className="suggestion-chip">Ayushman Bharat documents</button>
          <button className="suggestion-chip">Scholarship deadline</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
