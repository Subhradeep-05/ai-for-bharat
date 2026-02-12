import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaFileContract,
  FaLanguage,
  FaChartLine,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import "./Statistics.css";

const Statistics = () => {
  const [stats, setStats] = useState([
    {
      id: 1,
      value: 0,
      target: 2500000,
      icon: <FaUsers />,
      label: "Citizens Served",
      suffix: "+",
    },
    {
      id: 2,
      value: 0,
      target: 500,
      icon: <FaFileContract />,
      label: "Government Schemas",
      suffix: "+",
    },
    {
      id: 3,
      value: 0,
      target: 12,
      icon: <FaLanguage />,
      label: "Indian Languages",
      suffix: "+",
    },
    {
      id: 4,
      value: 0,
      target: 98,
      icon: <FaChartLine />,
      label: "Satisfaction Rate",
      suffix: "%",
    },
    {
      id: 5,
      value: 0,
      target: 45,
      icon: <FaClock />,
      label: "Avg Response Time",
      suffix: "s",
    },
    {
      id: 6,
      value: 0,
      target: 99,
      icon: <FaShieldAlt />,
      label: "Security Score",
      suffix: "%",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => ({
          ...stat,
          value:
            stat.value < stat.target
              ? Math.min(stat.value + Math.ceil(stat.target / 50), stat.target)
              : stat.target,
        })),
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="statistics-section" id="statistics">
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
            Impact & Reach
          </div>
          <h2 className="section-title">
            Transforming Governance with <span>Real Impact</span>
          </h2>
          <p className="section-description">
            Our numbers tell the story of how AI is revolutionizing
            citizen-government interaction across India.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          className="statistics-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="stat-card"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <div className="stat-card-inner">
                {/* Icon */}
                <div className="stat-icon">{stat.icon}</div>

                {/* Animated Number */}
                <div className="stat-number">
                  <span className="number-value">
                    {stat.value >= 1000
                      ? (stat.value / 1000).toFixed(1)
                      : stat.value}
                  </span>
                  <span className="number-suffix">{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="stat-label">{stat.label}</div>

                {/* Progress Bar */}
                <div className="stat-progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(stat.value / stat.target) * 100}%`,
                      background: `linear-gradient(to right, #FF9933, #138808)`,
                    }}
                  ></div>
                </div>

                {/* Background Pattern */}
                <div className="stat-pattern">
                  <div className="pattern-ring ring-1"></div>
                  <div className="pattern-ring ring-2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="stats-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="info-card">
            <div className="info-icon">🚀</div>
            <h3 className="info-title">Fastest Growing</h3>
            <p className="info-text">
              300% growth in user adoption in the last 6 months
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🏆</div>
            <h3 className="info-title">Award Winning</h3>
            <p className="info-text">
              Recognized as the best digital governance platform 2023
            </p>
          </div>
          <div className="info-card">
            <div className="info-icon">🤝</div>
            <h3 className="info-title">Partnerships</h3>
            <p className="info-text">
              Collaborating with 25+ government departments
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
