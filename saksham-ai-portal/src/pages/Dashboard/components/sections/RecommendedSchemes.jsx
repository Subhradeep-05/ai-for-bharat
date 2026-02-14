import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaTractor,
  FaHeartbeat,
  FaGraduationCap,
  FaHome,
  FaBriefcase,
  FaFemale,
  FaChild,
  FaStar,
  FaExternalLinkAlt,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import API, { applicationAPI } from "@/services/api";
import "@/pages/Dashboard/dashboard-sections.css";

const RecommendedSchemes = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("match");
  const [allSchemes, setAllSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyScheme, setApplyScheme] = useState(null);
  const [applyStep, setApplyStep] = useState(1);
  const [applyFormData, setApplyFormData] = useState({
    confirmEligibility: false,
    agreeTerms: false,
  });
  const [emailStatus, setEmailStatus] = useState(null);

  // Base path for JSON files
  const BASE_PATH =
    process.env.NODE_ENV === "production"
      ? "/Indian_Government_Schemes_Dataset"
      : "/Indian_Government_Schemes_Dataset";

  // Fetch all schemes on component mount
  useEffect(() => {
    fetchAllSchemes();
  }, []);

  const fetchAllSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Define scheme paths
      const schemePaths = [
        // Central Schemes - Agriculture
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Kisan_Samman_Nidhi.json`,
          category: "agriculture",
          icon: <FaTractor />,
          color: "#ff9933",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Fasal_Bima_Yojana.json`,
          category: "agriculture",
          icon: <FaTractor />,
          color: "#228b22",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Kisan_Credit_Card.json`,
          category: "agriculture",
          icon: <FaTractor />,
          color: "#4b0082",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Paramparagat_Krishi_Vikas_Yojana.json`,
          category: "agriculture",
          icon: <FaTractor />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Pradhan_Mantri_Krishi_Sinchai_Yojana.json`,
          category: "agriculture",
          icon: <FaTractor />,
          color: "#20b2aa",
        },

        // Central Schemes - Health
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Ayushman_Bharat_PMJAY.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#138808",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Jan_Arogya_Yojana.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#cd5c5c",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Health_Mission.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#20b2aa",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Tuberculosis_Elimination_Program.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Bhartiya_Janaushadhi_Pariyojana.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#ff6b6b",
        },

        // Central Schemes - Education
        {
          path: `${BASE_PATH}/Central_Schemes/Education/PM_Vidya_Lakshmi.json`,
          category: "education",
          icon: <FaGraduationCap />,
          color: "#000080",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Means_Cum_Merit_Scholarship.json`,
          category: "education",
          icon: <FaGraduationCap />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Beti_Bachao_Beti_Padhao.json`,
          category: "education",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Incentive_for_Girls.json`,
          category: "education",
          icon: <FaFemale />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Mid_Day_Meal_Scheme.json`,
          category: "education",
          icon: <FaChild />,
          color: "#20b2aa",
        },

        // Central Schemes - Housing
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/PM_Awas_Yojana.json`,
          category: "housing",
          icon: <FaHome />,
          color: "#ff6b6b",
        },

        // Central Schemes - Women
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/Ujjwala_Yojana.json`,
          category: "women",
          icon: <FaFemale />,
          color: "#ff8c00",
        },

        // State Schemes - West Bengal
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Kanyashree_Prakalpa.json`,
          category: "women",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Swasthya_Sathi.json`,
          category: "health",
          icon: <FaHeartbeat />,
          color: "#138808",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Aikyashree.json`,
          category: "education",
          icon: <FaGraduationCap />,
          color: "#000080",
        },

        // Pension Schemes
        {
          path: `${BASE_PATH}/Pension_Schemes/Atal_Pension_Yojana.json`,
          category: "business",
          icon: "💰",
          color: "#4b0082",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/National_Pension_System.json`,
          category: "business",
          icon: "💰",
          color: "#708090",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Old_Age_Pension.json`,
          category: "pension",
          icon: "👴",
          color: "#708090",
        },

        // SC/ST Schemes
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Post_Matric_Scholarship_SC.json`,
          category: "education",
          icon: <FaGraduationCap />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Eklavya_Model_Residential_Schools.json`,
          category: "education",
          icon: <FaGraduationCap />,
          color: "#228b22",
        },
      ];

      const fetchPromises = schemePaths.map(async (schemeInfo) => {
        try {
          const response = await fetch(schemeInfo.path);
          if (!response.ok) return null;
          const data = await response.json();

          // Calculate match score based on user profile
          const matchScore = calculateMatchScore(data, user);

          return {
            ...data,
            id: data.scheme_id || Math.random().toString(36).substr(2, 9),
            category: schemeInfo.category,
            icon: schemeInfo.icon,
            color: schemeInfo.color,
            matchScore: matchScore,
            featured: matchScore >= 80,
          };
        } catch (err) {
          console.error(`Error fetching ${schemeInfo.path}:`, err);
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      const validSchemes = results.filter((scheme) => scheme !== null);

      setAllSchemes(validSchemes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate match score based on user profile
  const calculateMatchScore = (scheme, user) => {
    if (!user) return Math.floor(Math.random() * 50) + 30;

    let score = 50;

    if (scheme.eligibility?.age_range) {
      const userAge = calculateAge(user.dob);
      if (
        userAge >= (scheme.eligibility.age_range.min || 0) &&
        userAge <= (scheme.eligibility.age_range.max || 100)
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

    return Math.min(score, 100);
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

  const categories = [
    { id: "all", name: "All Schemes", icon: "📋" },
    { id: "agriculture", name: "Agriculture", icon: <FaTractor /> },
    { id: "health", name: "Health", icon: <FaHeartbeat /> },
    { id: "education", name: "Education", icon: <FaGraduationCap /> },
    { id: "housing", name: "Housing", icon: <FaHome /> },
    { id: "business", name: "Business", icon: <FaBriefcase /> },
    { id: "women", name: "Women", icon: <FaFemale /> },
    { id: "child", name: "Child", icon: <FaChild /> },
    { id: "pension", name: "Pension", icon: "👴" },
  ];

  const filteredSchemes = allSchemes
    .filter((scheme) => {
      if (
        searchTerm &&
        !scheme.scheme_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !scheme.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (selectedCategory !== "all" && scheme.category !== selectedCategory) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "match") {
        return b.matchScore - a.matchScore;
      } else if (selectedSort === "name") {
        return (a.scheme_name || "").localeCompare(b.scheme_name || "");
      }
      return 0;
    });

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
      // Check eligibility
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

      // Debug: Check token
      const token = localStorage.getItem("token");
      console.log("=== FRONTEND DEBUG ===");
      console.log("Token exists:", !!token);
      console.log(
        "Token preview:",
        token ? token.substring(0, 20) + "..." : "none",
      );
      console.log(
        "User from localStorage:",
        JSON.parse(localStorage.getItem("user") || "{}"),
      );
      console.log("Sending application data:", {
        schemeId: applyScheme.id,
        schemeName: applyScheme.scheme_name,
        userEmail: user?.email,
      });

      // Submit application
      const response = await applicationAPI.submitApplication({
        schemeId: applyScheme.id,
        schemeName: applyScheme.scheme_name,
        userEmail: user?.email,
      });

      console.log("Application response:", response);

      if (response.success) {
        setApplicationStatus((prev) => ({
          ...prev,
          [applyScheme.id]: "success",
        }));

        // Send email confirmation
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
            console.log("✅ Email sent successfully to:", user?.email);
          } else {
            setEmailStatus("failed");
            console.error("❌ Email failed:", emailResponse);
          }
        } catch (emailError) {
          setEmailStatus("failed");
          console.error("❌ Email error:", emailError);
        }

        setApplyStep(4);

        // Store in localStorage
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
      console.error("❌ Application error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);

      setApplicationStatus((prev) => ({ ...prev, [applyScheme.id]: "failed" }));
      setEmailStatus("failed");
      setApplyStep(3);

      // Show specific error message
      const errorMessage =
        error.response?.data?.message || error.message || "Application failed";
      alert(`❌ ${errorMessage}`);
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

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setShowDetailsModal(true);
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
      <div className="recommended-schemes loading">
        <div className="loading-spinner"></div>
        <p>Loading schemes from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommended-schemes error">
        <FaExclamationTriangle className="error-icon" />
        <h3>Error Loading Schemes</h3>
        <p>{error}</p>
        <button onClick={fetchAllSchemes} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="recommended-schemes">
      <div className="schemes-header">
        <h2>📋 Recommended Government Schemes</h2>
        <p className="section-description">
          Personalized scheme recommendations based on your profile
        </p>
        {user && (
          <p className="user-greeting">
            Welcome back, {user.name || user.fullName || "User"}!
          </p>
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search schemes by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="scheme-search-input"
          />
        </div>

        <div className="filter-options">
          <div className="filter-dropdown">
            <FaFilter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {typeof cat.icon === "string" ? cat.icon : "📋"} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-dropdown">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="sort-select"
            >
              <option value="match">Sort by: Match Score</option>
              <option value="name">Sort by: Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Schemes */}
      {searchTerm === "" && selectedCategory === "all" && (
        <div className="featured-section">
          <h3 className="featured-title">
            <FaStar className="featured-star" /> Top Picks for You
          </h3>
          <div className="featured-grid">
            {filteredSchemes
              .filter((s) => s.featured)
              .slice(0, 3)
              .map((scheme) => (
                <div key={scheme.id} className="featured-card">
                  <div
                    className="featured-icon"
                    style={{ background: `${scheme.color}20` }}
                  >
                    {scheme.icon}
                  </div>
                  <div className="featured-content">
                    <h4>{scheme.scheme_name}</h4>
                    <p className="featured-description">{scheme.description}</p>
                    <div className="featured-benefit">
                      <span className="benefit-label">Benefit:</span>
                      <span className="benefit-value">
                        {Array.isArray(scheme.benefits)
                          ? scheme.benefits[0]
                          : scheme.benefits || "Not specified"}
                      </span>
                    </div>
                    <div className="featured-footer">
                      <span
                        className="match-badge"
                        style={{
                          background: `${scheme.color}20`,
                          color: scheme.color,
                        }}
                      >
                        {scheme.matchScore}% Match
                      </span>
                      <button
                        className="apply-featured-btn"
                        style={{ background: scheme.color }}
                        onClick={() => handleApplyNow(scheme)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Schemes Grid */}
      <div className="all-schemes-section">
        <h3>
          {searchTerm
            ? `Search Results (${filteredSchemes.length})`
            : selectedCategory !== "all"
              ? `${
                  categories.find((c) => c.id === selectedCategory)?.name
                } Schemes (${filteredSchemes.length})`
              : "All Government Schemes"}
        </h3>

        {filteredSchemes.length === 0 ? (
          <div className="no-results">
            <p>No schemes found matching your criteria.</p>
            <button
              className="clear-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="all-schemes-grid">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="scheme-detailed-card">
                <div className="scheme-detailed-header">
                  <div
                    className="scheme-detailed-icon"
                    style={{ background: `${scheme.color}20` }}
                  >
                    {scheme.icon}
                  </div>
                  <div className="scheme-detailed-title">
                    <h4>{scheme.scheme_name}</h4>
                    <span className="scheme-category">
                      {categories.find((c) => c.id === scheme.category)?.name}
                    </span>
                  </div>
                  <span
                    className="match-percentage"
                    style={{ color: scheme.color }}
                  >
                    {scheme.matchScore}% match
                  </span>
                </div>

                <p className="scheme-detailed-description">
                  {scheme.description}
                </p>

                <div className="scheme-detailed-details">
                  <div className="detail-item">
                    <span className="detail-label">Benefit:</span>
                    <span className="detail-value highlight">
                      {Array.isArray(scheme.benefits)
                        ? scheme.benefits[0]
                        : scheme.benefits || "Not specified"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Eligibility:</span>
                    <span className="detail-value">
                      {scheme.eligibility?.income_limit || "No income limit"} |
                      Age: {scheme.eligibility?.age_range?.min || "Any"} -{" "}
                      {scheme.eligibility?.age_range?.max || "Any"}
                    </span>
                  </div>

                  <div className="detail-item documents-item">
                    <span className="detail-label">Documents:</span>
                    <div className="document-tags">
                      {scheme.required_documents
                        ?.slice(0, 3)
                        .map((doc, idx) => (
                          <span key={idx} className="document-tag">
                            {doc}
                          </span>
                        ))}
                      {scheme.required_documents?.length > 3 && (
                        <span className="document-tag more">
                          +{scheme.required_documents.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="scheme-detailed-footer">
                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(scheme)}
                  >
                    View Details
                  </button>
                  <button
                    className="apply-now-btn"
                    style={{
                      background: `linear-gradient(135deg, ${scheme.color}, ${
                        scheme.color === "#ff9933"
                          ? "#138808"
                          : scheme.color === "#138808"
                            ? "#ff9933"
                            : "#000080"
                      })`,
                    }}
                    onClick={() => handleApplyNow(scheme)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
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

                  {/* Email Status Section */}
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

      {/* Details Modal */}
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
    </div>
  );
};

export default RecommendedSchemes;
