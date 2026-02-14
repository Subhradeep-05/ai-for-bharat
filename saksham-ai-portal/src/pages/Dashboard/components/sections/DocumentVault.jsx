import React, { useState, useEffect } from "react";
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
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { documentAPI } from "@/services/documentAPI";
import "/src/pages/Dashboard/dashboard-sections.css";

const DocumentVault = ({ user }) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    rejected: 0,
  });
  const [uploadForm, setUploadForm] = useState({
    documentType: "",
    category: "",
    documentName: "",
    expiryDate: "",
    tags: "",
    referenceNumber: "",
  });

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

  const documentTypes = [
    { id: "aadhaar", name: "Aadhaar Card", category: "identity" },
    { id: "pan", name: "PAN Card", category: "identity" },
    { id: "voter", name: "Voter ID", category: "identity" },
    { id: "driving", name: "Driving License", category: "identity" },
    { id: "income", name: "Income Certificate", category: "income" },
    { id: "salary", name: "Salary Slip", category: "income" },
    { id: "bank", name: "Bank Statement", category: "bank" },
    { id: "passbook", name: "Bank Passbook", category: "bank" },
    { id: "caste", name: "Caste Certificate", category: "caste" },
    { id: "land", name: "Land Records", category: "land" },
    { id: "education", name: "Education Certificate", category: "education" },
    { id: "marksheet", name: "Marksheet", category: "education" },
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentAPI.getDocuments();
      if (response.success) {
        setDocuments(response.documents);

        // Calculate stats
        const newStats = {
          total: response.documents.length,
          verified: response.documents.filter((d) => d.status === "verified")
            .length,
          pending: response.documents.filter((d) => d.status === "pending")
            .length,
          rejected: response.documents.filter((d) => d.status === "rejected")
            .length,
        };
        setStats(newStats);
      }
    } catch (err) {
      console.error("Error fetching documents:", err);
      setError("Failed to load documents. Please try again.");

      // Set mock data for demo if API fails
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    const mockDocs = [
      {
        id: "mock1",
        name: "Aadhaar Card",
        category: "identity",
        type: "pdf",
        size: 2.4 * 1024 * 1024,
        sizeDisplay: "2.4 MB",
        uploadedOn: "2024-03-15",
        status: "verified",
        expiryDate: "N/A",
        tags: ["Government ID", "Universal"],
      },
      {
        id: "mock2",
        name: "PAN Card",
        category: "identity",
        type: "pdf",
        size: 1.2 * 1024 * 1024,
        sizeDisplay: "1.2 MB",
        uploadedOn: "2024-03-14",
        status: "verified",
        expiryDate: "N/A",
        tags: ["Tax", "Identity"],
      },
      {
        id: "mock3",
        name: "Income Certificate",
        category: "income",
        type: "pdf",
        size: 3.1 * 1024 * 1024,
        sizeDisplay: "3.1 MB",
        uploadedOn: "2024-03-10",
        status: "pending",
        expiryDate: "2025-03-10",
        tags: ["Income Proof", "Tehsildar Signed"],
      },
      {
        id: "mock4",
        name: "Caste Certificate",
        category: "caste",
        type: "pdf",
        size: 2.2 * 1024 * 1024,
        sizeDisplay: "2.2 MB",
        uploadedOn: "2024-03-01",
        status: "rejected",
        expiryDate: "N/A",
        tags: ["SC/ST/OBC", "Certificate"],
        rejectionReason: "Document not clear, please upload clear copy",
      },
    ];

    setDocuments(mockDocs);
    setStats({
      total: 4,
      verified: 2,
      pending: 1,
      rejected: 1,
    });
  };

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (1MB limit)
    if (file.size > 1 * 1024 * 1024) {
      setUploadError(
        "File size exceeds 1MB limit. Please select a smaller file.",
      );
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setUploadError(null);

    // Create file preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }

    // Auto-fill document name from filename
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setUploadForm((prev) => ({
      ...prev,
      documentName: nameWithoutExt,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-fill category when document type is selected
    if (name === "documentType") {
      const selected = documentTypes.find((dt) => dt.id === value);
      if (selected) {
        setUploadForm((prev) => ({
          ...prev,
          category: selected.category,
        }));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload");
      return;
    }

    if (!uploadForm.documentType || !uploadForm.documentName) {
      setUploadError("Please fill in all required fields");
      return;
    }

    setUploadLoading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("documentType", uploadForm.documentType);
    formData.append("category", uploadForm.category);
    formData.append("documentName", uploadForm.documentName);
    formData.append("expiryDate", uploadForm.expiryDate);
    formData.append("tags", uploadForm.tags);
    formData.append("referenceNumber", uploadForm.referenceNumber);

    try {
      const response = await documentAPI.uploadDocument(formData);

      if (response.success) {
        setUploadSuccess(true);
        setUploadModal(false);

        // Reset form
        setUploadForm({
          documentType: "",
          category: "",
          documentName: "",
          expiryDate: "",
          tags: "",
          referenceNumber: "",
        });
        setSelectedFile(null);
        setFilePreview(null);

        // Refresh documents list
        await fetchDocuments();

        // Show success message
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload document");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleViewDocument = async (doc) => {
    try {
      if (doc.fileUrl) {
        // For real files from backend
        window.open(`http://localhost:5000${doc.fileUrl}`, "_blank");
      } else {
        // For mock data
        alert(`View document: ${doc.name}`);
      }
    } catch (err) {
      console.error("Error viewing document:", err);
    }
  };

  const handleDownloadDocument = async (doc) => {
    try {
      if (doc.fileUrl) {
        // For real files from backend
        const response = await documentAPI.downloadDocument(doc.fileKey);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          doc.name + (doc.type === "pdf" ? ".pdf" : ".jpg"),
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        // For mock data
        alert(`Download document: ${doc.name}`);
      }
    } catch (err) {
      console.error("Error downloading document:", err);
    }
  };

  const handleDeleteDocument = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const response = await documentAPI.deleteDocument(docId);
      if (response.success) {
        await fetchDocuments();
      }
    } catch (err) {
      console.error("Error deleting document:", err);
      alert("Failed to delete document");
    }
  };

  const handleReupload = (doc) => {
    setUploadForm({
      documentType: doc.documentType || "",
      category: doc.category,
      documentName: doc.name,
      expiryDate: "",
      tags: doc.tags?.join(", ") || "",
      referenceNumber: doc.referenceNumber || "",
    });
    setUploadModal(true);
  };

  const filteredDocuments = documents.filter((doc) => {
    if (selectedCategory !== "all" && doc.category !== selectedCategory)
      return false;
    if (
      searchTerm &&
      !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    )
      return false;
    return true;
  });

  if (loading) {
    return (
      <div className="document-vault loading-state">
        <div className="loading-spinner"></div>
        <p>Loading your documents...</p>
      </div>
    );
  }

  return (
    <div className="document-vault">
      <div className="vault-header">
        <h2>📁 Document Vault</h2>
        <p className="section-description">
          Store and manage all your documents in one secure place
        </p>
      </div>

      {/* Success Message */}
      {uploadSuccess && (
        <div className="status-message success">
          <FaCheckCircle />
          <span>
            Document uploaded successfully! It will be verified shortly.
          </span>
        </div>
      )}

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
            <p>Pending Verification</p>
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
            placeholder="Search documents by name or tags..."
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
            <FaFolder size={48} color="#ccc" />
            <h3>No documents found</h3>
            <p>
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Upload your first document to get started"}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <button
                className="upload-btn"
                onClick={() => setUploadModal(true)}
              >
                <FaUpload /> Upload Document
              </button>
            )}
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="document-card">
              <div className="doc-card-header">
                {getFileIcon(doc.type)}
                <div className="doc-title">
                  <h3>{doc.name}</h3>
                  <span className="doc-category">
                    {categories.find((c) => c.id === doc.category)?.name ||
                      doc.categoryDisplay}
                  </span>
                </div>
                {getStatusBadge(doc.status)}
              </div>

              <div className="doc-card-body">
                <div className="doc-meta">
                  <span className="doc-size">
                    {doc.sizeDisplay || doc.size}
                  </span>
                  <span className="doc-date">Uploaded: {doc.uploadedOn}</span>
                </div>

                {doc.expiryDate && doc.expiryDate !== "N/A" && (
                  <div className="doc-expiry">
                    <span>Expires: {doc.expiryDate}</span>
                    {doc.status === "expired" && (
                      <span className="expiry-warning">Expired</span>
                    )}
                  </div>
                )}

                {doc.tags && doc.tags.length > 0 && (
                  <div className="doc-tags">
                    {doc.tags.map((tag, idx) => (
                      <span key={idx} className="doc-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {doc.status === "rejected" && doc.rejectionReason && (
                  <div className="doc-rejection">
                    <FaInfoCircle />
                    <span>{doc.rejectionReason}</span>
                  </div>
                )}
              </div>

              <div className="doc-card-footer">
                <button
                  className="doc-action view"
                  onClick={() => handleViewDocument(doc)}
                >
                  <FaEye /> View
                </button>
                <button
                  className="doc-action download"
                  onClick={() => handleDownloadDocument(doc)}
                >
                  <FaDownload /> Download
                </button>
                {doc.status === "rejected" && (
                  <button
                    className="doc-action reupload"
                    onClick={() => handleReupload(doc)}
                  >
                    <FaUpload /> Re-upload
                  </button>
                )}
                <button
                  className="doc-action delete"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
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

            {uploadError && (
              <div className="status-message error">
                <FaExclamationTriangle />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="upload-form">
              <div className="form-group">
                <label>Document Type *</label>
                <select
                  name="documentType"
                  value={uploadForm.documentType}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Document Type</option>
                  {documentTypes.map((dt) => (
                    <option key={dt.id} value={dt.id}>
                      {dt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Document Name *</label>
                <input
                  type="text"
                  name="documentName"
                  value={uploadForm.documentName}
                  onChange={handleInputChange}
                  placeholder="e.g., Aadhaar Card"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Reference Number (if applicable)</label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={uploadForm.referenceNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., Aadhaar Number, PAN Number"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Upload File * (Max 1MB)</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                    hidden
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    {selectedFile ? (
                      <>
                        <FaCheckCircle style={{ color: "#4CAF50" }} />
                        <span>{selectedFile.name}</span>
                        <span className="file-hint">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </span>
                      </>
                    ) : (
                      <>
                        <FaPlus />
                        <span>Click to browse or drag and drop</span>
                        <span className="file-hint">
                          PDF, JPG, PNG, DOC, XLS (Max 1MB)
                        </span>
                      </>
                    )}
                  </label>
                </div>
                {filePreview && (
                  <div className="file-preview">
                    <img
                      src={filePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "100px" }}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Expiry Date (if applicable)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={uploadForm.expiryDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={uploadForm.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., Government ID, Address Proof"
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setUploadModal(false);
                    setSelectedFile(null);
                    setFilePreview(null);
                    setUploadError(null);
                    setUploadForm({
                      documentType: "",
                      category: "",
                      documentName: "",
                      expiryDate: "",
                      tags: "",
                      referenceNumber: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="upload-submit-btn"
                  onClick={handleUpload}
                  disabled={uploadLoading}
                >
                  {uploadLoading ? (
                    <>
                      <FaSpinner className="spinning" /> Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload /> Upload Document
                    </>
                  )}
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
