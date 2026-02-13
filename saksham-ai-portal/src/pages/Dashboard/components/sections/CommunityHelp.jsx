import React, { useState } from "react";
import {
  FaUsers,
  FaQuestionCircle,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShare,
  FaThumbsUp,
  FaComment,
  FaEye,
  FaSearch,
  FaFilter,
  FaHandsHelping,
  FaBullhorn,
  FaCalendarAlt,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const CommunityHelp = ({ user }) => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqs = [
    {
      id: 1,
      question: "How do I know if I'm eligible for PM Kisan?",
      answer:
        "PM Kisan is for small and marginal farmers with landholding up to 2 hectares. You need to have cultivable land and should not be an income taxpayer. The scheme provides ₹6000 per year in three installments.",
      category: "PM Kisan",
      helpful: 45,
      views: 230,
    },
    {
      id: 2,
      question: "What documents are needed for Ayushman Bharat?",
      answer:
        "For Ayushman Bharat (PM-JAY), you need: Aadhaar card, Ration card (if available), Income certificate, and Family details. The scheme provides health cover of ₹5 lakh per family per year.",
      category: "Ayushman Bharat",
      helpful: 38,
      views: 195,
    },
    {
      id: 3,
      question: "How to apply for scholarship online?",
      answer:
        "You can apply for scholarships on the National Scholarship Portal (scholarships.gov.in). Register, fill the application, upload documents, and submit before the deadline. Common scholarships include Post Matric, Merit-cum-Means, etc.",
      category: "Scholarship",
      helpful: 52,
      views: 310,
    },
    {
      id: 4,
      question: "My PM Kisan application status shows 'pending'. What to do?",
      answer:
        "If your application is pending, it might be under verification. Contact your local agriculture officer or CSC center. You can also check status on pmkisan.gov.in with your Aadhaar or account number.",
      category: "PM Kisan",
      helpful: 67,
      views: 450,
    },
    {
      id: 5,
      question: "Can I apply for multiple schemes?",
      answer:
        "Yes, you can apply for multiple schemes if you meet the eligibility criteria for each. However, some schemes may have overlapping benefits. Use our Compare Schemes feature to understand the differences.",
      category: "General",
      helpful: 89,
      views: 520,
    },
    {
      id: 6,
      question: "What is the age limit for PM Awas Yojana?",
      answer:
        "There's no specific age limit for PMAY. Any family without a pucca house can apply. Priority is given to SC/ST, minorities, and women applicants. The scheme provides up to ₹2.5 lakh subsidy for housing.",
      category: "Housing",
      helpful: 34,
      views: 180,
    },
  ];

  const successStories = [
    {
      id: 1,
      name: "Ram Singh",
      location: "Village Rampur, UP",
      scheme: "PM Kisan",
      story:
        "I received ₹6000 under PM Kisan. Used it to buy seeds and fertilizers for my farm. The process was simple through the local CSC center.",
      date: "2024-02-15",
      likes: 128,
      comments: 23,
      avatar: "👨‍🌾",
    },
    {
      id: 2,
      name: "Lakshmi Devi",
      location: "Chennai, TN",
      scheme: "Ayushman Bharat",
      story:
        "My mother's heart surgery was covered under Ayushman Bharat. The ₹5 lakh cover saved us from huge debt. Thank you Saarthi for guiding us!",
      date: "2024-02-10",
      likes: 256,
      comments: 45,
      avatar: "👩",
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Delhi",
      scheme: "PM Scholarship",
      story:
        "Got PM Scholarship for my graduation. The ₹12,000 per year helps with books and fees. The application was easy with document upload.",
      date: "2024-02-05",
      likes: 167,
      comments: 31,
      avatar: "👩‍🎓",
    },
    {
      id: 4,
      name: "Mohammed Rafiq",
      location: "Mumbai, MH",
      scheme: "PM Mudra Yojana",
      story:
        "Got ₹1 lakh loan under Mudra for my small grocery shop. Now my business is growing. The interest rate is very reasonable.",
      date: "2024-01-28",
      likes: 94,
      comments: 12,
      avatar: "👨‍💼",
    },
  ];

  const cscCenters = [
    {
      id: 1,
      name: "CSC Rampur",
      address: "Main Market, Near Post Office, Rampur, UP",
      distance: "2.5 km",
      phone: "9876543210",
      services: ["Aadhaar", "Scheme Applications", "Document Upload"],
      hours: "9 AM - 6 PM",
    },
    {
      id: 2,
      name: "CSC Sadar Bazar",
      address: "Sadar Bazar, Delhi-110006",
      distance: "3.8 km",
      phone: "9876543211",
      services: ["All Government Services", "Passport", "PAN Card"],
      hours: "10 AM - 7 PM",
    },
    {
      id: 3,
      name: "CSC Gandhinagar",
      address: "Sector 16, Gandhinagar, Gujarat",
      distance: "5.1 km",
      phone: "9876543212",
      services: ["Digital Seva", "Scheme Applications", "Banking"],
      hours: "9:30 AM - 6:30 PM",
    },
  ];

  const ngoList = [
    {
      name: "Gramin Vikas Sansthan",
      focus: "Rural Development",
      contact: "1800-123-4567",
      email: "help@gvs.org",
      location: "Uttar Pradesh",
    },
    {
      name: "Bharat Education Foundation",
      focus: "Student Scholarships",
      contact: "1800-234-5678",
      email: "info@bef.org",
      location: "Pan India",
    },
    {
      name: "Health for All Foundation",
      focus: "Healthcare Access",
      contact: "1800-345-6789",
      email: "support@haf.org",
      location: "Maharashtra",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (
      searchTerm &&
      !faq.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (selectedCategory !== "all" && faq.category !== selectedCategory)
      return false;
    return true;
  });

  const categories = ["all", ...new Set(faqs.map((f) => f.category))];

  return (
    <div className="community-help">
      <div className="community-header">
        <h2>👥 Community Help & Support</h2>
        <p className="section-description">
          Learn from others, share experiences, and get help from community
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="community-tabs">
        <button
          className={`community-tab ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          <FaQuestionCircle /> FAQ
        </button>
        <button
          className={`community-tab ${activeTab === "stories" ? "active" : ""}`}
          onClick={() => setActiveTab("stories")}
        >
          <FaStar /> Success Stories
        </button>
        <button
          className={`community-tab ${activeTab === "csc" ? "active" : ""}`}
          onClick={() => setActiveTab("csc")}
        >
          <FaMapMarkerAlt /> CSC Centers
        </button>
        <button
          className={`community-tab ${activeTab === "ngo" ? "active" : ""}`}
          onClick={() => setActiveTab("ngo")}
        >
          <FaHandsHelping /> NGO Support
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="faq-section">
            <div className="faq-search-bar">
              <div className="search-box-faq">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="faq-search-input"
                />
              </div>

              <div className="category-filter">
                <FaFilter className="filter-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="faq-list">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question">
                    <h4>{faq.question}</h4>
                    <span className="faq-category">{faq.category}</span>
                  </div>
                  <p className="faq-answer">{faq.answer}</p>
                  <div className="faq-stats">
                    <span className="faq-stat">
                      <FaThumbsUp /> {faq.helpful} found helpful
                    </span>
                    <span className="faq-stat">
                      <FaEye /> {faq.views} views
                    </span>
                    <button className="faq-helpful-btn">
                      Was this helpful?
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ask-question-card">
              <h4>Still have questions?</h4>
              <p>Ask the community or our AI assistant</p>
              <div className="ask-actions">
                <button className="ask-ai-btn">Ask AI Assistant</button>
                <button className="post-question-btn">Post to Community</button>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === "stories" && (
          <div className="stories-section">
            <div className="stories-header">
              <h3>Real Stories from Real People</h3>
              <button className="share-story-btn">
                <FaShare /> Share Your Story
              </button>
            </div>

            <div className="stories-grid">
              {successStories.map((story) => (
                <div key={story.id} className="story-card">
                  <div className="story-header">
                    <div className="story-avatar">{story.avatar}</div>
                    <div className="story-info">
                      <h4>{story.name}</h4>
                      <p className="story-location">
                        <FaMapMarkerAlt /> {story.location}
                      </p>
                    </div>
                    <span className="story-scheme">{story.scheme}</span>
                  </div>

                  <p className="story-text">"{story.story}"</p>

                  <div className="story-footer">
                    <span className="story-date">
                      <FaCalendarAlt /> {story.date}
                    </span>
                    <div className="story-engagement">
                      <span>
                        <FaThumbsUp /> {story.likes}
                      </span>
                      <span>
                        <FaComment /> {story.comments}
                      </span>
                    </div>
                  </div>

                  <div className="story-actions">
                    <button className="like-story-btn">
                      <FaThumbsUp /> Like
                    </button>
                    <button className="comment-story-btn">
                      <FaComment /> Comment
                    </button>
                    <button className="share-story-btn-small">
                      <FaShare /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSC Centers Tab */}
        {activeTab === "csc" && (
          <div className="csc-section">
            <div className="csc-header">
              <h3>Find Nearest Common Service Centre</h3>
              <div className="csc-location-search">
                <input
                  type="text"
                  placeholder="Enter your location..."
                  className="location-input"
                />
                <button className="find-csc-btn">Find Centers</button>
              </div>
            </div>

            <div className="csc-list">
              {cscCenters.map((center) => (
                <div key={center.id} className="csc-card">
                  <div className="csc-card-header">
                    <h4>{center.name}</h4>
                    <span className="csc-distance">{center.distance}</span>
                  </div>

                  <p className="csc-address">
                    <FaMapMarkerAlt /> {center.address}
                  </p>

                  <p className="csc-phone">
                    <FaPhone /> {center.phone}
                  </p>

                  <div className="csc-services">
                    {center.services.map((service, idx) => (
                      <span key={idx} className="service-tag">
                        {service}
                      </span>
                    ))}
                  </div>

                  <p className="csc-hours">
                    <FaClock /> {center.hours}
                  </p>

                  <div className="csc-actions">
                    <button className="get-directions-btn">
                      Get Directions
                    </button>
                    <button className="call-csc-btn">Call</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="csc-info-card">
              <h4>What is CSC?</h4>
              <p>
                Common Service Centres are access points for delivery of various
                government services to citizens. They help with scheme
                applications, document uploads, Aadhaar services, and more.
                Visit your nearest CSC for assistance with scheme applications.
              </p>
            </div>
          </div>
        )}

        {/* NGO Support Tab */}
        {activeTab === "ngo" && (
          <div className="ngo-section">
            <div className="ngo-header">
              <h3>NGOs Providing Scheme Assistance</h3>
              <p>
                These organizations can help you understand and apply for
                schemes
              </p>
            </div>

            <div className="ngo-list">
              {ngoList.map((ngo, index) => (
                <div key={index} className="ngo-card">
                  <div className="ngo-icon">
                    <FaHandsHelping />
                  </div>
                  <div className="ngo-content">
                    <h4>{ngo.name}</h4>
                    <p className="ngo-focus">Focus: {ngo.focus}</p>
                    <p className="ngo-contact">
                      <FaPhone /> {ngo.contact}
                    </p>
                    <p className="ngo-email">
                      <FaEnvelope /> {ngo.email}
                    </p>
                    <p className="ngo-location">
                      <FaMapMarkerAlt /> {ngo.location}
                    </p>
                  </div>
                  <button className="contact-ngo-btn">Contact NGO</button>
                </div>
              ))}
            </div>

            <div className="volunteer-card">
              <FaBullhorn className="volunteer-icon" />
              <div className="volunteer-content">
                <h4>Want to help others?</h4>
                <p>
                  Join as a community volunteer to help people understand and
                  apply for government schemes
                </p>
              </div>
              <button className="volunteer-btn">Become a Volunteer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHelp;
