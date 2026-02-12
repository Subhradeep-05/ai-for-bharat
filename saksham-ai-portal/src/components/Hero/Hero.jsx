import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaShieldAlt,
  FaLanguage,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [aiTextIndex, setAiTextIndex] = useState(0);

  const aiTexts = [
    "AI Solutions for Citizens of India",
    "Transforming Government Services",
    "Making India Digital & Accessible",
    "Your Intelligent Partner in Governance",
    "Empowering Citizens with Technology",
  ];

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered",
      description: "Intelligent assistance 24/7",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure",
      description: "Military-grade security",
    },
    {
      icon: <FaLanguage />,
      title: "Multilingual",
      description: "12+ Indian languages",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics",
      description: "Real-time insights",
    },
    {
      icon: <FaUsers />,
      title: "Citizen-Centric",
      description: "Designed for you",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAiTextIndex((prev) => (prev + 1) % aiTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="hero" id="home">
      {/* Background Elements */}
      <div className="hero-bg">
        <div className="flag-pattern"></div>
        <div className="floating-chakra chakra-1"></div>
        <div className="floating-chakra chakra-2"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="hero-left" variants={itemVariants}>
            <div className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">AI-Powered Government Portal</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line">Transforming</span>
              <span className="title-gradient">Public Services</span>
              <span className="title-line">with Artificial Intelligence</span>
            </h1>

            <p className="hero-description">
              Saksham AI - An intelligent platform connecting citizens of India
              with government services through cutting-edge AI technology.
              Making governance more accessible, efficient, and citizen-centric.
            </p>

            <div className="hero-cta">
              <button className="cta-primary">
                Explore Services
                <FaArrowRight className="cta-icon" />
              </button>
              <button className="cta-secondary">
                <FaBrain className="cta-icon" />
                Try AI Assistant
              </button>
            </div>

            {/* Features Grid */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - AI Visual */}
          <motion.div className="hero-right" variants={itemVariants}>
            <div className="ai-visual-container">
              <div className="ai-visual">
                <div className="ai-core">
                  <FaBrain className="ai-brain" />
                  <div className="ai-glow"></div>
                </div>

                <div className="ai-text-display">
                  <motion.div
                    key={aiTextIndex}
                    className="ai-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {aiTexts[aiTextIndex]}
                  </motion.div>
                </div>

                <div className="ai-orbits">
                  <div className="orbit orbit-1">
                    <div className="orbit-icon">🇮🇳</div>
                  </div>
                  <div className="orbit orbit-2">
                    <div className="orbit-icon">🤖</div>
                  </div>
                  <div className="orbit orbit-3">
                    <div className="orbit-icon">💡</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              <div className="stat-item">
                <div className="stat-number">2.5M+</div>
                <div className="stat-label">Users</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
