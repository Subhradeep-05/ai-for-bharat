import React, { useState, useEffect } from "react";
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
  FaHome,
  FaBriefcase,
  FaFemale,
  FaChild,
  FaSpinner,
  FaExclamationTriangle,
  FaFileAlt,
  FaDownload,
  FaEye,
  FaUser,
  FaStar,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { applicationAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";
import "/src/pages/Dashboard/dashboard-sections.css";

const DashboardHome = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [allSchemes, setAllSchemes] = useState([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [activities, setActivities] = useState([]);

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applyScheme, setApplyScheme] = useState(null);
  const [applyStep, setApplyStep] = useState(1);
  const [applyFormData, setApplyFormData] = useState({
    confirmEligibility: false,
    agreeTerms: false,
  });
  const [applicationStatus, setApplicationStatus] = useState({});
  const [emailStatus, setEmailStatus] = useState(null);

  const [stats, setStats] = useState({
    activeApplications: 0,
    totalBenefits: 0,
    pendingDocuments: 0,
    availableSchemes: 0,
    eligibilityScore: 0,
    eligibleSchemes: 0,
  });
  const [fetchProgress, setFetchProgress] = useState({ loaded: 0, total: 0 });

  // Base path for JSON files
  const BASE_PATH = "/Indian_Government_Schemes_Dataset";

  // Fetch all data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch user's applications
      const appResponse = await applicationAPI.getMyApplications();
      const userApps = appResponse.success ? appResponse.applications : [];
      setApplications(userApps);

      // Fetch all schemes with progress tracking
      const schemes = await fetchAllSchemes();
      setAllSchemes(schemes);

      // Calculate eligibility scores for all schemes
      const schemesWithScores = calculateAllScores(schemes, user);

      // Get top recommendations (score >= 70)
      const recommendations = schemesWithScores
        .filter((s) => s.matchScore >= 70)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3); // Show top 3 recommendations

      setRecommendedSchemes(recommendations);

      // Calculate overall eligibility score (average of top 10)
      const topScores = schemesWithScores
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10)
        .map((s) => s.matchScore);

      const avgScore = topScores.length
        ? Math.round(topScores.reduce((a, b) => a + b, 0) / topScores.length)
        : 0;

      // Generate recent activities
      const recentActivities = generateActivities(userApps);
      setActivities(recentActivities);

      // Calculate stats
      const activeApps = userApps.filter((app) =>
        ["pending", "processing"].includes(app.status),
      ).length;

      const eligibleCount = schemesWithScores.filter(
        (s) => s.matchScore >= 70,
      ).length;

      setStats({
        activeApplications: activeApps,
        totalBenefits: userApps.length * 5000, // Placeholder calculation
        pendingDocuments: userApps.filter((app) => app.status === "pending")
          .length,
        availableSchemes: schemes.length,
        eligibilityScore: avgScore,
        eligibleSchemes: eligibleCount,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSchemes = async () => {
    try {
      // Define all scheme paths (same as your existing code)
      const schemePaths = [
        // Central Schemes - Agriculture
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Kisan_Samman_Nidhi.json`,
          category: "Agriculture",
          icon: <FaTractor />,
          color: "#ff9933",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Fasal_Bima_Yojana.json`,
          category: "Agriculture",
          icon: <FaTractor />,
          color: "#228b22",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Kisan_Credit_Card.json`,
          category: "Agriculture",
          icon: <FaTractor />,
          color: "#4b0082",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Paramparagat_Krishi_Vikas_Yojana.json`,
          category: "Agriculture",
          icon: <FaTractor />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Pradhan_Mantri_Krishi_Sinchai_Yojana.json`,
          category: "Agriculture",
          icon: <FaTractor />,
          color: "#20b2aa",
        },

        // Central Schemes - Health
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Ayushman_Bharat_PMJAY.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#138808",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Jan_Arogya_Yojana.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#cd5c5c",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Health_Mission.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#20b2aa",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Tuberculosis_Elimination_Program.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Bhartiya_Janaushadhi_Pariyojana.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#ff6b6b",
        },

        // Central Schemes - Education
        {
          path: `${BASE_PATH}/Central_Schemes/Education/PM_Vidya_Lakshmi.json`,
          category: "Education",
          icon: <FaGraduationCap />,
          color: "#000080",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Means_Cum_Merit_Scholarship.json`,
          category: "Education",
          icon: <FaGraduationCap />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Beti_Bachao_Beti_Padhao.json`,
          category: "Education",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Incentive_for_Girls.json`,
          category: "Education",
          icon: <FaFemale />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Mid_Day_Meal_Scheme.json`,
          category: "Education",
          icon: <FaChild />,
          color: "#20b2aa",
        },

        // Central Schemes - Housing
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/PM_Awas_Yojana.json`,
          category: "Housing",
          icon: <FaHome />,
          color: "#ff6b6b",
        },

        // Central Schemes - Women
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/Ujjwala_Yojana.json`,
          category: "Women",
          icon: <FaFemale />,
          color: "#ff8c00",
        },

        // State Schemes - West Bengal
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Kanyashree_Prakalpa.json`,
          category: "Women",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Swasthya_Sathi.json`,
          category: "Health",
          icon: <FaHeartbeat />,
          color: "#138808",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Aikyashree.json`,
          category: "Education",
          icon: <FaGraduationCap />,
          color: "#000080",
        },

        // Pension Schemes
        {
          path: `${BASE_PATH}/Pension_Schemes/Atal_Pension_Yojana.json`,
          category: "Pension",
          icon: "💰",
          color: "#4b0082",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/National_Pension_System.json`,
          category: "Pension",
          icon: "💰",
          color: "#708090",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Old_Age_Pension.json`,
          category: "Pension",
          icon: "👴",
          color: "#708090",
        },

        // SC/ST Schemes
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Post_Matric_Scholarship_SC.json`,
          category: "Education",
          icon: <FaGraduationCap />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Eklavya_Model_Residential_Schools.json`,
          category: "Education",
          icon: <FaGraduationCap />,
          color: "#228b22",
        },
      ];

      setFetchProgress({ loaded: 0, total: schemePaths.length });

      // Fetch all schemes in parallel
      const fetchPromises = schemePaths.map(async (schemeInfo, index) => {
        try {
          const response = await fetch(schemeInfo.path);
          if (!response.ok) return null;
          const data = await response.json();
          setFetchProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));

          return {
            ...data,
            id: data.scheme_id || `scheme-${index}-${Date.now()}`,
            category: schemeInfo.category,
            icon: schemeInfo.icon,
            color: schemeInfo.color,
            path: schemeInfo.path,
          };
        } catch (err) {
          console.error(`Error fetching ${schemeInfo.path}:`, err);
          setFetchProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      return results.filter((scheme) => scheme !== null);
    } catch (err) {
      console.error("Error fetching schemes:", err);
      return [];
    }
  };

  const calculateAllScores = (schemes, user) => {
    if (!user || !schemes.length)
      return schemes.map((s) => ({ ...s, matchScore: 0 }));

    return schemes.map((scheme) => {
      let score = 50; // Base score

      if (scheme.eligibility?.age_range && user.dob) {
        const age = calculateAge(user.dob);
        if (
          age >= (scheme.eligibility.age_range.min || 0) &&
          age <= (scheme.eligibility.age_range.max || 100)
        ) {
          score += 20;
        }
      }

      if (scheme.eligibility?.income_limit && user.annualIncome) {
        const limitMatch = scheme.eligibility.income_limit.match(/\d+/);
        if (limitMatch) {
          const limit = parseInt(limitMatch[0]) * 1000;
          if (user.annualIncome <= limit) {
            score += 15;
          }
        }
      }

      if (scheme.eligibility?.gender && user.gender) {
        if (
          scheme.eligibility.gender === "All" ||
          scheme.eligibility.gender.toLowerCase() === user.gender.toLowerCase()
        ) {
          score += 10;
        }
      }

      if (scheme.eligibility?.occupation && user.occupation) {
        if (
          scheme.eligibility.occupation.some((occ) =>
            occ.toLowerCase().includes(user.occupation.toLowerCase()),
          )
        ) {
          score += 15;
        }
      }

      // Cap score at 100
      score = Math.min(score, 100);

      // Get benefit text
      let benefitText = "Check scheme details";
      if (scheme.benefits && scheme.benefits.length > 0) {
        benefitText = scheme.benefits[0];
      }

      return {
        ...scheme,
        matchScore: score,
        benefitDisplay: benefitText,
      };
    });
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generateActivities = (applications) => {
    const activities = [];

    applications.forEach((app) => {
      activities.push({
        id: `app-${app.applicationId}`,
        action: `Applied for ${app.schemeName}`,
        date: formatRelativeTime(app.appliedDate),
        status: app.status,
        type: "application",
      });
    });

    if (!user?.occupation || !user?.dob || !user?.gender) {
      activities.push({
        id: "profile-complete",
        action: "Complete your profile to improve eligibility score",
        date: "Just now",
        status: "Action Required",
        type: "prompt",
      });
    }

    return activities
      .sort((a, b) => {
        if (a.date === "Just now") return -1;
        if (b.date === "Just now") return 1;
        return 0;
      })
      .slice(0, 5);
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  // Modal handlers (copied from RecommendedSchemes)
  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowDetailsModal(true);
  };

  const handleApplyNow = (scheme) => {
    setApplyScheme(scheme);
    setShowApplyModal(true);
    setApplyStep(1);
    setEmailStatus(null);
    setApplyFormData({
      confirmEligibility: false,
      agreeTerms: false,
    });
  };

  const handleApplySubmit = async () => {
    if (!applyFormData.confirmEligibility || !applyFormData.agreeTerms) {
      alert("Please confirm eligibility and agree to terms");
      return;
    }

    setApplyStep(2);
    setApplicationStatus((prev) => ({ ...prev, [applyScheme.id]: "applying" }));
    setEmailStatus("sending");

    try {
      const isEligible = await checkEligibility(applyScheme, user);

      if (!isEligible) {
        setApplicationStatus((prev) => ({
          ...prev,
          [applyScheme.id]: "ineligible",
        }));
        setApplyStep(3);
        setEmailStatus(null);
        return;
      }

      const response = await applicationAPI.submitApplication({
        schemeId: applyScheme.id,
        schemeName: applyScheme.scheme_name,
        userEmail: user?.email,
      });

      if (response.success) {
        setApplicationStatus((prev) => ({
          ...prev,
          [applyScheme.id]: "success",
        }));

        try {
          const emailResponse = await applicationAPI.sendEmail({
            to: user?.email,
            template: "application-confirmation",
            data: {
              userName: user?.name || user?.fullName || "Applicant",
              schemeName: applyScheme.scheme_name,
              applicationId: response.applicationId,
              appliedDate: new Date().toLocaleDateString(),
              schemeDetails: {
                benefit: Array.isArray(applyScheme.benefits)
                  ? applyScheme.benefits[0]
                  : applyScheme.benefits || "As per scheme guidelines",
                website: applyScheme.official_website,
                helpline:
                  applyScheme.helpline ||
                  "Contact your nearest government office",
              },
            },
          });

          if (emailResponse.success) {
            setEmailStatus("sent");
          } else {
            setEmailStatus("failed");
          }
        } catch (emailError) {
          setEmailStatus("failed");
        }

        setApplyStep(4);

        const applications = JSON.parse(
          localStorage.getItem("userApplications") || "[]",
        );
        applications.push({
          schemeId: applyScheme.id,
          schemeName: applyScheme.scheme_name,
          appliedDate: new Date().toISOString(),
          status: "pending",
          applicationId: response.applicationId,
        });
        localStorage.setItem("userApplications", JSON.stringify(applications));
      }
    } catch (error) {
      console.error("Application error:", error);
      setApplicationStatus((prev) => ({ ...prev, [applyScheme.id]: "failed" }));
      setEmailStatus("failed");
      setApplyStep(3);
    }
  };

  const checkEligibility = async (scheme, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false);
          return;
        }

        if (scheme.eligibility?.age_range) {
          const userAge = calculateAge(user.dob);
          if (
            scheme.eligibility.age_range.min &&
            userAge < scheme.eligibility.age_range.min
          ) {
            resolve(false);
            return;
          }
          if (
            scheme.eligibility.age_range.max &&
            userAge > scheme.eligibility.age_range.max
          ) {
            resolve(false);
            return;
          }
        }

        if (scheme.eligibility?.income_limit && user.annualIncome) {
          const limitMatch = scheme.eligibility.income_limit.match(/\d+/);
          if (limitMatch) {
            const limit = parseInt(limitMatch[0]) * 1000;
            if (user.annualIncome > limit) {
              resolve(false);
              return;
            }
          }
        }

        if (
          scheme.eligibility?.gender &&
          scheme.eligibility.gender !== "All" &&
          scheme.eligibility.gender !== user.gender
        ) {
          resolve(false);
          return;
        }

        resolve(true);
      }, 500);
    });
  };

  const downloadApplicationForm = (scheme) => {
    const content = `
      SCHEME APPLICATION FORM
      =======================
      
      Scheme Name: ${scheme.scheme_name}
      Scheme ID: ${scheme.scheme_id || "N/A"}
      Ministry: ${scheme.ministry || "N/A"}
      Category: ${scheme.category}
      
      BENEFITS
      ========
      ${Array.isArray(scheme.benefits) ? scheme.benefits.join("\n      ") : scheme.benefits || "Not specified"}
      
      ELIGIBILITY CRITERIA
      ====================
      Occupation: ${scheme.eligibility?.occupation?.join(", ") || "Any"}
      Age Range: ${scheme.eligibility?.age_range?.min || "Any"} - ${scheme.eligibility?.age_range?.max || "Any"} years
      Income Limit: ${scheme.eligibility?.income_limit || "Not specified"}
      Gender: ${scheme.eligibility?.gender || "All"}
      
      REQUIRED DOCUMENTS
      ==================
      ${scheme.required_documents?.join("\n      ") || "Not specified"}
      
      APPLICATION PROCESS
      ===================
      Mode: ${scheme.application_process?.mode || "Not specified"}
      Steps:
      ${scheme.application_process?.steps?.map((step) => `      ${step}`).join("\n") || "      Not specified"}
      
      OFFICIAL WEBSITE
      ================
      ${scheme.official_website || "Not specified"}
      
      LANGUAGES SUPPORTED
      ===================
      ${scheme.languages_supported?.join(", ") || "Not specified"}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scheme.scheme_name.replace(/\s+/g, "_")}_Application_Form.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="dashboard-home loading-state">
        <div className="loading-spinner"></div>
        <p>Loading your personalized dashboard...</p>
        <p className="loading-progress">
          Loading schemes: {fetchProgress.loaded} / {fetchProgress.total}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-home error-state">
        <FaExclamationTriangle className="error-icon" />
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      {/* Welcome Header */}
      <div className="welcome-header">
        <div>
          <h1>Welcome back, {user?.name || "User"}! 👋</h1>
          <p className="welcome-subtitle">
            Here's your personalized scheme eligibility and recommendations
          </p>
        </div>
      </div>

      {/* Eligibility Score Card */}
      <div className="eligibility-card">
        <div className="eligibility-score">
          <div className="score-circle">
            <span className="score-number">{stats.eligibilityScore}%</span>
            <span className="score-label">Eligibility Score</span>
          </div>
          <div className="score-details">
            <h3>You're eligible for {stats.eligibleSchemes} schemes!</h3>
            <p>
              Based on your profile, we found {stats.eligibleSchemes} schemes
              you can apply for
            </p>
            {(!user?.occupation || !user?.dob) && (
              <button
                className="complete-profile-btn"
                onClick={() => navigate("/dashboard/settings")}
              >
                Complete Profile →
              </button>
            )}
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
            <h3>{stats.activeApplications}</h3>
            <p>Active Applications</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e8f5e9" }}>
            <FaRupeeSign style={{ color: "#138808" }} />
          </div>
          <div className="stat-info">
            <h3>₹{stats.totalBenefits.toLocaleString()}</h3>
            <p>Total Benefits</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e6f0ff" }}>
            <FaRegClock style={{ color: "#000080" }} />
          </div>
          <div className="stat-info">
            <h3>{stats.pendingDocuments}</h3>
            <p>Pending Documents</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f3e5f5" }}>
            <FaChartLine style={{ color: "#6a1b9a" }} />
          </div>
          <div className="stat-info">
            <h3>{stats.availableSchemes}</h3>
            <p>Schemes Available</p>
          </div>
        </div>
      </div>

      {/* Recommended Schemes Section */}
      <section className="recommended-section">
        <div className="section-header">
          <h2>🎯 Top Recommended Schemes for You</h2>
          <button
            className="view-all"
            onClick={() => navigate("/dashboard/recommended")}
          >
            View All →
          </button>
        </div>

        <div className="recommended-grid">
          {recommendedSchemes.slice(0, 3).map((scheme) => (
            <div key={scheme.id} className="recommended-card">
              <div className="card-header">
                <div
                  className="scheme-icon"
                  style={{ background: `${scheme.color}20` }}
                >
                  {scheme.icon}
                </div>
                <div
                  className="match-badge"
                  style={{ background: scheme.color, color: "white" }}
                >
                  {scheme.matchScore}% Match
                </div>
              </div>

              <h3>{scheme.scheme_name}</h3>
              <p className="scheme-description">
                {scheme.description ||
                  "Government scheme for eligible beneficiaries"}
              </p>

              <div className="scheme-benefit">
                <FaRupeeSign />
                <span>{scheme.benefitDisplay}</span>
              </div>

              <div className="eligibility-tags">
                {scheme.eligibility?.age_range && (
                  <span className="tag">
                    Age: {scheme.eligibility.age_range.min || 0}-
                    {scheme.eligibility.age_range.max || "Any"}
                  </span>
                )}
                {scheme.eligibility?.income_limit && (
                  <span className="tag">
                    Income: {scheme.eligibility.income_limit}
                  </span>
                )}
              </div>

              <div className="card-footer">
                <button
                  className="details-btn"
                  onClick={() => handleViewDetails(scheme)}
                >
                  View Details
                </button>
                <button
                  className="apply-btn"
                  style={{ background: scheme.color }}
                  onClick={() => handleApplyNow(scheme)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Activities and Quick Actions */}
      <div className="two-column-layout">
        {/* Left Column - Recent Activity */}
        <div className="left-column">
          <div className="recent-activity-card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div
                      className="activity-dot"
                      style={{
                        background:
                          activity.type === "application"
                            ? "#4caf50"
                            : activity.type === "update"
                              ? "#2196f3"
                              : "#ff9800",
                      }}
                    ></div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-time">{activity.date}</p>
                    </div>
                    <span
                      className="activity-status"
                      style={{
                        background:
                          activity.status === "approved"
                            ? "#e8f5e9"
                            : activity.status === "pending"
                              ? "#fff3e0"
                              : activity.status === "rejected"
                                ? "#ffebee"
                                : "#f5f5f5",
                        color:
                          activity.status === "approved"
                            ? "#2e7d32"
                            : activity.status === "pending"
                              ? "#ef6c00"
                              : activity.status === "rejected"
                                ? "#c62828"
                                : "#666",
                      }}
                    >
                      {activity.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="no-activity">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="right-column">
          <div className="quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button
                className="quick-action-btn"
                onClick={() => navigate("/dashboard/recommended")}
              >
                <FaSearch /> Browse Schemes
              </button>
              <button
                className="quick-action-btn"
                onClick={() => navigate("/dashboard/applications")}
              >
                <FaFileAlt /> My Applications
              </button>
              <button
                className="quick-action-btn"
                onClick={() => navigate("/dashboard/compare")}
              >
                <FaChartLine /> Compare Schemes
              </button>
              <button
                className="quick-action-btn"
                onClick={() => navigate("/dashboard/settings")}
              >
                <FaUser /> Complete Profile
              </button>
            </div>
          </div>

          {/* Category Quick Filters */}
          <div className="category-filters">
            <h4>Popular Categories</h4>
            <div className="category-chips">
              <button
                className="category-chip"
                onClick={() =>
                  navigate("/dashboard/recommended?category=agriculture")
                }
              >
                <FaTractor /> Agriculture
              </button>
              <button
                className="category-chip"
                onClick={() =>
                  navigate("/dashboard/recommended?category=health")
                }
              >
                <FaHeartbeat /> Health
              </button>
              <button
                className="category-chip"
                onClick={() =>
                  navigate("/dashboard/recommended?category=education")
                }
              >
                <FaGraduationCap /> Education
              </button>
              <button
                className="category-chip"
                onClick={() =>
                  navigate("/dashboard/recommended?category=housing")
                }
              >
                <FaHome /> Housing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Chat */}
      <div className="ai-quick-chat">
        <div className="ai-header">
          <FaRobot className="ai-icon" />
          <h3>Need help? Ask Saarthi AI</h3>
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Ask about schemes, eligibility, documents..."
            className="chat-input"
          />
          <button className="mic-btn">
            <FaMicrophone />
          </button>
        </div>
        <div className="suggested-questions">
          <span className="suggested-tag">Try asking:</span>
          <button className="suggestion-chip">
            Am I eligible for PM Kisan?
          </button>
          <button className="suggestion-chip">
            Documents for Ayushman Bharat
          </button>
          <button className="suggestion-chip">Next scholarship deadline</button>
        </div>
      </div>

      {/* Details Modal (copied from RecommendedSchemes) */}
      {showDetailsModal && selectedScheme && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="scheme-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{selectedScheme.scheme_name}</h3>
              <button
                className="close-modal"
                onClick={() => setShowDetailsModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-section">
                <h4>Description</h4>
                <p>{selectedScheme.description}</p>
              </div>

              <div className="detail-section">
                <h4>Ministry</h4>
                <p>{selectedScheme.ministry || "Not specified"}</p>
              </div>

              <div className="detail-section">
                <h4>Benefits</h4>
                {selectedScheme.benefits?.length > 0 ? (
                  <ul>
                    {selectedScheme.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No benefits specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Eligibility Criteria</h4>
                <div className="eligibility-grid">
                  <div className="eligibility-item">
                    <strong>Occupation:</strong>{" "}
                    {selectedScheme.eligibility?.occupation?.join(", ") ||
                      "Any"}
                  </div>
                  <div className="eligibility-item">
                    <strong>Age Range:</strong>{" "}
                    {selectedScheme.eligibility?.age_range?.min || "Any"} -{" "}
                    {selectedScheme.eligibility?.age_range?.max || "Any"} years
                  </div>
                  <div className="eligibility-item">
                    <strong>Income Limit:</strong>{" "}
                    {selectedScheme.eligibility?.income_limit || "None"}
                  </div>
                  <div className="eligibility-item">
                    <strong>Gender:</strong>{" "}
                    {selectedScheme.eligibility?.gender || "All"}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Required Documents</h4>
                {selectedScheme.required_documents?.length > 0 ? (
                  <ul>
                    {selectedScheme.required_documents.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No documents specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Application Process</h4>
                <p>
                  <strong>Mode:</strong>{" "}
                  {selectedScheme.application_process?.mode || "Not specified"}
                </p>
                {selectedScheme.application_process?.steps?.length > 0 ? (
                  <ol>
                    {selectedScheme.application_process.steps.map(
                      (step, idx) => (
                        <li key={idx}>{step}</li>
                      ),
                    )}
                  </ol>
                ) : (
                  <p>No steps specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Official Website</h4>
                {selectedScheme.official_website &&
                selectedScheme.official_website !== "Not specified" ? (
                  <a
                    href={
                      selectedScheme.official_website.startsWith("http")
                        ? selectedScheme.official_website
                        : `https://${selectedScheme.official_website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {selectedScheme.official_website} <FaExternalLinkAlt />
                  </a>
                ) : (
                  <p>Not specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Languages Supported</h4>
                {selectedScheme.languages_supported?.length > 0 ? (
                  <div className="language-tags">
                    {selectedScheme.languages_supported.map((lang, idx) => (
                      <span key={idx} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>Not specified</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="apply-btn"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleApplyNow(selectedScheme);
                }}
              >
                Apply Now
              </button>
              <button
                className="download-btn"
                onClick={() => downloadApplicationForm(selectedScheme)}
              >
                <FaDownload /> Download Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal (copied from RecommendedSchemes) */}
      {showApplyModal && applyScheme && (
        <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            {applyStep === 1 && (
              <>
                <div className="modal-header">
                  <h3>Apply for {applyScheme.scheme_name}</h3>
                  <button
                    className="close-modal"
                    onClick={() => setShowApplyModal(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="modal-content">
                  <div className="apply-summary">
                    <h4>Application Summary</h4>
                    <p>
                      <strong>Scheme:</strong> {applyScheme.scheme_name}
                    </p>
                    <p>
                      <strong>Category:</strong> {applyScheme.category}
                    </p>
                    <p>
                      <strong>Your Email:</strong> {user?.email}
                    </p>
                  </div>

                  <div className="apply-checklist">
                    <h4>Before You Apply</h4>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={applyFormData.confirmEligibility}
                        onChange={(e) =>
                          setApplyFormData({
                            ...applyFormData,
                            confirmEligibility: e.target.checked,
                          })
                        }
                      />
                      <span>
                        I confirm that I meet the eligibility criteria
                      </span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={applyFormData.agreeTerms}
                        onChange={(e) =>
                          setApplyFormData({
                            ...applyFormData,
                            agreeTerms: e.target.checked,
                          })
                        }
                      />
                      <span>I agree to the terms and conditions</span>
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="proceed-btn"
                    onClick={handleApplySubmit}
                    disabled={
                      !applyFormData.confirmEligibility ||
                      !applyFormData.agreeTerms
                    }
                  >
                    Proceed to Apply
                  </button>
                </div>
              </>
            )}

            {applyStep === 2 && (
              <div className="processing-state">
                <div className="spinner"></div>
                <h3>Processing your application...</h3>
                <p>Please wait while we submit your application</p>
              </div>
            )}

            {applyStep === 3 &&
              applicationStatus[applyScheme.id] === "ineligible" && (
                <div className="error-state">
                  <FaExclamationTriangle className="error-icon" />
                  <h3>Not Eligible</h3>
                  <p>
                    Based on your profile, you don't meet the eligibility
                    criteria for this scheme.
                  </p>
                  <button
                    className="ok-btn"
                    onClick={() => setShowApplyModal(false)}
                  >
                    OK
                  </button>
                </div>
              )}

            {applyStep === 4 &&
              applicationStatus[applyScheme.id] === "success" && (
                <div className="success-state">
                  <FaCheckCircle className="success-icon" />
                  <h3>Application Submitted Successfully!</h3>
                  <p className="application-id-text">
                    Application ID:{" "}
                    {localStorage.getItem("userApplications")
                      ? JSON.parse(localStorage.getItem("userApplications"))[
                          JSON.parse(localStorage.getItem("userApplications"))
                            .length - 1
                        ]?.applicationId
                      : Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>

                  <div className="email-status-section">
                    <h4>Email Confirmation</h4>
                    {emailStatus === "sending" && (
                      <div className="email-status sending">
                        <div className="small-spinner"></div>
                        <p>📧 Sending confirmation email to {user?.email}...</p>
                      </div>
                    )}
                    {emailStatus === "sent" && (
                      <div className="email-status sent">
                        <FaCheckCircle className="email-sent-icon" />
                        <p>
                          ✅ Confirmation email sent successfully to{" "}
                          {user?.email}
                        </p>
                        <p className="email-note">
                          Please check your inbox (and spam folder)
                        </p>
                      </div>
                    )}
                    {emailStatus === "failed" && (
                      <div className="email-status failed">
                        <FaExclamationTriangle className="email-failed-icon" />
                        <p>❌ Failed to send confirmation email</p>
                        <p className="email-note">
                          Your application was submitted successfully, but we
                          couldn't send the email. Please check your email
                          manually or contact support.
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    className="ok-btn"
                    onClick={() => {
                      setShowApplyModal(false);
                      setEmailStatus(null);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
