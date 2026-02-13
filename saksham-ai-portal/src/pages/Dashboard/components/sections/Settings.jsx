import React, { useState } from "react";
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
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const Settings = ({ user, setUser }) => {
  const [activeSetting, setActiveSetting] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Raj Kumar",
    email: user?.email || "raj@example.com",
    phone: user?.phone || "9876543210",
    state: user?.state || "Uttar Pradesh",
    district: user?.district || "Lucknow",
    address: "123, Main Street, Sector 62",
    occupation: "Farmer",
    income: "120000",
    category: "General",
    dob: "1990-05-15",
    gender: "Male",
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "light",
    notifications: {
      email: true,
      sms: true,
      push: false,
      schemeUpdates: true,
      applicationStatus: true,
      newsletter: false,
    },
    voice: {
      enabled: true,
      language: "hi-IN",
      speed: "normal",
      gender: "female",
    },
    privacy: {
      showProfile: false,
      dataSharing: true,
      analytics: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
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

  const handleSaveProfile = () => {
    // API call to save profile
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleExportData = () => {
    alert(
      "Your data export has been initiated. You will receive an email shortly.",
    );
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    alert(
      "Account deletion request submitted. You will receive a confirmation email.",
    );
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
            <button className="danger-btn" onClick={handleExportData}>
              <FaDownload /> Export Data
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
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSaveProfile}>
                      <FaSave /> Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="state"
                      value={profileData.state}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option>Uttar Pradesh</option>
                      <option>Bihar</option>
                      <option>Madhya Pradesh</option>
                      <option>Rajasthan</option>
                      <option>Maharashtra</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>District</label>
                    <input
                      type="text"
                      name="district"
                      value={profileData.district}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Occupation</label>
                    <select
                      name="occupation"
                      value={profileData.occupation}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option>Farmer</option>
                      <option>Student</option>
                      <option>Self Employed</option>
                      <option>Government Employee</option>
                      <option>Private Employee</option>
                      <option>Unemployed</option>
                      <option>Retired</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Annual Income (₹)</label>
                    <input
                      type="number"
                      name="income"
                      value={profileData.income}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
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
                      <option>General</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>OBC</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
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
                  />
                </div>
              </div>
            </div>
          )}

          {/* App Preferences */}
          {activeSetting === "preferences" && (
            <div className="preferences-settings">
              <h3>App Preferences</h3>

              <div className="preference-item">
                <div className="preference-info">
                  <FaMoon className="pref-icon" />
                  <div>
                    <h4>Dark Mode</h4>
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
                    <p>Enable voice features</p>
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

              <div className="preference-item">
                <div className="preference-info">
                  <FaMicrophone className="pref-icon" />
                  <div>
                    <h4>Voice Input Language</h4>
                    <p>Select language for voice commands</p>
                  </div>
                </div>
                <select
                  value={preferences.voice.language}
                  onChange={(e) =>
                    handlePreferenceChange("voice", "language", e.target.value)
                  }
                  className="pref-select"
                  disabled={!preferences.voice.enabled}
                >
                  <option value="hi-IN">हिंदी</option>
                  <option value="en-IN">English (India)</option>
                  <option value="ta-IN">தமிழ்</option>
                  <option value="te-IN">తెలుగు</option>
                  <option value="bn-IN">বাংলা</option>
                </select>
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

              <div className="notification-group">
                <h4>SMS Notifications</h4>
                <div className="notification-items">
                  <div className="notification-item">
                    <span>Application Updates</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.sms}
                        onChange={(e) =>
                          handleNotificationChange("sms", e.target.checked)
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <span>OTP Verification</span>
                    <label className="switch">
                      <input type="checkbox" checked={true} disabled />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="notification-group">
                <h4>Push Notifications</h4>
                <div className="notification-items">
                  <div className="notification-item">
                    <span>Browser Notifications</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={preferences.notifications.push}
                        onChange={(e) =>
                          handleNotificationChange("push", e.target.checked)
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

              <div className="voice-section">
                <h4>Voice Assistant Settings</h4>

                <div className="voice-option">
                  <span>Enable Voice Assistant</span>
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
                    disabled={!preferences.voice.enabled}
                  >
                    <option value="hi-IN">हिंदी</option>
                    <option value="en-IN">English (India)</option>
                    <option value="ta-IN">தமிழ்</option>
                    <option value="te-IN">తెలుగు</option>
                    <option value="bn-IN">বাংলা</option>
                    <option value="mr-IN">मराठी</option>
                    <option value="gu-IN">ગુજરાતી</option>
                    <option value="pa-IN">ਪੰਜਾਬੀ</option>
                  </select>
                </div>

                <div className="voice-option">
                  <span>Voice Speed</span>
                  <select
                    value={preferences.voice.speed}
                    onChange={(e) =>
                      handlePreferenceChange("voice", "speed", e.target.value)
                    }
                    disabled={!preferences.voice.enabled}
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
                      handlePreferenceChange("voice", "gender", e.target.value)
                    }
                    disabled={!preferences.voice.enabled}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
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
                    />
                  </div>

                  <button
                    className="change-password-btn"
                    onClick={handleChangePassword}
                  >
                    <FaKey /> Update Password
                  </button>
                </div>
              </div>

              <div className="two-factor-section">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
                <button className="enable-2fa-btn">Enable 2FA</button>
              </div>

              <div className="privacy-section">
                <h4>Privacy Settings</h4>

                <div className="privacy-item">
                  <div>
                    <h5>Profile Visibility</h5>
                    <p>Allow others to see your profile</p>
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
                <div className="session-item">
                  <FaMobile className="session-icon" />
                  <div className="session-info">
                    <h5>Current Device</h5>
                    <p>Chrome on Windows • Last active now</p>
                  </div>
                  <span className="current-badge">Current</span>
                </div>

                <div className="session-item">
                  <FaMobile className="session-icon" />
                  <div className="session-info">
                    <h5>Mobile App</h5>
                    <p>Last active 2 days ago</p>
                  </div>
                  <button className="revoke-btn">Revoke</button>
                </div>

                <button className="logout-all-btn">
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
              <p>
                ⚠️ All your data including applications, documents, and
                preferences will be permanently deleted.
              </p>
            </div>
            <div className="delete-modal-actions">
              <button
                className="cancel-delete"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-delete" onClick={handleDeleteAccount}>
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
