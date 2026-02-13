import React, { useState } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaDownload,
  FaRupeeSign,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const MyApplications = ({ user }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: "APP001",
      scheme: "PM Kisan Samman Nidhi",
      appliedDate: "2024-03-15",
      amount: "₹6,000/year",
      status: "approved",
      stage: "Disbursed",
      lastUpdate: "2024-03-20",
      reference: "PMK/2024/12345",
    },
    {
      id: "APP002",
      scheme: "Ayushman Bharat",
      appliedDate: "2024-03-10",
      amount: "₹5,00,000 cover",
      status: "pending",
      stage: "Document Verification",
      lastUpdate: "2024-03-18",
      reference: "AYU/2024/67890",
    },
    {
      id: "APP003",
      scheme: "PM Scholarship",
      appliedDate: "2024-02-28",
      amount: "₹12,000/year",
      status: "review",
      stage: "Committee Review",
      lastUpdate: "2024-03-15",
      reference: "PMS/2024/54321",
    },
    {
      id: "APP004",
      scheme: "PM Awas Yojana",
      appliedDate: "2024-02-20",
      amount: "₹2,50,000",
      status: "rejected",
      stage: "Rejected",
      lastUpdate: "2024-03-10",
      reference: "PMAY/2024/98765",
      rejectionReason: "Income certificate not valid",
    },
    {
      id: "APP005",
      scheme: "Sukanya Samriddhi",
      appliedDate: "2024-03-01",
      amount: "8.2% Interest",
      status: "approved",
      stage: "Active",
      lastUpdate: "2024-03-19",
      reference: "SSY/2024/45678",
    },
    {
      id: "APP006",
      scheme: "PM Mudra Yojana",
      appliedDate: "2024-03-05",
      amount: "₹1,00,000",
      status: "pending",
      stage: "Bank Verification",
      lastUpdate: "2024-03-17",
      reference: "MUD/2024/23456",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <FaCheckCircle className="status-icon approved" />;
      case "pending":
        return <FaClock className="status-icon pending" />;
      case "review":
        return <FaFileAlt className="status-icon review" />;
      case "rejected":
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "status-badge approved";
      case "pending":
        return "status-badge pending";
      case "review":
        return "status-badge review";
      case "rejected":
        return "status-badge rejected";
      default:
        return "status-badge";
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (
      searchTerm &&
      !app.scheme.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !app.reference.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter((a) => a.status === "approved").length,
    pending: applications.filter((a) => a.status === "pending").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="my-applications">
      <div className="applications-header">
        <h2>📄 My Applications</h2>
        <p className="section-description">
          Track and manage all your scheme applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="application-stats">
        <div className="stat-card-app">
          <div className="stat-icon-app total">
            <FaFileAlt />
          </div>
          <div className="stat-info-app">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
        </div>

        <div className="stat-card-app">
          <div className="stat-icon-app approved">
            <FaCheckCircle />
          </div>
          <div className="stat-info-app">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card-app">
          <div className="stat-icon-app pending">
            <FaClock />
          </div>
          <div className="stat-info-app">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card-app">
          <div className="stat-icon-app rejected">
            <FaTimesCircle />
          </div>
          <div className="stat-info-app">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="applications-filter-bar">
        <div className="search-box-app">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by scheme or reference number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="app-search-input"
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`filter-tab ${filterStatus === "approved" ? "active" : ""}`}
            onClick={() => setFilterStatus("approved")}
          >
            Approved
          </button>
          <button
            className={`filter-tab ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-tab ${filterStatus === "review" ? "active" : ""}`}
            onClick={() => setFilterStatus("review")}
          >
            Under Review
          </button>
          <button
            className={`filter-tab ${filterStatus === "rejected" ? "active" : ""}`}
            onClick={() => setFilterStatus("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {filteredApplications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found</p>
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="app-card-header">
                <div className="app-title">
                  <h3>{app.scheme}</h3>
                  <span className="app-reference">Ref: {app.reference}</span>
                </div>
                <span className={getStatusClass(app.status)}>
                  {getStatusIcon(app.status)}
                  <span>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </span>
              </div>

              <div className="app-card-body">
                <div className="app-detail-grid">
                  <div className="app-detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <div>
                      <span className="detail-label">Applied On</span>
                      <span className="detail-value">{app.appliedDate}</span>
                    </div>
                  </div>

                  <div className="app-detail-item">
                    <FaRupeeSign className="detail-icon" />
                    <div>
                      <span className="detail-label">Benefit</span>
                      <span className="detail-value">{app.amount}</span>
                    </div>
                  </div>

                  <div className="app-detail-item">
                    <FaClock className="detail-icon" />
                    <div>
                      <span className="detail-label">Current Stage</span>
                      <span className="detail-value">{app.stage}</span>
                    </div>
                  </div>

                  <div className="app-detail-item">
                    <FaFileAlt className="detail-icon" />
                    <div>
                      <span className="detail-label">Last Update</span>
                      <span className="detail-value">{app.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                {app.status === "rejected" && app.rejectionReason && (
                  <div className="rejection-reason">
                    <strong>Reason:</strong> {app.rejectionReason}
                  </div>
                )}
              </div>

              <div className="app-card-footer">
                <button className="app-action-btn view">
                  <FaEye /> View Details
                </button>
                <button className="app-action-btn download">
                  <FaDownload /> Download Form
                </button>
                {app.status === "pending" && (
                  <button className="app-action-btn track">Track Status</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Timeline View Toggle */}
      <div className="timeline-toggle">
        <button className="timeline-btn">
          <FaClock /> View Timeline
        </button>
      </div>
    </div>
  );
};

export default MyApplications;
