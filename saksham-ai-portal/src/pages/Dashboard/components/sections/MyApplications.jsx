import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaDownload,
  FaRupeeSign,
  FaCalendarAlt,
  FaSearch,
  FaSpinner,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";
import { applicationAPI } from "@/services/api";
import "/src/pages/Dashboard/dashboard-sections.css";

const MyApplications = ({ user }) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching applications for user:", user?.email);
      const response = await applicationAPI.getMyApplications();

      if (response.success) {
        setApplications(response.applications || []);
        console.log(
          `✅ Loaded ${response.applications?.length || 0} applications`,
        );
      } else {
        setError(response.message || "Failed to fetch applications");
      }
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const refreshApplications = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const downloadApplicationForm = (application) => {
    const content = `
      APPLICATION DETAILS
      ===================
      
      Application ID: ${application.applicationId}
      Scheme: ${application.schemeName}
      Applied Date: ${new Date(application.appliedDate).toLocaleDateString()}
      Status: ${application.status}
      
      APPLICATION FORM
      ================
      
      This is a copy of your application for ${application.schemeName}.
      Application submitted on ${new Date(application.appliedDate).toLocaleDateString()}
      
      Please keep this for your records.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${application.schemeName.replace(/\s+/g, "_")}_${application.applicationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <FaCheckCircle className="status-icon approved" />;
      case "pending":
        return <FaClock className="status-icon pending" />;
      case "processing":
        return <FaSpinner className="status-icon review" />;
      case "rejected":
        return <FaTimesCircle className="status-icon rejected" />;
      default:
        return <FaFileAlt className="status-icon" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "status-badge approved";
      case "pending":
        return "status-badge pending";
      case "processing":
        return "status-badge review";
      case "rejected":
        return "status-badge rejected";
      default:
        return "status-badge";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filterStatus !== "all" && app.status !== filterStatus) return false;
    if (
      searchTerm &&
      !app.schemeName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter((a) => a.status === "approved").length,
    pending: applications.filter((a) => a.status === "pending").length,
    processing: applications.filter((a) => a.status === "processing").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  if (loading && !refreshing) {
    return (
      <div className="my-applications loading-state">
        <div className="loading-spinner"></div>
        <p>Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="my-applications">
      <div className="applications-header">
        <div>
          <h2>📄 My Applications</h2>
          <p className="section-description">
            Track and manage all your scheme applications
          </p>
        </div>
        <button
          className="refresh-btn"
          onClick={refreshApplications}
          disabled={refreshing}
        >
          <FaRedo className={refreshing ? "spinning" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      {applications.length > 0 && (
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
              <h3>{stats.pending + stats.processing}</h3>
              <p>In Progress</p>
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
      )}

      {/* Search and Filter */}
      <div className="applications-filter-bar">
        <div className="search-box-app">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by scheme or application ID..."
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
            All ({applications.length})
          </button>
          <button
            className={`filter-tab ${filterStatus === "approved" ? "active" : ""}`}
            onClick={() => setFilterStatus("approved")}
          >
            Approved ({stats.approved})
          </button>
          <button
            className={`filter-tab ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending ({stats.pending})
          </button>
          <button
            className={`filter-tab ${filterStatus === "processing" ? "active" : ""}`}
            onClick={() => setFilterStatus("processing")}
          >
            Processing ({stats.processing})
          </button>
          <button
            className={`filter-tab ${filterStatus === "rejected" ? "active" : ""}`}
            onClick={() => setFilterStatus("rejected")}
          >
            Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-state-app">
          <FaExclamationTriangle className="error-icon" />
          <p>{error}</p>
          <button onClick={refreshApplications} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {/* Applications List */}
      {!error && (
        <div className="applications-list">
          {filteredApplications.length === 0 ? (
            <div className="no-applications">
              {applications.length === 0 ? (
                <>
                  <p>You haven't applied for any schemes yet.</p>
                  <button
                    className="browse-schemes-btn"
                    onClick={() =>
                      (window.location.href = "/dashboard/recommended")
                    }
                  >
                    Browse Schemes
                  </button>
                </>
              ) : (
                <p>No applications match your filters</p>
              )}
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.applicationId || app.id}
                className="application-card"
              >
                <div className="app-card-header">
                  <div className="app-title">
                    <h3>{app.schemeName}</h3>
                    <span className="app-reference">
                      ID: {app.applicationId}
                    </span>
                  </div>
                  <span className={getStatusClass(app.status)}>
                    {getStatusIcon(app.status)}
                    <span>
                      {app.status?.charAt(0).toUpperCase() +
                        app.status?.slice(1)}
                    </span>
                  </span>
                </div>

                <div className="app-card-body">
                  <div className="app-detail-grid">
                    <div className="app-detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <div>
                        <span className="detail-label">Applied On</span>
                        <span className="detail-value">
                          {formatDate(app.appliedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="app-detail-item">
                      <FaClock className="detail-icon" />
                      <div>
                        <span className="detail-label">Last Updated</span>
                        <span className="detail-value">
                          {formatDate(app.updatedAt || app.appliedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="app-detail-item">
                      <FaFileAlt className="detail-icon" />
                      <div>
                        <span className="detail-label">Status</span>
                        <span className="detail-value status-text">
                          {app.status?.charAt(0).toUpperCase() +
                            app.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {app.status === "rejected" && app.notes && (
                    <div className="rejection-reason">
                      <strong>Reason:</strong> {app.notes}
                    </div>
                  )}
                </div>

                <div className="app-card-footer">
                  <button
                    className="app-action-btn view"
                    onClick={() => handleViewDetails(app)}
                  >
                    <FaEye /> View Details
                  </button>
                  <button
                    className="app-action-btn download"
                    onClick={() => downloadApplicationForm(app)}
                  >
                    <FaDownload /> Download Form
                  </button>
                  {(app.status === "pending" ||
                    app.status === "processing") && (
                    <button className="app-action-btn track" disabled>
                      <FaClock /> In Progress
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="application-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Application Details</h3>
              <button
                className="close-modal"
                onClick={() => setShowDetailsModal(false)}
              >
                <FaTimesCircle />
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-section">
                <h4>Application Information</h4>
                <div className="detail-row">
                  <span className="detail-label">Application ID:</span>
                  <span className="detail-value">
                    {selectedApplication.applicationId}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Scheme Name:</span>
                  <span className="detail-value">
                    {selectedApplication.schemeName}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`status-badge ${selectedApplication.status}`}
                  >
                    {selectedApplication.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Applied Date:</span>
                  <span className="detail-value">
                    {formatDate(selectedApplication.appliedDate)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">
                    {formatDate(selectedApplication.updatedAt)}
                  </span>
                </div>
              </div>

              {selectedApplication.documents?.length > 0 && (
                <div className="detail-section">
                  <h4>Uploaded Documents</h4>
                  <div className="documents-list">
                    {selectedApplication.documents.map((doc, idx) => (
                      <div key={idx} className="document-item">
                        <FaFileAlt /> {doc.name}
                        <span className="doc-date">
                          Uploaded: {formatDate(doc.uploadedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedApplication.notes && (
                <div className="detail-section">
                  <h4>Additional Notes</h4>
                  <p>{selectedApplication.notes}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="download-btn"
                onClick={() => downloadApplicationForm(selectedApplication)}
              >
                <FaDownload /> Download Form
              </button>
              <button
                className="close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
