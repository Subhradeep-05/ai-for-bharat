import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Government Schemas", href: "#schemas" },
    { label: "AI Assistant", href: "#assistant" },
    { label: "Statistics", href: "#statistics" },
    { label: "Analytics", href: "#graphs" },
  ];

  const governmentLinks = [
    { label: "MyGov.in", href: "https://www.mygov.in/" },
    { label: "Digital India", href: "https://www.digitalindia.gov.in/" },
    { label: "Aadhaar Services", href: "https://uidai.gov.in/" },
    { label: "Income Tax Portal", href: "https://www.incometax.gov.in/" },
    { label: "Passport Seva", href: "https://www.passportindia.gov.in/" },
    { label: "UMANG App", href: "https://web.umang.gov.in/" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      text: "Ministry of Electronics & IT, New Delhi, India - 110003",
    },
    { icon: <FaPhone />, text: "1800-XXX-XXXX (Toll Free)" },
    { icon: <FaEnvelope />, text: "support@sakshamai.gov.in" },
    { icon: <FaClock />, text: "24/7 AI Assistant Available" },
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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <footer className="footer" id="about">
      {/* Top Gradient Border */}
      <div className="footer-border"></div>

      <div className="container">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div
            className="footer-column brand-column"
            variants={itemVariants}
          >
            <div className="footer-logo">
              <div className="logo-icon">
                <div className="logo-glow"></div>
                <span className="logo-text">SA</span>
              </div>
              <div className="logo-info">
                <h3 className="brand-name">Saksham AI</h3>
                <p className="brand-tagline">AI Solutions for Bharat</p>
              </div>
            </div>

            <p className="brand-description">
              An initiative by the Government of India to leverage artificial
              intelligence for transforming public service delivery and making
              governance more accessible, efficient, and citizen-centric.
            </p>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div className="footer-column" variants={itemVariants}>
            <h4 className="column-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    <span className="link-icon">→</span>
                    <span className="link-text">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Government Links Column */}
          <motion.div className="footer-column" variants={itemVariants}>
            <h4 className="column-title">Government Portals</h4>
            <ul className="footer-links">
              {governmentLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="link-icon">🔗</span>
                    <span className="link-text">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div className="footer-column" variants={itemVariants}>
            <h4 className="column-title">Contact Info</h4>
            <ul className="contact-info">
              {contactInfo.map((info, index) => (
                <li key={index} className="contact-item">
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-text">{info.text}</div>
                </li>
              ))}
            </ul>

            <div className="newsletter">
              <h5 className="newsletter-title">Stay Updated</h5>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bottom-content">
            <div className="copyright">
              <p>
                &copy; {currentYear} Saksham AI - AI Solutions for Bharat. All
                rights reserved.
              </p>
              <p className="copyright-note">
                An initiative for AI for Bharat Hackathon | Designed with ❤️ for
                India
              </p>
            </div>

            <div className="legal-links">
              <a href="#" className="legal-link">
                Privacy Policy
              </a>
              <span className="link-separator">•</span>
              <a href="#" className="legal-link">
                Terms of Service
              </a>
              <span className="link-separator">•</span>
              <a href="#" className="legal-link">
                Accessibility
              </a>
            </div>
          </div>

          <div className="footer-flag">
            <div className="flag-strip saffron"></div>
            <div className="flag-strip white">
              <div className="chakra-small"></div>
            </div>
            <div className="flag-strip green"></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
