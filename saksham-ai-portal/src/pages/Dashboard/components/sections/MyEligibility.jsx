import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaEdit,
  FaSave,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRupeeSign,
  FaUser,
  FaCalendarAlt,
  FaHome,
  FaUsers,
  FaTractor,
  FaHeartbeat,
  FaGraduationCap,
  FaFemale,
  FaChild,
  FaBriefcase,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaTimes,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { authAPI, applicationAPI } from "@/services/api";
import "/src/pages/Dashboard/dashboard-sections.css";

const MyEligibility = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [allSchemes, setAllSchemes] = useState([]);
  const [eligibilityResults, setEligibilityResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [fetchProgress, setFetchProgress] = useState({ loaded: 0, total: 0 });

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
    eligible: 0,
    partial: 0,
    ineligible: 0,
    total: 0,
  });

  const [profile, setProfile] = useState({
    age: user?.age || "",
    occupation: user?.occupation || "",
    annualIncome: user?.annualIncome || "",
    category: user?.category || "General",
    gender: user?.gender || "",
    state: user?.state || "",
    district: user?.district || "",
    familySize: user?.familySize || 1,
    landOwned: user?.landOwned || "",
    disability: user?.disability || "None",
    dob: user?.dob || "",
    aadhaar: user?.aadhaar || "",
    pan: user?.pan || "",
    isStudent: user?.isStudent || false,
    isFarmer: user?.isFarmer || false,
    isWidow: user?.isWidow || false,
    isDisabled: user?.isDisabled || false,
    hasGirlChild: user?.hasGirlChild || false,
    isBPL: user?.isBPL || false,
  });

  const [tempProfile, setTempProfile] = useState(profile);

  // Base path for JSON files
  const BASE_PATH = "/Indian_Government_Schemes_Dataset";

  useEffect(() => {
    fetchAllSchemes();
  }, []);

  useEffect(() => {
    if (allSchemes.length > 0) {
      calculateEligibility();
    }
  }, [allSchemes, profile]);

  const fetchAllSchemes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Define all scheme paths (keeping your existing schemePaths array)
      const schemePaths = [
        // Central Schemes - Agriculture
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Kisan_Samman_Nidhi.json`,
          category: "Agriculture",
          subCategory: "Central",
          icon: <FaTractor />,
          color: "#ff9933",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/PM_Fasal_Bima_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
          icon: <FaTractor />,
          color: "#228b22",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Kisan_Credit_Card.json`,
          category: "Agriculture",
          subCategory: "Central",
          icon: <FaTractor />,
          color: "#4b0082",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Paramparagat_Krishi_Vikas_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
          icon: <FaTractor />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Agriculture/Pradhan_Mantri_Krishi_Sinchai_Yojana.json`,
          category: "Agriculture",
          subCategory: "Central",
          icon: <FaTractor />,
          color: "#20b2aa",
        },

        // Central Schemes - Education
        {
          path: `${BASE_PATH}/Central_Schemes/Education/PM_Vidya_Lakshmi.json`,
          category: "Education",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#000080",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Means_Cum_Merit_Scholarship.json`,
          category: "Education",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Beti_Bachao_Beti_Padhao.json`,
          category: "Education",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/National_Incentive_for_Girls.json`,
          category: "Education",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Education/Mid_Day_Meal_Scheme.json`,
          category: "Education",
          subCategory: "Central",
          icon: <FaChild />,
          color: "#20b2aa",
        },

        // Central Schemes - Health
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Ayushman_Bharat_PMJAY.json`,
          category: "Health",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#138808",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Jan_Arogya_Yojana.json`,
          category: "Health",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#cd5c5c",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Health_Mission.json`,
          category: "Health",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#20b2aa",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/National_Tuberculosis_Elimination_Program.json`,
          category: "Health",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#4682b4",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Health/Pradhan_Mantri_Bhartiya_Janaushadhi_Pariyojana.json`,
          category: "Health",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#ff6b6b",
        },

        // Central Schemes - Social Welfare
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/PM_Awas_Yojana.json`,
          category: "Housing",
          subCategory: "Central",
          icon: <FaHome />,
          color: "#ff6b6b",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/Ujjwala_Yojana.json`,
          category: "Energy",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#ff8c00",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Social_Welfare/National_Social_Assistance_Programme.json`,
          category: "Social Welfare",
          subCategory: "Central",
          icon: <FaHandHoldingHeart />,
          color: "#708090",
        },

        // Central Schemes - Infrastructure
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/PM_Gram_Sadak_Yojana.json`,
          category: "Infrastructure",
          subCategory: "Central",
          icon: "🛣️",
          color: "#795548",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/Smart_Cities_Mission.json`,
          category: "Infrastructure",
          subCategory: "Central",
          icon: "🏙️",
          color: "#607d8b",
        },
        {
          path: `${BASE_PATH}/Central_Schemes/Infrastructure/AMRUT.json`,
          category: "Infrastructure",
          subCategory: "Central",
          icon: "💧",
          color: "#2196f3",
        },

        // State Schemes - Maharashtra
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/Mahatma_Phule_Jayanti.json`,
          category: "State Scheme",
          subCategory: "Maharashtra",
          icon: <FaUser />,
          color: "#9c27b0",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/Lok_Awas_Yojana.json`,
          category: "Housing",
          subCategory: "Maharashtra",
          icon: <FaHome />,
          color: "#ff5722",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Maharashtra/MHADA_Housing.json`,
          category: "Housing",
          subCategory: "Maharashtra",
          icon: <FaHome />,
          color: "#e91e63",
        },

        // State Schemes - Tamil Nadu
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Amma_Canteen.json`,
          category: "Food Security",
          subCategory: "Tamil Nadu",
          icon: "🍛",
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Kalaignar_Insurance_Scheme.json`,
          category: "Health",
          subCategory: "Tamil Nadu",
          icon: <FaHeartbeat />,
          color: "#4caf50",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Magalir_Urimai_Thogai.json`,
          category: "Women",
          subCategory: "Tamil Nadu",
          icon: <FaFemale />,
          color: "#e91e63",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Tamil_Nadu/Tamil_Nadu_Assured_Pension.json`,
          category: "Pension",
          subCategory: "Tamil Nadu",
          icon: "👴",
          color: "#9e9e9e",
        },

        // State Schemes - Karnataka
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Anna_Bhagya.json`,
          category: "Food Security",
          subCategory: "Karnataka",
          icon: "🍚",
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Ksheera_Santhwana.json`,
          category: "Child",
          subCategory: "Karnataka",
          icon: <FaChild />,
          color: "#ffc107",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Gruha_Jyothi.json`,
          category: "Energy",
          subCategory: "Karnataka",
          icon: "💡",
          color: "#ffeb3b",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Karnataka/Gruhalakshmi.json`,
          category: "Women",
          subCategory: "Karnataka",
          icon: <FaFemale />,
          color: "#ff4081",
        },

        // State Schemes - Uttar Pradesh
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Mukhyamantri_Kanya_Sumangala_Yojana.json`,
          category: "Women",
          subCategory: "Uttar Pradesh",
          icon: <FaFemale />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Farm_Power_Supply_Scheme.json`,
          category: "Agriculture",
          subCategory: "Uttar Pradesh",
          icon: <FaTractor />,
          color: "#8bc34a",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Janani_Shishi_Suraksha_Karyakram.json`,
          category: "Health",
          subCategory: "Uttar Pradesh",
          icon: <FaHeartbeat />,
          color: "#00bcd4",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Sardar_Vallabhbhai_Patel_Employment_and_Industrial_Zone.json`,
          category: "Employment",
          subCategory: "Uttar Pradesh",
          icon: <FaBriefcase />,
          color: "#3f51b5",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Swami_Vivekananda_Yuva_Sashaktikaran_Yojana.json`,
          category: "Youth",
          subCategory: "Uttar Pradesh",
          icon: "👨‍🎓",
          color: "#673ab7",
        },
        {
          path: `${BASE_PATH}/State_Schemes/Uttar_Pradesh/Yuva_Udyami_Vikas_Abhiyan.json`,
          category: "Business",
          subCategory: "Uttar Pradesh",
          icon: <FaBriefcase />,
          color: "#009688",
        },

        // State Schemes - West Bengal
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Aikyashree.json`,
          category: "Education",
          subCategory: "West Bengal",
          icon: <FaGraduationCap />,
          color: "#9c27b0",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Kanyashree_Prakalpa.json`,
          category: "Women",
          subCategory: "West Bengal",
          icon: <FaFemale />,
          color: "#e91e63",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Khadya_Sathi.json`,
          category: "Food Security",
          subCategory: "West Bengal",
          icon: "🍚",
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Rupashree.json`,
          category: "Women",
          subCategory: "West Bengal",
          icon: <FaFemale />,
          color: "#ff4081",
        },
        {
          path: `${BASE_PATH}/State_Schemes/West_Bengal/Swasthya_Sathi.json`,
          category: "Health",
          subCategory: "West Bengal",
          icon: <FaHeartbeat />,
          color: "#4caf50",
        },

        // SC/ST Schemes
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Post_Matric_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#673ab7",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/National_Fellowship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#3f51b5",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Vanbandhu_Kalyan_Yojana.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: "🏕️",
          color: "#8bc34a",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Eklavya_Model_Residential_Schools.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/National_Overseas_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#00bcd4",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Pre_Matric_Scholarship_SC.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#009688",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Rajiv_Gandhi_National_Fellowship_ST.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#795548",
        },
        {
          path: `${BASE_PATH}/SC_ST_Schemes/Top_Class_Education_ST.json`,
          category: "SC/ST",
          subCategory: "Central",
          icon: <FaGraduationCap />,
          color: "#607d8b",
        },

        // Pension Schemes
        {
          path: `${BASE_PATH}/Pension_Schemes/National_Pension_System.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "💰",
          color: "#9e9e9e",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Atal_Pension_Yojana.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "💰",
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Pradhan_Mantri_Vaya_Vandana_Yojana.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "👴",
          color: "#607d8b",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Old_Age_Pension.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "👴",
          color: "#795548",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Pradhan_Mantri_Shram_Yogi_Maan_Dhan.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "👨‍🔧",
          color: "#9e9e9e",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Disability_Pension.json`,
          category: "Pension",
          subCategory: "Central",
          icon: "♿",
          color: "#f44336",
        },
        {
          path: `${BASE_PATH}/Pension_Schemes/Indira_Gandhi_National_Widow_Pension.json`,
          category: "Pension",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#e91e63",
        },

        // Military Relief
        {
          path: `${BASE_PATH}/Military_Relief/Prime_Minister_Relief_Fund.json`,
          category: "Military",
          subCategory: "Central",
          icon: "🆘",
          color: "#f44336",
        },
        {
          path: `${BASE_PATH}/Military_Relief/Army_Welfare_Fund.json`,
          category: "Military",
          subCategory: "Central",
          icon: "🎖️",
          color: "#4caf50",
        },
        {
          path: `${BASE_PATH}/Military_Relief/National_Defence_Fund.json`,
          category: "Military",
          subCategory: "Central",
          icon: "🎖️",
          color: "#2196f3",
        },
        {
          path: `${BASE_PATH}/Military_Relief/Ex_Servicemen_Contributory_Health_Scheme.json`,
          category: "Military",
          subCategory: "Central",
          icon: <FaHeartbeat />,
          color: "#00bcd4",
        },

        // Women & Child Welfare
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Integrated_Child_Development_Services.json`,
          category: "Women & Child",
          subCategory: "Central",
          icon: <FaChild />,
          color: "#ff9800",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Pradhan_Mantri_Matru_Vandana_Yojana.json`,
          category: "Women & Child",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#e91e63",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/Sukanya_Samriddhi_Yojana.json`,
          category: "Women & Child",
          subCategory: "Central",
          icon: <FaChild />,
          color: "#ff1493",
        },
        {
          path: `${BASE_PATH}/Women_Child_Welfare/One_Stop_Centre_Scheme.json`,
          category: "Women & Child",
          subCategory: "Central",
          icon: <FaFemale />,
          color: "#9c27b0",
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

          // Get benefit text
          let benefitText = "Check scheme details";
          if (data.benefits && data.benefits.length > 0) {
            benefitText = data.benefits[0];
          }

          return {
            ...data,
            id: data.scheme_id || `scheme-${index}-${Date.now()}`,
            category: schemeInfo.category,
            subCategory: schemeInfo.subCategory,
            icon: schemeInfo.icon,
            color: schemeInfo.color,
            benefitDisplay: benefitText,
            path: schemeInfo.path,
          };
        } catch (err) {
          console.error(`Error fetching ${schemeInfo.path}:`, err);
          setFetchProgress((prev) => ({ ...prev, loaded: prev.loaded + 1 }));
          return null;
        }
      });

      const results = await Promise.all(fetchPromises);
      const validSchemes = results.filter((scheme) => scheme !== null);
      setAllSchemes(validSchemes);
    } catch (err) {
      console.error("Error fetching schemes:", err);
      setError("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = () => {
    if (!profile.dob) return null;
    const birthDate = new Date(profile.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateEligibility = () => {
    const age = calculateAge();
    const results = allSchemes.map((scheme) => {
      let matchScore = 50; // Base score
      let reasons = [];
      let status = "ineligible";

      // Check age eligibility
      if (scheme.eligibility?.age_range && age) {
        if (
          age >= (scheme.eligibility.age_range.min || 0) &&
          age <= (scheme.eligibility.age_range.max || 100)
        ) {
          matchScore += 20;
          reasons.push("Age criteria met");
        } else {
          reasons.push("Age criteria not met");
        }
      }

      // Check income eligibility
      if (scheme.eligibility?.income_limit && profile.annualIncome) {
        const limitMatch = scheme.eligibility.income_limit.match(/\d+/);
        if (limitMatch) {
          const limit = parseInt(limitMatch[0]) * 1000;
          if (profile.annualIncome <= limit) {
            matchScore += 15;
            reasons.push("Income criteria met");
          } else {
            reasons.push("Income exceeds limit");
          }
        }
      }

      // Check gender eligibility
      if (scheme.eligibility?.gender && profile.gender) {
        if (
          scheme.eligibility.gender === "All" ||
          scheme.eligibility.gender.toLowerCase() ===
            profile.gender.toLowerCase()
        ) {
          matchScore += 10;
          reasons.push("Gender criteria met");
        }
      }

      // Check occupation eligibility
      if (scheme.eligibility?.occupation && profile.occupation) {
        if (
          scheme.eligibility.occupation.some((occ) =>
            occ.toLowerCase().includes(profile.occupation.toLowerCase()),
          )
        ) {
          matchScore += 15;
          reasons.push("Occupation matches");
        }
      }

      // Check category for SC/ST schemes
      if (scheme.category === "SC/ST" && profile.category) {
        if (profile.category === "SC" || profile.category === "ST") {
          matchScore += 25;
          reasons.push("SC/ST category eligible");
        }
      }

      // Check state for state schemes
      if (scheme.subCategory && profile.state) {
        if (scheme.subCategory.includes(profile.state)) {
          matchScore += 15;
          reasons.push(`Eligible for ${profile.state} state scheme`);
        } else if (
          scheme.subCategory !== "Central" &&
          !scheme.subCategory.includes(profile.state)
        ) {
          matchScore -= 20;
          reasons.push("Not a resident of this state");
        }
      }

      // Check if farmer for agriculture schemes
      if (
        scheme.category === "Agriculture" &&
        profile.occupation === "Farmer"
      ) {
        matchScore += 10;
        reasons.push("Farmer eligible");
      }

      // Check if student for education schemes
      if (scheme.category === "Education" && profile.isStudent) {
        matchScore += 10;
        reasons.push("Student eligible");
      }

      // Check if widow for widow schemes
      if (
        scheme.scheme_name?.toLowerCase().includes("widow") &&
        profile.isWidow
      ) {
        matchScore += 30;
        reasons.push("Widow eligible");
      }

      // Check disability
      if (scheme.eligibility?.other_conditions) {
        if (
          scheme.eligibility.other_conditions.some((cond) =>
            cond.toLowerCase().includes("disability"),
          ) &&
          profile.isDisabled
        ) {
          matchScore += 20;
          reasons.push("Disability criteria met");
        }
      }

      // Determine status based on match score
      if (matchScore >= 70) {
        status = "eligible";
      } else if (matchScore >= 40) {
        status = "partial";
      } else {
        status = "ineligible";
      }

      // Cap score at 100
      matchScore = Math.min(matchScore, 100);

      return {
        ...scheme,
        matchScore,
        status,
        reasons: reasons.join(". "),
      };
    });

    // Sort by match score (highest first)
    const sortedResults = results.sort((a, b) => b.matchScore - a.matchScore);
    setEligibilityResults(sortedResults);

    // Calculate stats
    const eligible = sortedResults.filter(
      (r) => r.status === "eligible",
    ).length;
    const partial = sortedResults.filter((r) => r.status === "partial").length;
    const ineligible = sortedResults.filter(
      (r) => r.status === "ineligible",
    ).length;

    setStats({
      eligible,
      partial,
      ineligible,
      total: sortedResults.length,
    });
  };

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await authAPI.updateProfile(tempProfile);
      if (response.success) {
        setProfile(tempProfile);
        setUser({ ...user, ...tempProfile });
        setIsEditing(false);
        calculateEligibility();
      }
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const getFilteredResults = () => {
    if (filter === "all") return eligibilityResults;
    return eligibilityResults.filter((r) => r.status === filter);
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

  // Modal handlers
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
      <div className="my-eligibility loading-state">
        <div className="loading-spinner"></div>
        <p>Loading your eligibility data...</p>
        <p className="loading-progress">
          Loading schemes: {fetchProgress.loaded} / {fetchProgress.total}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-eligibility error-state">
        <FaExclamationTriangle className="error-icon" />
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchAllSchemes} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-eligibility">
      <div className="eligibility-header">
        <h2>🎯 My Eligibility Profile</h2>
        <p className="section-description">
          Update your details to see accurate scheme eligibility
        </p>
      </div>

      {/* Eligibility Summary Cards */}
      <div className="eligibility-summary-cards">
        <div className="summary-card eligible">
          <div className="summary-icon">
            <FaCheckCircle />
          </div>
          <div className="summary-details">
            <h3>{stats.eligible}</h3>
            <p>Eligible Schemes</p>
          </div>
        </div>
        <div className="summary-card partial">
          <div className="summary-icon">
            <FaMinusCircle />
          </div>
          <div className="summary-details">
            <h3>{stats.partial}</h3>
            <p>Partially Eligible</p>
          </div>
        </div>
        <div className="summary-card ineligible">
          <div className="summary-icon">
            <FaTimesCircle />
          </div>
          <div className="summary-details">
            <h3>{stats.ineligible}</h3>
            <p>Ineligible Schemes</p>
          </div>
        </div>
        <div className="summary-card total">
          <div className="summary-icon">
            <FaInfoCircle />
          </div>
          <div className="summary-details">
            <h3>{stats.total}</h3>
            <p>Total Schemes</p>
          </div>
        </div>
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
              <button
                className="save-profile-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <FaSpinner className="spinning" /> : <FaSave />}
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="cancel-profile-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <label>Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={tempProfile.dob}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <p>
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString("en-IN")
                  : "Not provided"}{" "}
                {profile.dob && `(${calculateAge()} years)`}
              </p>
            )}
          </div>

          <div className="profile-item">
            <label>Occupation</label>
            {isEditing ? (
              <select
                name="occupation"
                value={tempProfile.occupation}
                onChange={handleInputChange}
                className="profile-select"
              >
                <option value="">Select Occupation</option>
                <option value="Farmer">Farmer</option>
                <option value="Student">Student</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Private Employee">Private Employee</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
              </select>
            ) : (
              <p>{profile.occupation || "Not specified"}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Annual Income (₹)</label>
            {isEditing ? (
              <input
                type="number"
                name="annualIncome"
                value={tempProfile.annualIncome}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="Enter annual income"
              />
            ) : (
              <p>
                ₹
                {profile.annualIncome
                  ? profile.annualIncome.toLocaleString()
                  : "Not specified"}
              </p>
            )}
          </div>

          <div className="profile-item">
            <label>Category</label>
            {isEditing ? (
              <select
                name="category"
                value={tempProfile.category}
                onChange={handleInputChange}
                className="profile-select"
              >
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{profile.category}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={tempProfile.gender}
                onChange={handleInputChange}
                className="profile-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{profile.gender || "Not specified"}</p>
            )}
          </div>

          <div className="profile-item">
            <label>State</label>
            {isEditing ? (
              <select
                name="state"
                value={tempProfile.state}
                onChange={handleInputChange}
                className="profile-select"
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
                <option value="Gujarat">Gujarat</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{profile.state || "Not specified"}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Family Size</label>
            {isEditing ? (
              <input
                type="number"
                name="familySize"
                value={tempProfile.familySize}
                onChange={handleInputChange}
                className="profile-input"
                min="1"
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
                name="landOwned"
                value={tempProfile.landOwned}
                onChange={handleInputChange}
                className="profile-input"
                placeholder="e.g., 2 acres"
              />
            ) : (
              <p>{profile.landOwned || "Not specified"}</p>
            )}
          </div>

          {isEditing && (
            <>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="isStudent"
                    checked={tempProfile.isStudent}
                    onChange={handleInputChange}
                  />
                  I am a student
                </label>
              </div>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="isFarmer"
                    checked={tempProfile.isFarmer}
                    onChange={handleInputChange}
                  />
                  I am a farmer
                </label>
              </div>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="isWidow"
                    checked={tempProfile.isWidow}
                    onChange={handleInputChange}
                  />
                  I am a widow
                </label>
              </div>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="isDisabled"
                    checked={tempProfile.isDisabled}
                    onChange={handleInputChange}
                  />
                  I have a disability
                </label>
              </div>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="hasGirlChild"
                    checked={tempProfile.hasGirlChild}
                    onChange={handleInputChange}
                  />
                  I have a girl child
                </label>
              </div>
              <div className="profile-item checkbox-item">
                <label>
                  <input
                    type="checkbox"
                    name="isBPL"
                    checked={tempProfile.isBPL}
                    onChange={handleInputChange}
                  />
                  I am a BPL family
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Eligibility Results */}
      <div className="eligibility-results">
        <div className="results-header">
          <h3>Scheme Eligibility Results</h3>
          <div className="results-filter">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({stats.total})
            </button>
            <button
              className={`filter-btn eligible ${filter === "eligible" ? "active" : ""}`}
              onClick={() => setFilter("eligible")}
            >
              Eligible ({stats.eligible})
            </button>
            <button
              className={`filter-btn partial ${filter === "partial" ? "active" : ""}`}
              onClick={() => setFilter("partial")}
            >
              Partially ({stats.partial})
            </button>
            <button
              className={`filter-btn ineligible ${filter === "ineligible" ? "active" : ""}`}
              onClick={() => setFilter("ineligible")}
            >
              Ineligible ({stats.ineligible})
            </button>
          </div>
        </div>

        <div className="results-table">
          <div className="results-table-header">
            <div>Scheme Name</div>
            <div>Category</div>
            <div>Status</div>
            <div>Match Score</div>
            <div>Benefit</div>
            <div>Action</div>
          </div>

          {getFilteredResults().map((result, index) => (
            <div key={index} className="results-table-row">
              <div className="scheme-name-cell">
                <div
                  className="scheme-dot"
                  style={{ background: result.color }}
                ></div>
                <div>
                  <div className="scheme-title">{result.scheme_name}</div>
                  <div className="scheme-subtitle">{result.subCategory}</div>
                </div>
              </div>

              <div className="category-cell">
                <span
                  className="category-badge"
                  style={{
                    background: `${result.color}20`,
                    color: result.color,
                  }}
                >
                  {result.category}
                </span>
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
                        result.matchScore >= 70
                          ? "#138808"
                          : result.matchScore >= 40
                            ? "#ff9933"
                            : "#ff4444",
                    }}
                  ></div>
                  <span className="score-text">{result.matchScore}%</span>
                </div>
              </div>

              <div className="benefit-cell">{result.benefitDisplay}</div>

              <div className="action-cell">
                {result.status !== "ineligible" && (
                  <button
                    className="apply-small-btn"
                    onClick={() => handleApplyNow(result)}
                  >
                    Apply
                  </button>
                )}
                <button
                  className="details-btn"
                  onClick={() => handleViewDetails(result)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="eligibility-note">
          <FaInfoCircle className="note-icon" />
          <p>
            <strong>Note:</strong> Eligibility is calculated based on your
            profile information. Final eligibility may vary based on scheme
            guidelines and document verification. Match scores are indicative
            and for reference only.
          </p>
        </div>
      </div>

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

export default MyEligibility;
