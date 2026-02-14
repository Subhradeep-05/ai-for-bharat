import React, { useState, useEffect } from "react";
import {
  FaBalanceScale,
  FaPlus,
  FaTrash,
  FaDownload,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const CompareSchemes = ({ user }) => {
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [allSchemes, setAllSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchemeDetails, setSelectedSchemeDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fetchProgress, setFetchProgress] = useState({ loaded: 0, total: 0 });

  // Base path for JSON files
  const BASE_PATH =
    process.env.NODE_ENV === "production"
      ? "/Indian_Government_Schemes_Dataset"
      : "/Indian_Government_Schemes_Dataset";

  // Fetch all schemes from JSON files on component mount
  useEffect(() => {
    fetchAllSchemes();
  }, []);

  const fetchAllSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Define all scheme paths based on your directory structure
      const schemePaths = [
        // Central Schemes - Agriculture
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Kisan_Samman_Nidhi.json`,
          category: "Agriculture",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Fasal_Bima_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Kisan_Credit_Card.json`,
          category: "Agriculture",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Paramparagat_Krishi_Vikas_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Pradhan_Mantri_Krishi_Sinchai_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
        },

        // Central Schemes - Education
        {
          path: `${BASE_PATH}/Central_Schemes/Education/PM_Vidya_Lakshmi.json`,
          category: "Education",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Means_Cum_Merit_Scholarship.json`,
          category: "Education",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Beti_Bachao_Beti_Padhao.json`,
          category: "Education",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Incentive_for_Girls.json`,
          category: "Education",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Mid_Day_Meal_Scheme.json`,
          category: "Education",
          subCategory: "Central",
        },

        // Central Schemes - Health
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Ayushman_Bharat_PMJAY.json`,
          category: "Health",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Jan_Arogya_Yojana.json`,
          category: "Health",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Health_Mission.json`,
          category: "Health",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Tuberculosis_Elimination_Program.json`,
          category: "Health",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Bhartiya_Janaushadhi_Pariyojana.json`,
          category: "Health",
          subCategory: "Central",
        },

        // Central Schemes - Social Welfare
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/PM_Awas_Yojana.json`,
          category: "Housing",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/Ujjwala_Yojana.json`,
          category: "Energy",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/National_Social_Assistance_Programme.json`,
          category: "Social Welfare",
          subCategory: "Central",
        },

        // Central Schemes - Infrastructure
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/PM_Gram_Sadak_Yojana.json`,
          category: "Infrastructure",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/Smart_Cities_Mission.json`,
          category: "Infrastructure",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/AMRUT.json`,
          category: "Infrastructure",
          subCategory: "Central",
        },

        // State Schemes - Maharashtra
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/Mahatma_Phule_Jayanti.json`,
          category: "State Scheme",
          subCategory: "Maharashtra",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/Lok_Awas_Yojana.json`,
          category: "State Scheme",
          subCategory: "Maharashtra",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/MHADA_Housing.json`,
          category: "State Scheme",
          subCategory: "Maharashtra",
        },

        // State Schemes - Tamil Nadu
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Amma_Canteen.json`,
          category: "State Scheme",
          subCategory: "Tamil Nadu",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Kalaignar_Insurance_Scheme.json`,
          category: "State Scheme",
          subCategory: "Tamil Nadu",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Magalir_Urimai_Thogai.json`,
          category: "State Scheme",
          subCategory: "Tamil Nadu",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Tamil_Nadu_Assured_Pension.json`,
          category: "State Scheme",
          subCategory: "Tamil Nadu",
        },

        // State Schemes - Karnataka
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Anna_Bhagya.json`,
          category: "State Scheme",
          subCategory: "Karnataka",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Ksheera_Santhwana.json`,
          category: "State Scheme",
          subCategory: "Karnataka",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Gruha_Jyothi.json`,
          category: "State Scheme",
          subCategory: "Karnataka",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Gruhalakshmi.json`,
          category: "State Scheme",
          subCategory: "Karnataka",
        },

        // State Schemes - Uttar Pradesh
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Mukhyamantri_Kanya_Sumangala_Yojana.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Farm_Power_Supply_Scheme.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Janani_Shishi_Suraksha_Karyakram.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Sardar_Vallabhbhai_Patel_Employment_and_Industrial_Zone.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Swami_Vivekananda_Yuva_Sashaktikaran_Yojana.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Yuva_Udyami_Vikas_Abhiyan.json`,
          category: "State Scheme",
          subCategory: "Uttar Pradesh",
        },

        // State Schemes - West Bengal
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Aikyashree.json`,
          category: "State Scheme",
          subCategory: "West Bengal",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Kanyashree_Prakalpa.json`,
          category: "State Scheme",
          subCategory: "West Bengal",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Khadya_Sathi.json`,
          category: "State Scheme",
          subCategory: "West Bengal",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Rupashree.json`,
          category: "State Scheme",
          subCategory: "West Bengal",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Swasthya_Sathi.json`,
          category: "State Scheme",
          subCategory: "West Bengal",
        },

        // SC/ST Schemes
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Post_Matric_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/National_Fellowship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Vanbandhu_Kalyan_Yojana.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Eklavya_Model_Residential_Schools.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/National_Overseas_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Pre_Matric_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Rajiv_Gandhi_National_Fellowship_ST.json`,
          category: "SC/ST",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Top_Class_Education_ST.json`,
          category: "SC/ST",
          subCategory: "Central",
        },

        // Pension Schemes
        {
          path: `${BASE_PATH}/Pension_Schemes/National_Pension_System.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Atal_Pension_Yojana.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Pradhan_Mantri_Vaya_Vandana_Yojana.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Old_Age_Pension.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Pradhan_Mantri_Shram_Yogi_Maan_Dhan.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Disability_Pension.json`,
          category: "Pension",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Widow_Pension.json`,
          category: "Pension",
          subCategory: "Central",
        },

        // Military Relief
        {
          path: `${BASE_PATH}/Military_Relief/Prime_Minister_Relief_Fund.json`,
          category: "Military",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Military_Relief/Army_Welfare_Fund.json`,
          category: "Military",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Military_Relief/National_Defence_Fund.json`,
          category: "Military",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Military_Relief/Ex_Servicemen_Contributory_Health_Scheme.json`,
          category: "Military",
          subCategory: "Central",
        },

        // Women & Child Welfare
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Integrated_Child_Development_Services.json`,
          category: "Women & Child",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Pradhan_Mantri_Matru_Vandana_Yojana.json`,
          category: "Women & Child",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Sukanya_Samriddhi_Yojana.json`,
          category: "Women & Child",
          subCategory: "Central",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/One_Stop_Centre_Scheme.json`,
          category: "Women & Child",
          subCategory: "Central",
        },
      ];

      setFetchProgress({ loaded: 0, total: schemePaths.length });

      // Fetch all schemes in parallel with error handling
      const fetchPromises = schemePaths.map(async (schemeInfo, index) => {
        try {
          const response = await fetch(schemeInfo.path);
          if (!response.ok) {
            console.warn(
              `Failed to fetch ${schemeInfo.path}: ${response.status}`,
            );
            return null;
          }
          const data = await response.json();
          setFetchProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));

          // Ensure all required fields exist
          return {
            ...data,
            id: data.scheme_id || `scheme-${index}-${Date.now()}`,
            category: schemeInfo.category,
            subCategory: schemeInfo.subCategory,
            path: schemeInfo.path,
            scheme_name: data.scheme_name || "Unknown Scheme",
            description: data.description || "No description available",
            benefits: data.benefits || [],
            eligibility: data.eligibility || {},
            required_documents: data.required_documents || [],
            application_process: data.application_process || {
              mode: "Not specified",
              steps: [],
            },
            official_website: data.official_website || "Not specified",
            languages_supported: data.languages_supported || [],
          };
        } catch (err) {
          console.error(`Error fetching ${schemeInfo.path}:`, err);
          setFetchProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      const validSchemes = results.filter((scheme) => scheme !== null);

      console.log(`Loaded ${validSchemes.length} schemes successfully`);
      setAllSchemes(validSchemes);

      if (validSchemes.length === 0) {
        setError(
          "No schemes could be loaded. Please check if JSON files exist in the public folder.",
        );
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter schemes based on search and category
  const getFilteredSchemes = () => {
    return allSchemes.filter((scheme) => {
      const matchesSearch =
        scheme.scheme_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || scheme.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // Get unique categories for filter
  const categories = ["All", ...new Set(allSchemes.map((s) => s.category))];

  const addToCompare = (scheme) => {
    if (selectedSchemes.length < 3) {
      setSelectedSchemes([...selectedSchemes, scheme]);
      setShowSelector(false);
    }
  };

  const removeFromCompare = (schemeId) => {
    setSelectedSchemes(selectedSchemes.filter((s) => s.id !== schemeId));
  };

  const clearAll = () => {
    setSelectedSchemes([]);
  };

  const handleApplyNow = async (scheme) => {
    try {
      setApplicationStatus((prev) => ({ ...prev, [scheme.id]: "applying" }));

      // Check if user is eligible
      const isEligible = await checkEligibility(scheme, user);

      if (!isEligible) {
        setApplicationStatus((prev) => ({
          ...prev,
          [scheme.id]: "ineligible",
        }));
        setTimeout(() => {
          setApplicationStatus((prev) => {
            const newStatus = { ...prev };
            delete newStatus[scheme.id];
            return newStatus;
          });
        }, 3000);
        return;
      }

      // Submit application
      const applicationResult = await submitApplication(scheme, user);

      if (applicationResult.success) {
        setApplicationStatus((prev) => ({ ...prev, [scheme.id]: "success" }));

        // Store application in localStorage
        const applications = JSON.parse(
          localStorage.getItem("userApplications") || "[]",
        );
        applications.push({
          schemeId: scheme.id,
          schemeName: scheme.scheme_name,
          appliedDate: new Date().toISOString(),
          status: "pending",
          applicationId: applicationResult.applicationId,
        });
        localStorage.setItem("userApplications", JSON.stringify(applications));

        // Show success message
        alert(
          `✅ Successfully applied for ${scheme.scheme_name}!\nApplication ID: ${applicationResult.applicationId}`,
        );

        setTimeout(() => {
          setApplicationStatus((prev) => {
            const newStatus = { ...prev };
            delete newStatus[scheme.id];
            return newStatus;
          });
        }, 5000);
      } else {
        setApplicationStatus((prev) => ({ ...prev, [scheme.id]: "failed" }));
      }
    } catch (error) {
      console.error("Application error:", error);
      setApplicationStatus((prev) => ({ ...prev, [scheme.id]: "error" }));
    }
  };

  const checkEligibility = async (scheme, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          resolve(false);
          return;
        }

        // Check age eligibility
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

        // Check income eligibility
        if (scheme.eligibility?.income_limit && user.annualIncome) {
          const limitMatch = scheme.eligibility.income_limit.match(/\d+/);
          if (limitMatch) {
            const limit = parseInt(limitMatch[0]);
            if (user.annualIncome > limit) {
              resolve(false);
              return;
            }
          }
        }

        // Check gender eligibility
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

  const submitApplication = async (scheme, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          applicationId: `APP${Date.now()}${Math.floor(Math.random() * 1000)}`,
          message: "Application submitted successfully",
        });
      }, 1000);
    });
  };

  const handleViewDetails = (scheme) => {
    setSelectedSchemeDetails(scheme);
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

  const comparisonFields = [
    { key: "scheme_name", label: "Scheme Name" },
    { key: "ministry", label: "Ministry" },
    { key: "category", label: "Category" },
    { key: "subCategory", label: "State/Type" },
    { key: "benefits", label: "Benefits", type: "array" },
    { key: "eligibility.occupation", label: "Occupation", type: "array" },
    { key: "eligibility.age_range", label: "Age Range", type: "object" },
    { key: "eligibility.income_limit", label: "Income Limit" },
    { key: "eligibility.gender", label: "Gender" },
    { key: "required_documents", label: "Required Documents", type: "array" },
    { key: "application_process.mode", label: "Application Mode" },
    { key: "official_website", label: "Official Website", type: "link" },
    { key: "languages_supported", label: "Languages", type: "array" },
  ];

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce((current, key) => current && current[key], obj);
  };

  if (loading) {
    return (
      <div className="compare-schemes loading">
        <div className="loading-spinner"></div>
        <p>Loading schemes from database...</p>
        <p className="loading-progress">
          Loaded {fetchProgress.loaded} of {fetchProgress.total} schemes
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-schemes error">
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
    <div className="compare-schemes">
      <div className="compare-header">
        <h2>🔄 Compare Government Schemes</h2>
        <p className="section-description">
          Select up to 3 schemes to compare features side by side
        </p>
        <div className="scheme-stats">
          <span>Total Schemes Available: {allSchemes.length}</span>
          {allSchemes.length === 0 && (
            <span className="warning-text">
              ⚠️ No schemes loaded. Check if JSON files exist in public folder.
            </span>
          )}
        </div>
      </div>

      {/* Scheme Selector */}
      <div className="scheme-selector">
        {selectedSchemes.map((scheme, index) => (
          <div key={scheme.id} className="selected-scheme-card">
            <div className="selected-scheme-header">
              <span className="scheme-number">#{index + 1}</span>
              <button
                className="remove-scheme"
                onClick={() => removeFromCompare(scheme.id)}
                title="Remove from comparison"
              >
                <FaTrash />
              </button>
            </div>
            <div className="selected-scheme-icon">
              {getCategoryIcon(scheme.category)}
            </div>
            <h4>{scheme.scheme_name}</h4>
            <span className="scheme-category-badge">{scheme.category}</span>
            {scheme.subCategory && scheme.subCategory !== "Central" && (
              <span className="scheme-state-badge">{scheme.subCategory}</span>
            )}
          </div>
        ))}

        {selectedSchemes.length < 3 && (
          <div
            className="add-scheme-card"
            onClick={() => setShowSelector(true)}
          >
            <FaPlus className="add-icon" />
            <p>Add Scheme to Compare</p>
            <span className="add-hint">
              {3 - selectedSchemes.length} more can be added
            </span>
          </div>
        )}

        {selectedSchemes.length > 0 && (
          <button className="clear-all-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {/* Scheme Selection Modal with Search */}
      {showSelector && (
        <div className="modal-overlay" onClick={() => setShowSelector(false)}>
          <div
            className="scheme-selector-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select Scheme to Compare</h3>

            {/* Search and Filter */}
            <div className="search-filter-container">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-box">
                <FaFilter className="filter-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="scheme-list">
              {getFilteredSchemes()
                .filter(
                  (scheme) => !selectedSchemes.find((s) => s.id === scheme.id),
                )
                .map((scheme) => (
                  <div
                    key={scheme.id}
                    className="scheme-list-item"
                    onClick={() => addToCompare(scheme)}
                  >
                    <div className="scheme-list-icon">
                      {getCategoryIcon(scheme.category)}
                    </div>
                    <div className="scheme-list-info">
                      <h4>{scheme.scheme_name}</h4>
                      <div className="scheme-meta">
                        <span className="scheme-list-category">
                          {scheme.category}
                        </span>
                        {scheme.subCategory &&
                          scheme.subCategory !== "Central" && (
                            <span className="scheme-list-state">
                              {scheme.subCategory}
                            </span>
                          )}
                      </div>
                    </div>
                    <button className="add-btn">Add</button>
                  </div>
                ))}
              {getFilteredSchemes().length === 0 && (
                <div className="no-results">
                  <p>No schemes found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedSchemes.length > 0 && (
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-column">Features</th>
                {selectedSchemes.map((scheme) => (
                  <th key={scheme.id} className="scheme-column">
                    <div className="scheme-column-header">
                      <h4>{scheme.scheme_name}</h4>
                      <span className="scheme-category-tag">
                        {scheme.category}
                      </span>
                      {scheme.subCategory &&
                        scheme.subCategory !== "Central" && (
                          <span className="scheme-state-tag">
                            {scheme.subCategory}
                          </span>
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field) => (
                <tr key={field.key}>
                  <td className="feature-name">
                    <strong>{field.label}</strong>
                  </td>
                  {selectedSchemes.map((scheme) => {
                    const value = getNestedValue(scheme, field.key);
                    return (
                      <td key={scheme.id} className="feature-value">
                        {field.type === "array" && Array.isArray(value) ? (
                          <div className="document-list-compare">
                            {value.map((item, idx) => (
                              <span key={idx} className="doc-tag-compare">
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : field.type === "object" && value ? (
                          <div className="object-value">
                            {value.min && `Min: ${value.min}`}
                            {value.max && ` Max: ${value.max}`}
                          </div>
                        ) : field.type === "link" &&
                          value &&
                          value !== "Not specified" ? (
                          <a
                            href={
                              value.startsWith("http")
                                ? value
                                : `https://${value}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="website-link"
                          >
                            Visit Website <FaExternalLinkAlt size={12} />
                          </a>
                        ) : (
                          value || "Not specified"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Actions Row */}
              <tr className="actions-row">
                <td className="feature-name">Actions</td>
                {selectedSchemes.map((scheme) => (
                  <td key={scheme.id} className="action-buttons">
                    <button
                      className={`apply-btn-compare ${applicationStatus[scheme.id] || ""}`}
                      onClick={() => handleApplyNow(scheme)}
                      disabled={
                        applicationStatus[scheme.id] === "applying" ||
                        applicationStatus[scheme.id] === "success"
                      }
                    >
                      {applicationStatus[scheme.id] === "applying"
                        ? "Applying..."
                        : applicationStatus[scheme.id] === "success"
                          ? "Applied ✓"
                          : applicationStatus[scheme.id] === "ineligible"
                            ? "Not Eligible"
                            : "Apply Now"}
                    </button>
                    <button
                      className="details-btn-compare"
                      onClick={() => handleViewDetails(scheme)}
                    >
                      <FaInfoCircle /> Details
                    </button>
                    <button
                      className="download-btn-compare"
                      onClick={() => downloadApplicationForm(scheme)}
                      title="Download Application Form"
                    >
                      <FaDownload />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedSchemeDetails && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="scheme-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{selectedSchemeDetails.scheme_name}</h3>
              <button
                className="close-modal"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-section">
                <h4>Description</h4>
                <p>{selectedSchemeDetails.description}</p>
              </div>

              <div className="detail-section">
                <h4>Ministry</h4>
                <p>{selectedSchemeDetails.ministry || "Not specified"}</p>
              </div>

              <div className="detail-section">
                <h4>Benefits</h4>
                {selectedSchemeDetails.benefits?.length > 0 ? (
                  <ul>
                    {selectedSchemeDetails.benefits.map((benefit, idx) => (
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
                    {selectedSchemeDetails.eligibility?.occupation?.join(
                      ", ",
                    ) || "Any"}
                  </div>
                  <div className="eligibility-item">
                    <strong>Age Range:</strong>{" "}
                    {selectedSchemeDetails.eligibility?.age_range?.min || "Any"}{" "}
                    -{" "}
                    {selectedSchemeDetails.eligibility?.age_range?.max || "Any"}{" "}
                    years
                  </div>
                  <div className="eligibility-item">
                    <strong>Income Limit:</strong>{" "}
                    {selectedSchemeDetails.eligibility?.income_limit || "None"}
                  </div>
                  <div className="eligibility-item">
                    <strong>Gender:</strong>{" "}
                    {selectedSchemeDetails.eligibility?.gender || "All"}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Required Documents</h4>
                {selectedSchemeDetails.required_documents?.length > 0 ? (
                  <ul>
                    {selectedSchemeDetails.required_documents.map(
                      (doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p>No documents specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Application Process</h4>
                <p>
                  <strong>Mode:</strong>{" "}
                  {selectedSchemeDetails.application_process?.mode ||
                    "Not specified"}
                </p>
                {selectedSchemeDetails.application_process?.steps?.length >
                0 ? (
                  <ol>
                    {selectedSchemeDetails.application_process.steps.map(
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
                {selectedSchemeDetails.official_website &&
                selectedSchemeDetails.official_website !== "Not specified" ? (
                  <a
                    href={
                      selectedSchemeDetails.official_website.startsWith("http")
                        ? selectedSchemeDetails.official_website
                        : `https://${selectedSchemeDetails.official_website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {selectedSchemeDetails.official_website}{" "}
                    <FaExternalLinkAlt />
                  </a>
                ) : (
                  <p>Not specified</p>
                )}
              </div>

              <div className="detail-section">
                <h4>Languages Supported</h4>
                {selectedSchemeDetails.languages_supported?.length > 0 ? (
                  <div className="language-tags">
                    {selectedSchemeDetails.languages_supported.map(
                      (lang, idx) => (
                        <span key={idx} className="language-tag">
                          {lang}
                        </span>
                      ),
                    )}
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
                  handleApplyNow(selectedSchemeDetails);
                }}
              >
                Apply Now
              </button>
              <button
                className="download-btn"
                onClick={() => downloadApplicationForm(selectedSchemeDetails)}
              >
                <FaDownload /> Download Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation based on comparison */}
      {selectedSchemes.length > 1 && (
        <div className="comparison-recommendation">
          <h3>
            <FaBalanceScale /> Our Recommendation
          </h3>
          <div className="recommendation-card">
            <p>
              Based on your profile,{" "}
              <strong>{selectedSchemes[0].scheme_name}</strong> might be the
              best fit for you. It offers{" "}
              {Array.isArray(selectedSchemes[0].benefits)
                ? selectedSchemes[0].benefits[0]
                : selectedSchemes[0].benefits || "great benefits"}{" "}
              with eligibility criteria that match your profile. However,
              consider applying for multiple schemes if you qualify.
            </p>
            <button
              className="apply-recommended-btn"
              onClick={() => handleApplyNow(selectedSchemes[0])}
            >
              Apply for {selectedSchemes[0].scheme_name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get category icon
const getCategoryIcon = (category) => {
  const icons = {
    Agriculture: "🌾",
    Education: "📚",
    Health: "🏥",
    Housing: "🏠",
    Energy: "⚡",
    Infrastructure: "🏗️",
    "State Scheme": "🏛️",
    "SC/ST": "🤝",
    Pension: "👴",
    Military: "🎖️",
    "Women & Child": "👩‍👧",
    "Social Welfare": "🤲",
  };
  return icons[category] || "📋";
};

export default CompareSchemes;
