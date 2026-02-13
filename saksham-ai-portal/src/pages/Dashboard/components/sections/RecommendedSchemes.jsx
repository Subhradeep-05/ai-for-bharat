import React, { useState } from "react";
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
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const RecommendedSchemes = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("match");

  const categories = [
    { id: "all", name: "All Schemes", icon: "📋" },
    { id: "agriculture", name: "Agriculture", icon: <FaTractor /> },
    { id: "health", name: "Health", icon: <FaHeartbeat /> },
    { id: "education", name: "Education", icon: <FaGraduationCap /> },
    { id: "housing", name: "Housing", icon: <FaHome /> },
    { id: "business", name: "Business", icon: <FaBriefcase /> },
    { id: "women", name: "Women", icon: <FaFemale /> },
    { id: "child", name: "Child", icon: <FaChild /> },
  ];

  const allSchemes = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      category: "agriculture",
      icon: <FaTractor />,
      benefit: "₹6,000/year",
      description: "Income support for small and marginal farmers",
      eligibility: "Small and marginal farmers with land up to 2 hectares",
      documents: ["Aadhaar", "Land records", "Bank account", "Passport photo"],
      deadline: "Ongoing",
      matchScore: 95,
      color: "#ff9933",
      featured: true,
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      category: "health",
      icon: <FaHeartbeat />,
      benefit: "₹5,00,000 per family per year",
      description: "Health insurance cover for secondary and tertiary care",
      eligibility: "Families identified as per SECC database",
      documents: ["Aadhaar", "Ration card", "Income certificate"],
      deadline: "Ongoing",
      matchScore: 88,
      color: "#138808",
      featured: true,
    },
    {
      id: 3,
      name: "PM Scholarship Scheme",
      category: "education",
      icon: <FaGraduationCap />,
      benefit: "₹12,000 per year",
      description:
        "Scholarship for meritorious students from low-income families",
      eligibility: "Family income less than ₹2.5L/year, minimum 50% marks",
      documents: [
        "Aadhaar",
        "Income certificate",
        "Marksheets",
        "Bank passbook",
      ],
      deadline: "Oct 31, 2024",
      matchScore: 72,
      color: "#000080",
      featured: false,
    },
    {
      id: 4,
      name: "PM Awas Yojana",
      category: "housing",
      icon: <FaHome />,
      benefit: "₹2.5 lakh subsidy",
      description: "Housing for all - affordable housing scheme",
      eligibility: "Families with no pucca house, income criteria",
      documents: ["Aadhaar", "Income certificate", "Land documents", "Photo"],
      deadline: "Dec 31, 2024",
      matchScore: 82,
      color: "#ff6b6b",
      featured: true,
    },
    {
      id: 5,
      name: "Sukanya Samriddhi Yojana",
      category: "child",
      icon: <FaChild />,
      benefit: "8.2% interest rate, tax benefits",
      description: "Savings scheme for girl child education and marriage",
      eligibility: "Girl child below 10 years",
      documents: ["Birth certificate", "Aadhaar", "Bank account"],
      deadline: "Ongoing",
      matchScore: 94,
      color: "#ff1493",
      featured: true,
    },
    {
      id: 6,
      name: "PM Mudra Yojana",
      category: "business",
      icon: <FaBriefcase />,
      benefit: "Loans from ₹50,000 to ₹10 lakh",
      description: "Loans for non-corporate, non-farm small businesses",
      eligibility: "Small business owners, entrepreneurs",
      documents: ["Aadhaar", "PAN card", "Business proof", "Bank statement"],
      deadline: "Ongoing",
      matchScore: 68,
      color: "#20b2aa",
      featured: false,
    },
    {
      id: 7,
      name: "PM Ujjwala Yojana",
      category: "women",
      icon: <FaFemale />,
      benefit: "Free LPG connection",
      description: "Free cooking gas connection to BPL families",
      eligibility: "Women from BPL families",
      documents: ["Aadhaar", "BPL certificate", "Ration card"],
      deadline: "Limited slots",
      matchScore: 85,
      color: "#ff8c00",
      featured: true,
    },
    {
      id: 8,
      name: "National Pension Scheme",
      category: "business",
      icon: "💰",
      benefit: "Pension after 60 years",
      description: "Retirement savings scheme for all citizens",
      eligibility: "All citizens between 18-60 years",
      documents: ["Aadhaar", "PAN card", "Bank account"],
      deadline: "Ongoing",
      matchScore: 45,
      color: "#4b0082",
      featured: false,
    },
    {
      id: 9,
      name: "PM Fasal Bima Yojana",
      category: "agriculture",
      icon: <FaTractor />,
      benefit: "Insurance coverage for crops",
      description: "Crop insurance against natural calamities",
      eligibility: "Farmers with loan or land records",
      documents: ["Land records", "Aadhaar", "Bank account"],
      deadline: "Seasonal",
      matchScore: 91,
      color: "#228b22",
      featured: true,
    },
    {
      id: 10,
      name: "Rashtriya Swasthya Bima Yojana",
      category: "health",
      icon: <FaHeartbeat />,
      benefit: "₹30,000 cover",
      description: "Health insurance for BPL families",
      eligibility: "BPL families",
      documents: ["BPL card", "Aadhaar", "Ration card"],
      deadline: "Ongoing",
      matchScore: 76,
      color: "#cd5c5c",
      featured: false,
    },
    {
      id: 11,
      name: "Post Matric Scholarship",
      category: "education",
      icon: <FaGraduationCap />,
      benefit: "Full tuition + maintenance",
      description: "For SC/ST students for post-matric education",
      eligibility: "SC/ST students with family income < ₹2.5L",
      documents: ["Caste certificate", "Income certificate", "Marksheets"],
      deadline: "Nov 15, 2024",
      matchScore: 62,
      color: "#4682b4",
      featured: false,
    },
    {
      id: 12,
      name: "Senior Citizen Pension",
      category: "women",
      icon: "👵",
      benefit: "₹300 per month",
      description: "Pension for senior citizens above 60 years",
      eligibility: "Age 60+, BPL family",
      documents: ["Age proof", "BPL certificate", "Aadhaar"],
      deadline: "Ongoing",
      matchScore: 15,
      color: "#708090",
      featured: false,
    },
  ];

  const filteredSchemes = allSchemes
    .filter((scheme) => {
      // Filter by search
      if (
        searchTerm &&
        !scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filter by category
      if (selectedCategory !== "all" && scheme.category !== selectedCategory) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "match") {
        return b.matchScore - a.matchScore;
      } else if (selectedSort === "name") {
        return a.name.localeCompare(b.name);
      } else if (selectedSort === "benefit") {
        return 0; // Simplified for demo
      }
      return 0;
    });

  return (
    <div className="recommended-schemes">
      <div className="schemes-header">
        <h2>📋 Recommended Government Schemes</h2>
        <p className="section-description">
          Personalized scheme recommendations based on your profile
        </p>
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
              <option value="benefit">Sort by: Benefit</option>
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
                    <h4>{scheme.name}</h4>
                    <p className="featured-description">{scheme.description}</p>
                    <div className="featured-benefit">
                      <span className="benefit-label">Benefit:</span>
                      <span className="benefit-value">{scheme.benefit}</span>
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
                    <h4>{scheme.name}</h4>
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
                      {scheme.benefit}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Eligibility:</span>
                    <span className="detail-value">{scheme.eligibility}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Deadline:</span>
                    <span
                      className={`detail-value ${
                        scheme.deadline === "Ongoing"
                          ? "ongoing"
                          : scheme.deadline.includes("Limited")
                            ? "urgent"
                            : ""
                      }`}
                    >
                      {scheme.deadline}
                    </span>
                  </div>

                  <div className="detail-item documents-item">
                    <span className="detail-label">Documents:</span>
                    <div className="document-tags">
                      {scheme.documents.slice(0, 3).map((doc, idx) => (
                        <span key={idx} className="document-tag">
                          {doc}
                        </span>
                      ))}
                      {scheme.documents.length > 3 && (
                        <span className="document-tag more">
                          +{scheme.documents.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="scheme-detailed-footer">
                  <button className="view-details-btn">View Details</button>
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
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedSchemes;
