import React, { useState } from "react";
import {
  FaBalanceScale,
  FaCheckCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaRupeeSign,
  FaCalendarAlt,
  FaFileAlt,
  FaClock,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const CompareSchemes = ({ user }) => {
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  const allSchemes = [
    {
      id: 1,
      name: "PM Kisan Samman Nidhi",
      category: "Agriculture",
      benefit: "₹6,000/year",
      eligibility: "Farmers with land up to 2 hectares",
      documents: ["Aadhaar", "Land records", "Bank account"],
      ageLimit: "18-70 years",
      incomeLimit: "No limit",
      gender: "All",
      applicationProcess: "Online/Offline",
      processingTime: "30 days",
      validity: "Lifetime",
      officialWebsite: "pmkisan.gov.in",
      helpline: "1800-180-1551",
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      category: "Health",
      benefit: "₹5,00,000 cover",
      eligibility: "Families in SECC database",
      documents: ["Aadhaar", "Ration card", "Income certificate"],
      ageLimit: "No limit",
      incomeLimit: "BPL families",
      gender: "All",
      applicationProcess: "At CSC centers",
      processingTime: "15 days",
      validity: "5 years",
      officialWebsite: "pmjay.gov.in",
      helpline: "14555",
    },
    {
      id: 3,
      name: "PM Scholarship",
      category: "Education",
      benefit: "₹12,000/year",
      eligibility: "Students with 50% marks, income < ₹2.5L",
      documents: ["Aadhaar", "Marksheets", "Income certificate"],
      ageLimit: "Upto 25 years",
      incomeLimit: "₹2.5 lakh/year",
      gender: "All",
      applicationProcess: "Online at NSP",
      processingTime: "45 days",
      validity: "1 year (renewable)",
      officialWebsite: "scholarships.gov.in",
      helpline: "0120-6619540",
    },
    {
      id: 4,
      name: "PM Awas Yojana",
      category: "Housing",
      benefit: "₹2.5 lakh subsidy",
      eligibility: "Families with no pucca house",
      documents: ["Aadhaar", "Income certificate", "Land documents"],
      ageLimit: "18+ years",
      incomeLimit: "EWS/LIG/MIG",
      gender: "All",
      applicationProcess: "Online/Offline",
      processingTime: "60 days",
      validity: "One time",
      officialWebsite: "pmaymis.gov.in",
      helpline: "1800-11-6163",
    },
    {
      id: 5,
      name: "Sukanya Samriddhi",
      category: "Child",
      benefit: "8.2% Interest",
      eligibility: "Girl child below 10 years",
      documents: ["Birth certificate", "Aadhaar"],
      ageLimit: "0-10 years",
      incomeLimit: "No limit",
      gender: "Female",
      applicationProcess: "At Post Office/Banks",
      processingTime: "Immediate",
      validity: "21 years or marriage",
      officialWebsite: "nsdl.co.in",
      helpline: "1800-222-440",
    },
    {
      id: 6,
      name: "PM Mudra Yojana",
      category: "Business",
      benefit: "₹50,000 - ₹10 lakh",
      eligibility: "Small business owners",
      documents: ["Aadhaar", "PAN", "Business proof"],
      ageLimit: "18-65 years",
      incomeLimit: "No limit",
      gender: "All",
      applicationProcess: "At Banks",
      processingTime: "7-15 days",
      validity: "Loan tenure",
      officialWebsite: "mudra.org.in",
      helpline: "1800-180-1111",
    },
  ];

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

  const comparisonFields = [
    { key: "category", label: "Category" },
    { key: "benefit", label: "Financial Benefit" },
    { key: "eligibility", label: "Eligibility" },
    { key: "documents", label: "Required Documents", type: "array" },
    { key: "ageLimit", label: "Age Limit" },
    { key: "incomeLimit", label: "Income Limit" },
    { key: "gender", label: "Gender" },
    { key: "applicationProcess", label: "Application Process" },
    { key: "processingTime", label: "Processing Time" },
    { key: "validity", label: "Validity" },
    { key: "officialWebsite", label: "Official Website" },
    { key: "helpline", label: "Helpline" },
  ];

  return (
    <div className="compare-schemes">
      <div className="compare-header">
        <h2>🔄 Compare Schemes</h2>
        <p className="section-description">
          Select up to 3 schemes to compare features side by side
        </p>
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
              >
                <FaTrash />
              </button>
            </div>
            <div className="selected-scheme-icon">{scheme.icon || "📋"}</div>
            <h4>{scheme.name}</h4>
            <span className="scheme-category-badge">{scheme.category}</span>
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

      {/* Scheme Selection Modal */}
      {showSelector && (
        <div className="modal-overlay" onClick={() => setShowSelector(false)}>
          <div
            className="scheme-selector-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select Scheme to Compare</h3>
            <div className="scheme-list">
              {allSchemes
                .filter(
                  (scheme) => !selectedSchemes.find((s) => s.id === scheme.id),
                )
                .map((scheme) => (
                  <div
                    key={scheme.id}
                    className="scheme-list-item"
                    onClick={() => addToCompare(scheme)}
                  >
                    <div className="scheme-list-icon">📋</div>
                    <div className="scheme-list-info">
                      <h4>{scheme.name}</h4>
                      <span className="scheme-list-category">
                        {scheme.category}
                      </span>
                    </div>
                    <button className="add-btn">Add</button>
                  </div>
                ))}
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
                      <h4>{scheme.name}</h4>
                      <span className="scheme-category-tag">
                        {scheme.category}
                      </span>
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
                  {selectedSchemes.map((scheme) => (
                    <td key={scheme.id} className="feature-value">
                      {field.type === "array" ? (
                        <div className="document-list-compare">
                          {scheme[field.key].map((doc, idx) => (
                            <span key={idx} className="doc-tag-compare">
                              {doc}
                            </span>
                          ))}
                        </div>
                      ) : (
                        scheme[field.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Actions Row */}
              <tr className="actions-row">
                <td className="feature-name">Actions</td>
                {selectedSchemes.map((scheme) => (
                  <td key={scheme.id} className="action-buttons">
                    <button className="apply-btn-compare">Apply Now</button>
                    <button className="details-btn-compare">
                      View Details
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
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
              Based on your profile, <strong>{selectedSchemes[0].name}</strong>{" "}
              might be the best fit for you. It offers{" "}
              {selectedSchemes[0].benefit} with eligibility criteria that match
              your profile. However, consider applying for multiple schemes if
              you qualify.
            </p>
            <button className="apply-recommended-btn">
              Apply for {selectedSchemes[0].name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSchemes;
