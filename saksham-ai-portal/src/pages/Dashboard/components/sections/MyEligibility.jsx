import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const MyEligibility = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    age: user?.age || 32,
    occupation: user?.occupation || "Farmer",
    income: user?.income || 120000,
    category: user?.category || "General",
    gender: user?.gender || "Male",
    state: user?.state || "Uttar Pradesh",
    familySize: user?.familySize || 4,
    landOwned: user?.landOwned || "2 acres",
    disability: user?.disability || "None",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const eligibilityResults = [
    {
      scheme: "PM Kisan Samman Nidhi",
      status: "eligible",
      reason: "You are a farmer with land ownership",
      benefit: "₹6,000/year",
      matchScore: 95,
    },
    {
      scheme: "Ayushman Bharat",
      status: "eligible",
      reason: "Family income below ₹2.5L/year",
      benefit: "₹5,00,000 cover",
      matchScore: 88,
    },
    {
      scheme: "PM Scholarship",
      status: "partial",
      reason: "Income slightly above limit, check state quota",
      benefit: "₹12,000/year",
      matchScore: 72,
    },
    {
      scheme: "PM Awas Yojana",
      status: "eligible",
      reason: "Rural area resident with no own house",
      benefit: "₹2,50,000",
      matchScore: 82,
    },
    {
      scheme: "Sukanya Samriddhi",
      status: "eligible",
      reason: "Have 2 girl children below 10 years",
      benefit: "8.2% Interest",
      matchScore: 94,
    },
    {
      scheme: "PM Mudra Yojana",
      status: "partial",
      reason: "Business type qualifies, need credit score check",
      benefit: "₹50,000 - ₹10L",
      matchScore: 68,
    },
    {
      scheme: "Ujjwala Yojana",
      status: "ineligible",
      reason: "Already have LPG connection",
      benefit: "Free gas connection",
      matchScore: 15,
    },
    {
      scheme: "Senior Citizen Pension",
      status: "ineligible",
      reason: "Age below 60 years",
      benefit: "₹300/month",
      matchScore: 10,
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    // In real app, API call to update user profile
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "eligible":
        return <FaCheckCircle className="status-icon eligible" />;
      case "partial":
        return <FaMinusCircle className="status-icon partial" />;
      case "ineligible":
        return <FaTimesCircle className="status-icon ineligible" />;
      default:
        return null;
    }
  };

  return (
    <div className="my-eligibility">
      <div className="eligibility-header">
        <h2>🎯 My Eligibility Profile</h2>
        <p className="section-description">
          Update your details to see accurate scheme eligibility
        </p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <h3>Your Details</h3>
          {!isEditing ? (
            <button className="edit-profile-btn" onClick={handleEdit}>
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-profile-btn" onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button className="cancel-profile-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Age</label>
            {isEditing ? (
              <input
                type="number"
                value={tempProfile.age}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, age: e.target.value })
                }
                className="profile-input"
              />
            ) : (
              <p>{profile.age} years</p>
            )}
          </div>

          <div className="profile-item">
            <label>Occupation</label>
            {isEditing ? (
              <select
                value={tempProfile.occupation}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, occupation: e.target.value })
                }
                className="profile-select"
              >
                <option>Farmer</option>
                <option>Student</option>
                <option>Self-employed</option>
                <option>Government Employee</option>
                <option>Private Employee</option>
                <option>Unemployed</option>
                <option>Retired</option>
              </select>
            ) : (
              <p>{profile.occupation}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Annual Income (₹)</label>
            {isEditing ? (
              <input
                type="number"
                value={tempProfile.income}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, income: e.target.value })
                }
                className="profile-input"
              />
            ) : (
              <p>₹{profile.income.toLocaleString()}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Category</label>
            {isEditing ? (
              <select
                value={tempProfile.category}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, category: e.target.value })
                }
                className="profile-select"
              >
                <option>General</option>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
                <option>Other</option>
              </select>
            ) : (
              <p>{profile.category}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Gender</label>
            {isEditing ? (
              <select
                value={tempProfile.gender}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, gender: e.target.value })
                }
                className="profile-select"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p>{profile.gender}</p>
            )}
          </div>

          <div className="profile-item">
            <label>State</label>
            {isEditing ? (
              <select
                value={tempProfile.state}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, state: e.target.value })
                }
                className="profile-select"
              >
                <option>Uttar Pradesh</option>
                <option>Bihar</option>
                <option>Madhya Pradesh</option>
                <option>Rajasthan</option>
                <option>Maharashtra</option>
                <option>West Bengal</option>
                <option>Tamil Nadu</option>
                <option>Karnataka</option>
                <option>Gujarat</option>
                <option>Other</option>
              </select>
            ) : (
              <p>{profile.state}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Family Size</label>
            {isEditing ? (
              <input
                type="number"
                value={tempProfile.familySize}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, familySize: e.target.value })
                }
                className="profile-input"
              />
            ) : (
              <p>{profile.familySize} members</p>
            )}
          </div>

          <div className="profile-item">
            <label>Land Owned</label>
            {isEditing ? (
              <input
                type="text"
                value={tempProfile.landOwned}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, landOwned: e.target.value })
                }
                className="profile-input"
              />
            ) : (
              <p>{profile.landOwned}</p>
            )}
          </div>
        </div>
      </div>

      {/* Eligibility Results */}
      <div className="eligibility-results">
        <div className="results-header">
          <h3>Scheme Eligibility Results</h3>
          <div className="results-filter">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Eligible</button>
            <button className="filter-btn">Partially</button>
            <button className="filter-btn">Ineligible</button>
          </div>
        </div>

        <div className="results-table">
          <div className="results-table-header">
            <div>Scheme Name</div>
            <div>Status</div>
            <div>Match Score</div>
            <div>Benefit</div>
            <div>Action</div>
          </div>

          {eligibilityResults.map((result, index) => (
            <div key={index} className="results-table-row">
              <div className="scheme-name-cell">
                <div
                  className="scheme-dot"
                  style={{
                    background:
                      result.status === "eligible"
                        ? "#138808"
                        : result.status === "partial"
                          ? "#ff9933"
                          : "#ff4444",
                  }}
                ></div>
                {result.scheme}
              </div>
              <div className={`status-cell ${result.status}`}>
                {getStatusIcon(result.status)}
                <span>
                  {result.status.charAt(0).toUpperCase() +
                    result.status.slice(1)}
                </span>
              </div>
              <div className="match-score-cell">
                <div className="score-bar-container">
                  <div
                    className="score-bar"
                    style={{
                      width: `${result.matchScore}%`,
                      background:
                        result.matchScore >= 80
                          ? "#138808"
                          : result.matchScore >= 50
                            ? "#ff9933"
                            : "#ff4444",
                    }}
                  ></div>
                  <span className="score-text">{result.matchScore}%</span>
                </div>
              </div>
              <div className="benefit-cell">{result.benefit}</div>
              <div className="action-cell">
                {result.status !== "ineligible" && (
                  <button className="apply-small-btn">Apply</button>
                )}
                <button className="details-btn">Details</button>
              </div>
            </div>
          ))}
        </div>

        <div className="eligibility-note">
          <p>
            <strong>Note:</strong> Eligibility is calculated based on your
            profile information. Final eligibility may vary based on scheme
            guidelines and document verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyEligibility;
