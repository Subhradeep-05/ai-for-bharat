import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileImage,
  FaFileWord,
  FaFileExcel,
  FaFile,
  FaUpload,
  FaDownload,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPlus,
  FaFolder,
  FaSearch,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const DocumentVault = ({ user }) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Documents", icon: <FaFolder /> },
    { id: "identity", name: "Identity Proof", icon: "🆔" },
    { id: "income", name: "Income Proof", icon: "💰" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "land", name: "Land Records", icon: "🌾" },
    { id: "caste", name: "Caste Certificate", icon: "📜" },
    { id: "bank", name: "Bank Details", icon: "🏦" },
    { id: "other", name: "Other", icon: "📁" },
  ];

  const documents = [
    {
      id: 1,
      name: "Aadhaar Card",
      category: "identity",
      type: "pdf",
      size: "2.4 MB",
      uploadedOn: "2024-03-15",
      status: "verified",
      expiry: "N/A",
      tags: ["Government ID", "Universal"],
    },
    {
      id: 2,
      name: "PAN Card",
      category: "identity",
      type: "pdf",
      size: "1.2 MB",
      uploadedOn: "2024-03-14",
      status: "verified",
      expiry: "N/A",
      tags: ["Tax", "Identity"],
    },
    {
      id: 3,
      name: "Income Certificate",
      category: "income",
      type: "pdf",
      size: "3.1 MB",
      uploadedOn: "2024-03-10",
      status: "pending",
      expiry: "2025-03-10",
      tags: ["Income Proof", "Tehsildar Signed"],
    },
    {
      id: 4,
      name: "10th Marksheet",
      category: "education",
      type: "pdf",
      size: "1.8 MB",
      uploadedOn: "2024-03-05",
      status: "verified",
      expiry: "N/A",
      tags: ["Education", "Board"],
    },
    {
      id: 5,
      name: "Caste Certificate",
      category: "caste",
      type: "pdf",
      size: "2.2 MB",
      uploadedOn: "2024-03-01",
      status: "verified",
      expiry: "N/A",
      tags: ["SC/ST/OBC", "Certificate"],
    },
    {
      id: 6,
      name: "Bank Passbook",
      category: "bank",
      type: "image",
      size: "4.5 MB",
      uploadedOn: "2024-02-28",
      status: "verified",
      expiry: "N/A",
      tags: ["Bank Details", "IFSC Code"],
    },
    {
      id: 7,
      name: "Land Records",
      category: "land",
      type: "pdf",
      size: "5.2 MB",
      uploadedOn: "2024-02-25",
      status: "rejected",
      expiry: "N/A",
      tags: ["Land", "Agriculture"],
      rejectionReason: "Document not clear, please upload clear copy",
    },
    {
      id: 8,
      name: "Voter ID",
      category: "identity",
      type: "pdf",
      size: "1.5 MB",
      uploadedOn: "2024-02-20",
      status: "verified",
      expiry: "N/A",
      tags: ["Voting", "Address Proof"],
    },
    {
      id: 9,
      name: "Driving License",
      category: "identity",
      type: "image",
      size: "3.2 MB",
      uploadedOn: "2024-02-15",
      status: "expired",
      expiry: "2024-01-15",
      tags: ["License", "Transport"],
    },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="file-icon pdf" />;
      case "image":
        return <FaFileImage className="file-icon image" />;
      case "word":
        return <FaFileWord className="file-icon word" />;
      case "excel":
        return <FaFileExcel className="file-icon excel" />;
      default:
        return <FaFile className="file-icon generic" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <span className="status-badge-doc verified">
            <FaCheckCircle /> Verified
          </span>
        );
      case "pending":
        return (
          <span className="status-badge-doc pending">
            <FaClock /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="status-badge-doc rejected">
            <FaTimesCircle /> Rejected
          </span>
        );
      case "expired":
        return (
          <span className="status-badge-doc expired">
            <FaTimesCircle /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    if (selectedCategory !== "all" && doc.category !== selectedCategory)
      return false;
    if (
      searchTerm &&
      !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    )
      return false;
    return true;
  });

  const stats = {
    total: documents.length,
    verified: documents.filter((d) => d.status === "verified").length,
    pending: documents.filter((d) => d.status === "pending").length,
    rejected: documents.filter((d) => d.status === "rejected").length,
  };

  return (
    <div className="document-vault">
      <div className="vault-header">
        <h2>📁 Document Vault</h2>
        <p className="section-description">
          Store and manage all your documents in one secure place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="doc-stats">
        <div className="stat-card-doc">
          <div className="stat-icon-doc total">
            <FaFolder />
          </div>
          <div className="stat-info-doc">
            <h3>{stats.total}</h3>
            <p>Total Documents</p>
          </div>
        </div>

        <div className="stat-card-doc">
          <div className="stat-icon-doc verified">
            <FaCheckCircle />
          </div>
          <div className="stat-info-doc">
            <h3>{stats.verified}</h3>
            <p>Verified</p>
          </div>
        </div>

        <div className="stat-card-doc">
          <div className="stat-icon-doc pending">
            <FaClock />
          </div>
          <div className="stat-info-doc">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card-doc">
          <div className="stat-icon-doc rejected">
            <FaTimesCircle />
          </div>
          <div className="stat-info-doc">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="vault-action-bar">
        <div className="search-box-doc">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="doc-search-input"
          />
        </div>

        <button className="upload-btn" onClick={() => setUploadModal(true)}>
          <FaUpload /> Upload Document
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${
              selectedCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="documents-grid">
        {filteredDocuments.length === 0 ? (
          <div className="no-documents">
            <p>No documents found</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="doc-card-header">
                {getFileIcon(doc.type)}
                <div className="doc-title">
                  <h3>{doc.name}</h3>
                  <span className="doc-category">
                    {categories.find((c) => c.id === doc.category)?.name}
                  </span>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              <div className="doc-card-body">
                <div className="doc-meta">
                  <span className="doc-size">{doc.size}</span>
                  <span className="doc-date">Uploaded: {doc.uploadedOn}</span>
                </div>

                {doc.expiry !== "N/A" && (
                  <div className="doc-expiry">
                    <span>Expires: {doc.expiry}</span>
                    {doc.status === "expired" && (
                      <span className="expiry-warning">Expired</span>
                    )}
                  </div>
                )}

                <div className="doc-tags">
                  {doc.tags.map((tag, idx) => (
                    <span key={idx} className="doc-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {doc.status === "rejected" && doc.rejectionReason && (
                  <div className="doc-rejection">{doc.rejectionReason}</div>
                )}
              </div>

              <div className="doc-card-footer">
                <button className="doc-action view">
                  <FaEye /> View
                </button>
                <button className="doc-action download">
                  <FaDownload /> Download
                </button>
                {doc.status === "rejected" && (
                  <button className="doc-action reupload">
                    <FaUpload /> Re-upload
                  </button>
                )}
                <button className="doc-action delete">
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="modal-overlay" onClick={() => setUploadModal(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Upload New Document</h3>

            <div className="upload-form">
              <div className="form-group">
                <label>Document Type</label>
                <select className="form-select">
                  <option>Identity Proof</option>
                  <option>Income Proof</option>
                  <option>Education Certificate</option>
                  <option>Land Records</option>
                  <option>Caste Certificate</option>
                  <option>Bank Details</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Document Name</label>
                <input
                  type="text"
                  placeholder="e.g., Aadhaar Card"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Upload File</label>
                <div className="file-upload-area">
                  <input type="file" id="file-upload" hidden />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <FaPlus />
                    <span>Click to browse or drag and drop</span>
                    <span className="file-hint">PDF, JPG, PNG (Max 10MB)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Expiry Date (if applicable)</label>
                <input type="date" className="form-input" />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Government ID, Address Proof"
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setUploadModal(false)}
                >
                  Cancel
                </button>
                <button className="upload-submit-btn">
                  <FaUpload /> Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;
