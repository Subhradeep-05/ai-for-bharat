import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBell,
  FaLanguage,
  FaLock,
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaMicrophone,
  FaGlobe,
  FaSave,
  FaKey,
  FaMobile,
  FaEnvelope,
  FaTrash,
  FaDownload,
  FaSignOutAlt,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFilePdf,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { authAPI } from "@/services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import as default
import "/src/pages/Dashboard/dashboard-sections.css";

const Settings = ({ user, setUser }) => {
  const [activeSetting, setActiveSetting] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [error, setError] = useState(null);

  // Profile Data from actual user
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    state: user?.state || "",
    district: user?.district || "",
    address: user?.address || "",
    occupation: user?.occupation || "",
    annualIncome: user?.annualIncome || "",
    category: user?.category || "General",
    dob: user?.dob || "",
    gender: user?.gender || "",
    aadhaar: user?.aadhaar || "",
    pan: user?.pan || "",
  });

  const [preferences, setPreferences] = useState({
    language: user?.preferences?.language || "English",
    theme: user?.preferences?.theme || "light",
    notifications: {
      email: user?.preferences?.notifications?.email ?? true,
      sms: user?.preferences?.notifications?.sms ?? false,
      push: user?.preferences?.notifications?.push ?? false,
      schemeUpdates: user?.preferences?.notifications?.schemeUpdates ?? true,
      applicationStatus:
        user?.preferences?.notifications?.applicationStatus ?? true,
      newsletter: user?.preferences?.notifications?.newsletter ?? false,
    },
    voice: {
      enabled: user?.preferences?.voice?.enabled ?? false,
      language: user?.preferences?.voice?.language || "hi-IN",
      speed: user?.preferences?.voice?.speed || "normal",
      gender: user?.preferences?.voice?.gender || "female",
    },
    privacy: {
      showProfile: user?.preferences?.privacy?.showProfile ?? false,
      dataSharing: user?.preferences?.privacy?.dataSharing ?? true,
      analytics: user?.preferences?.privacy?.analytics ?? true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [sessions, setSessions] = useState([]);

  // Fetch user sessions on mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      // Mock sessions - replace with actual API call
      setSessions([
        {
          id: 1,
          device: "Chrome on Windows",
          lastActive: "now",
          current: true,
        },
        {
          id: 2,
          device: "Mobile App",
          lastActive: "2 days ago",
          current: false,
        },
      ]);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setSaveStatus(null);
  };

  const handlePreferenceChange = (section, field, value) => {
    setPreferences({
      ...preferences,
      [section]: {
        ...preferences[section],
        [field]: value,
      },
    });
  };

  const handleNotificationChange = (key, value) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [key]: value,
      },
    });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate required fields for eligibility
      const requiredFields = [
        "name",
        "email",
        "phone",
        "dob",
        "gender",
        "state",
        "occupation",
      ];
      const missingFields = requiredFields.filter(
        (field) => !profileData[field],
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill required fields: ${missingFields.join(", ")}`,
        );
      }

      // API call to update profile
      const response = await authAPI.updateProfile(profileData);

      if (response.success) {
        setSaveStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
        setIsEditing(false);
        // Update local user data
        setUser((prev) => ({ ...prev, ...profileData }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...profileData }),
        );
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err.message);
      setSaveStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.success) {
        setSaveStatus({
          type: "success",
          message: "Password changed successfully!",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(response.message || "Failed to change password");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleExportData = async () => {
    setExportLoading(true);

    try {
      // Create new PDF document
      const doc = new jsPDF();

      // Add header
      doc.setFillColor(102, 126, 234);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text("Saarthi AI", 20, 25);
      doc.setFontSize(12);
      doc.text("User Profile Report", 20, 35);

      // User Information
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.text("Personal Information", 20, 55);

      doc.setFontSize(11);
      const personalInfo = [
        { label: "Name", value: profileData.name || "Not provided" },
        { label: "Email", value: profileData.email || "Not provided" },
        { label: "Phone", value: profileData.phone || "Not provided" },
        { label: "Date of Birth", value: profileData.dob || "Not provided" },
        { label: "Gender", value: profileData.gender || "Not provided" },
        { label: "Aadhaar", value: profileData.aadhaar || "Not provided" },
        { label: "PAN", value: profileData.pan || "Not provided" },
      ];

      let yPos = 70;
      personalInfo.forEach((info) => {
        doc.text(`${info.label}: ${info.value}`, 20, yPos);
        yPos += 10;
      });

      // Address
      doc.setFontSize(16);
      doc.text("Address", 20, yPos + 5);
      doc.setFontSize(11);
      yPos += 15;
      doc.text(`${profileData.address || "Not provided"}`, 20, yPos);
      yPos += 7;
      doc.text(
        `${profileData.district || ""} ${profileData.state || ""}`.trim() ||
          "Not provided",
        20,
        yPos,
      );

      // Professional Information
      yPos += 15;
      doc.setFontSize(16);
      doc.text("Professional Information", 20, yPos);
      doc.setFontSize(11);
      yPos += 10;

      const professionalInfo = [
        {
          label: "Occupation",
          value: profileData.occupation || "Not provided",
        },
        {
          label: "Annual Income",
          value: profileData.annualIncome
            ? `₹${profileData.annualIncome}`
            : "Not provided",
        },
        { label: "Category", value: profileData.category || "Not provided" },
      ];

      professionalInfo.forEach((info) => {
        doc.text(`${info.label}: ${info.value}`, 20, yPos);
        yPos += 10;
      });

      // Eligibility Summary - New Page
      doc.addPage();

      // Header for new page
      doc.setFillColor(102, 126, 234);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text("Eligibility Summary", 20, 20);

      // Calculate age
      const age = profileData.dob
        ? calculateAge(profileData.dob)
        : "Not provided";

      // Create eligibility table using autoTable
      autoTable(doc, {
        // Note: autoTable(doc, options) syntax
        startY: 40,
        head: [["Criteria", "Value"]],
        body: [
          ["Age", age],
          [
            "Income",
            profileData.annualIncome
              ? `₹${profileData.annualIncome}`
              : "Not provided",
          ],
          ["Category", profileData.category || "Not provided"],
          ["Occupation", profileData.occupation || "Not provided"],
          ["State", profileData.state || "Not provided"],
        ],
        theme: "grid",
        headStyles: { fillColor: [102, 126, 234] },
        styles: { fontSize: 10 },
        columnStyles: { 0: { fontStyle: "bold" } },
      });

      // Scheme Recommendations
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(
        "Recommended Schemes Based on Profile",
        20,
        doc.lastAutoTable.finalY + 20,
      );

      // Recommended schemes based on eligibility
      const recommendedSchemes = [];

      // Add logic for scheme recommendations based on profile
      if (profileData.occupation === "Farmer") {
        recommendedSchemes.push([
          "PM Kisan Samman Nidhi",
          "Agriculture",
          "95%",
        ]);
        recommendedSchemes.push(["PM Fasal Bima Yojana", "Agriculture", "90%"]);
      }
      if (profileData.annualIncome < 500000) {
        recommendedSchemes.push(["Ayushman Bharat", "Health", "85%"]);
        recommendedSchemes.push(["PM Awas Yojana", "Housing", "80%"]);
      }
      if (profileData.category === "SC" || profileData.category === "ST") {
        recommendedSchemes.push([
          "Post Matric Scholarship",
          "Education",
          "92%",
        ]);
      }

      // Add default if no recommendations
      if (recommendedSchemes.length === 0) {
        recommendedSchemes.push([
          "PM Kisan Samman Nidhi",
          "Agriculture",
          "75%",
        ]);
        recommendedSchemes.push(["Ayushman Bharat", "Health", "70%"]);
      }

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 30,
        head: [["Scheme", "Category", "Match Score"]],
        body: recommendedSchemes.slice(0, 5), // Show top 5
        theme: "striped",
        headStyles: { fillColor: [102, 126, 234] },
      });

      // Footer with generation date
      const finalY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      const dateStr = new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      doc.text(`Generated on: ${dateStr}`, 20, finalY);
      doc.text("Saarthi AI - Government Scheme Assistant", 20, finalY + 5);
      doc.text("This is a computer generated document.", 20, finalY + 10);

      // Save PDF
      const fileName = `Saarthi_Profile_${profileData.name?.replace(/\s+/g, "_") || "User"}_${Date.now()}.pdf`;
      doc.save(fileName);

      setSaveStatus({ type: "success", message: "PDF exported successfully!" });
    } catch (err) {
      console.error("Export error:", err);
      setError("Failed to export PDF: " + err.message);
    } finally {
      setExportLoading(false);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "Not provided";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // API call to delete account
      // await authAPI.deleteAccount();
      setShowDeleteModal(false);
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      // API call to logout from all devices
      // await authAPI.logoutAll();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  ];

  const settingTabs = [
    { id: "profile", icon: <FaUser />, label: "Profile Information" },
    { id: "preferences", icon: <FaGlobe />, label: "App Preferences" },
    { id: "notifications", icon: <FaBell />, label: "Notifications" },
    { id: "language", icon: <FaLanguage />, label: "Language & Voice" },
    { id: "security", icon: <FaLock />, label: "Security & Privacy" },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>⚙ Settings</h2>
        <p className="section-description">
          Manage your account preferences and personal information
        </p>
      </div>

      {/* Status Messages */}
      {saveStatus && (
        <div className={`status-message ${saveStatus.type}`}>
          {saveStatus.type === "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationTriangle />
          )}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {error && (
        <div className="status-message error">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      <div className="settings-container">
        {/* Settings Sidebar */}
        <div className="settings-sidebar">
          {settingTabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeSetting === tab.id ? "active" : ""}`}
              onClick={() => setActiveSetting(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          <div className="settings-sidebar-footer">
            <button
              className="danger-btn"
              onClick={handleExportData}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <FaSpinner className="spinning" />
              ) : (
                <FaDownload />
              )}
              {exportLoading ? "Exporting..." : "Export Data"}
            </button>
            <button
              className="danger-btn delete"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {/* Profile Settings */}
          {activeSetting === "profile" && (
            <div className="profile-settings">
              <div className="settings-section-header">
                <h3>Profile Information</h3>
                {!isEditing ? (
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button
                      className="save-btn"
                      onClick={handleSaveProfile}
                      disabled={loading}
                    >
                      {loading ? (
                        <FaSpinner className="spinning" />
                      ) : (
                        <FaSave />
                      )}
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          name: user?.name || "",
                          email: user?.email || "",
                          phone: user?.phone || "",
                          state: user?.state || "",
                          district: user?.district || "",
                          address: user?.address || "",
                          occupation: user?.occupation || "",
                          annualIncome: user?.annualIncome || "",
                          category: user?.category || "General",
                          dob: user?.dob || "",
                          gender: user?.gender || "",
                          aadhaar: user?.aadhaar || "",
                          pan: user?.pan || "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={true} // Email cannot be changed
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Aadhaar Number</label>
                    <input
                      type="text"
                      name="aadhaar"
                      value={profileData.aadhaar}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="12-digit Aadhaar number"
                      pattern="[0-9]{12}"
                    />
                  </div>
                  <div className="form-group">
                    <label>PAN Card</label>
                    <input
                      type="text"
                      name="pan"
                      value={profileData.pan}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="10-digit PAN"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>State *</label>
                    <select
                      name="state"
                      value={profileData.state}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option value="">Select State</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>District *</label>
                    <input
                      type="text"
                      name="district"
                      value={profileData.district}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Your district"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Occupation *</label>
                    <select
                      name="occupation"
                      value={profileData.occupation}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option value="">Select Occupation</option>
                      <option value="Farmer">Farmer</option>
                      <option value="Student">Student</option>
                      <option value="Self Employed">Self Employed</option>
                      <option value="Government Employee">
                        Government Employee
                      </option>
                      <option value="Private Employee">Private Employee</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Retired">Retired</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Annual Income (₹)</label>
                    <input
                      type="number"
                      name="annualIncome"
                      value={profileData.annualIncome}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      placeholder="Annual income in rupees"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={profileData.category}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option value="General">General</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="OBC">OBC</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender *</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    rows="3"
                    placeholder="Your complete address"
                  />
                </div>

                {!isEditing && (
                  <div className="eligibility-summary">
                    <h4>Eligibility Summary</h4>
                    <div className="eligibility-badges">
                      <span className="eligibility-badge">
                        Age: {calculateAge(profileData.dob)} years
                      </span>
                      <span className="eligibility-badge">
                        Income: ₹{profileData.annualIncome || "Not specified"}
                      </span>
                      <span className="eligibility-badge">
                        Category: {profileData.category}
                      </span>
                      <span className="eligibility-badge">
                        Occupation: {profileData.occupation || "Not specified"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* App Preferences */}
          {activeSetting === "preferences" && (
            <div className="preferences-settings">
              <h3>App Preferences</h3>

              <div className="preference-item">
                <div className="preference-info">
                  {preferences.theme === "dark" ? (
                    <FaMoon className="pref-icon" />
                  ) : (
                    <FaSun className="pref-icon" />
                  )}
                  <div>
                    <h4>Theme Mode</h4>
                    <p>Switch between light and dark theme</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.theme === "dark"}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        theme: e.target.checked ? "dark" : "light",
                      })
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <FaGlobe className="pref-icon" />
                  <div>
                    <h4>Default Language</h4>
                    <p>Choose your preferred language</p>
                  </div>
                </div>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="pref-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="preference-item">
                <div className="preference-info">
                  <FaVolumeUp className="pref-icon" />
                  <div>
                    <h4>Voice Assistant</h4>
                    <p>Enable voice features for easier navigation</p>
                  </div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={preferences.voice.enabled}
                    onChange={(e) =>
                      handlePreferenceChange(
                        "voice",
                        "enabled",
                        e.target.checked,
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSetting === "notifications" && (
            <div className="notifications-settings">
              <h3>Notification Preferences</h3>

              <div className="notification-group">
                <h4>Email Notifications</h4>
                <div className="notification-items">
                  <div className="notification-item">
                    <span>Scheme Updates</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.schemeUpdates}
                        onChange={(e) =>
                          handleNotificationChange(
                            "schemeUpdates",
                            e.target.checked,
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <span>Application Status</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.applicationStatus}
                        onChange={(e) =>
                          handleNotificationChange(
                            "applicationStatus",
                            e.target.checked,
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <span>Newsletter</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.newsletter}
                        onChange={(e) =>
                          handleNotificationChange(
                            "newsletter",
                            e.target.checked,
                          )
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Language & Voice Settings */}
          {activeSetting === "language" && (
            <div className="language-settings">
              <h3>Language & Voice Settings</h3>

              <div className="language-section">
                <h4>Display Language</h4>
                <div className="language-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`language-option-btn ${
                        preferences.language === lang.name ? "active" : ""
                      }`}
                      onClick={() =>
                        setPreferences({ ...preferences, language: lang.name })
                      }
                    >
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {preferences.voice.enabled && (
                <div className="voice-section">
                  <h4>Voice Assistant Settings</h4>

                  <div className="voice-option">
                    <span>Voice Language</span>
                    <select
                      value={preferences.voice.language}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "voice",
                          "language",
                          e.target.value,
                        )
                      }
                    >
                      <option value="hi-IN">हिंदी</option>
                      <option value="en-IN">English (India)</option>
                      <option value="ta-IN">தமிழ்</option>
                      <option value="te-IN">తెలుగు</option>
                      <option value="bn-IN">বাংলা</option>
                    </select>
                  </div>

                  <div className="voice-option">
                    <span>Voice Speed</span>
                    <select
                      value={preferences.voice.speed}
                      onChange={(e) =>
                        handlePreferenceChange("voice", "speed", e.target.value)
                      }
                    >
                      <option value="slow">Slow</option>
                      <option value="normal">Normal</option>
                      <option value="fast">Fast</option>
                    </select>
                  </div>

                  <div className="voice-option">
                    <span>Voice Gender</span>
                    <select
                      value={preferences.voice.gender}
                      onChange={(e) =>
                        handlePreferenceChange(
                          "voice",
                          "gender",
                          e.target.value,
                        )
                      }
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security & Privacy Settings */}
          {activeSetting === "security" && (
            <div className="security-settings">
              <h3>Security & Privacy</h3>

              <div className="password-section">
                <h4>Change Password</h4>
                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    className="change-password-btn"
                    onClick={handleChangePassword}
                    disabled={loading}
                  >
                    {loading ? <FaSpinner className="spinning" /> : <FaKey />}
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>

              <div className="privacy-section">
                <h4>Privacy Settings</h4>

                <div className="privacy-item">
                  <div>
                    <h5>Profile Visibility</h5>
                    <p>
                      Allow others to see your profile for better scheme
                      matching
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.privacy.showProfile}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          privacy: {
                            ...preferences.privacy,
                            showProfile: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div>
                    <h5>Data Sharing for Scheme Matching</h5>
                    <p>
                      Share anonymized data to improve scheme recommendations
                    </p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.privacy.dataSharing}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          privacy: {
                            ...preferences.privacy,
                            dataSharing: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="privacy-item">
                  <div>
                    <h5>Usage Analytics</h5>
                    <p>Help us improve by sharing usage data</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={preferences.privacy.analytics}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          privacy: {
                            ...preferences.privacy,
                            analytics: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="sessions-section">
                <h4>Active Sessions</h4>
                {sessions.map((session) => (
                  <div key={session.id} className="session-item">
                    <FaMobile className="session-icon" />
                    <div className="session-info">
                      <h5>{session.device}</h5>
                      <p>Last active {session.lastActive}</p>
                    </div>
                    {session.current ? (
                      <span className="current-badge">Current</span>
                    ) : (
                      <button className="revoke-btn">Revoke</button>
                    )}
                  </div>
                ))}

                <button className="logout-all-btn" onClick={handleLogoutAll}>
                  <FaSignOutAlt /> Logout from all devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Account</h3>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="warning-box">
              <FaExclamationTriangle />
              <p>
                All your data including applications, documents, and preferences
                will be permanently deleted.
              </p>
            </div>
            <div className="delete-modal-actions">
              <button
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading ? <FaSpinner className="spinning" /> : null}
                {loading ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
