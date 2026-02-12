import React from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaFileAlt,
  FaChartPie,
  FaLanguage,
  FaShieldAlt,
  FaMobileAlt,
  FaHandshake,
  FaGraduationCap,
} from "react-icons/fa";
import "./Services.css";

const Services = () => {
  const services = [
    {
      icon: <FaRobot />,
      title: "AI Citizen Assistant",
      description:
        "24/7 multilingual virtual assistant for government queries and guidance.",
      features: [
        "Natural Language Processing",
        "12+ Indian Languages",
        "Context-Aware Responses",
      ],
      gradient: "gradient-1",
    },
    {
      icon: <FaFileAlt />,
      title: "Smart Document Processing",
      description:
        "AI-powered document verification, processing, and management system.",
      features: ["OCR Technology", "Auto-Verification", "Digital Signatures"],
      gradient: "gradient-2",
    },
    {
      icon: <FaChartPie />,
      title: "Predictive Analytics",
      description:
        "Advanced analytics dashboard for service optimization and insights.",
      features: [
        "Real-time Analytics",
        "Trend Prediction",
        "Performance Metrics",
      ],
      gradient: "gradient-3",
    },
    {
      icon: <FaLanguage />,
      title: "Multi-Language Portal",
      description:
        "Access services in your preferred Indian language with real-time translation.",
      features: ["12+ Languages", "Voice Input", "Cultural Context"],
      gradient: "gradient-4",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Authentication",
      description:
        "Biometric and AI-based secure authentication for all government services.",
      features: [
        "Aadhaar Integration",
        "Face Recognition",
        "Blockchain Security",
      ],
      gradient: "gradient-1",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Accessibility",
      description:
        "Complete mobile experience with offline capabilities and push notifications.",
      features: ["Progressive Web App", "Offline Mode", "Push Alerts"],
      gradient: "gradient-2",
    },
    {
      icon: <FaHandshake />,
      title: "Grievance Redressal",
      description:
        "AI-powered complaint management system with automated resolution.",
      features: ["Smart Ticketing", "Priority Routing", "Resolution Tracking"],
      gradient: "gradient-3",
    },
    {
      icon: <FaGraduationCap />,
      title: "Digital Literacy",
      description:
        "Interactive tutorials and guidance for digital government services.",
      features: ["Step-by-step Guides", "Video Tutorials", "Interactive Demos"],
      gradient: "gradient-4",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span className="badge-dot"></span>
            Our Services
          </div>
          <h2 className="section-title">
            AI-Powered Solutions for <span>Every Citizen</span>
          </h2>
          <p className="section-description">
            Comprehensive AI services designed to transform your interaction
            with government, making it simpler, faster, and more efficient.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-card ${service.gradient}`}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-inner">
                {/* Card Header */}
                <div className="card-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <p className="service-description">{service.description}</p>

                  <div className="service-features">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span className="feature-dot"></span>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <button className="service-btn">
                    Explore Now
                    <div className="btn-arrow">→</div>
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="card-hover-effect"></div>
              </div>

              {/* Background Pattern */}
              <div className="card-pattern">
                <div className="pattern-dot pattern-dot-1"></div>
                <div className="pattern-dot pattern-dot-2"></div>
                <div className="pattern-dot pattern-dot-3"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="services-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Services Integrated</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99.5%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">45s</div>
            <div className="stat-label">Avg. Response Time</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">10M+</div>
            <div className="stat-label">Transactions</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
