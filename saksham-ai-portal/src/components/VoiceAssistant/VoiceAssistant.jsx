import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaStop,
  FaPlay,
  FaLanguage,
  FaRobot,
  FaVolumeUp,
} from "react-icons/fa";
import "./VoiceAssistant.css";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [assistantText, setAssistantText] = useState(
    "Hello! How can I help you today?",
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceHistory, setVoiceHistory] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Welcome to Saksham AI Assistant!",
      time: "Just now",
    },
    {
      id: 2,
      type: "user",
      text: "Tell me about PM KISAN scheme",
      time: "2 mins ago",
    },
    {
      id: 3,
      type: "assistant",
      text: "PM-KISAN provides ₹6000/year to farmers. Would you like to apply?",
      time: "1 min ago",
    },
  ]);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  ];

  const commonQueries = [
    "How to apply for passport?",
    "PM KISAN eligibility",
    "Aadhaar card update",
    "PAN card application",
    "Government scholarships",
  ];

  const assistantResponses = {
    en: [
      "I can help you apply for government schemas. Which service are you looking for?",
      "For passport application, you need Aadhaar card, address proof, and photographs.",
      "PM-KISAN provides ₹6000 per year to eligible farmers in three installments.",
      "You can update your Aadhaar details online through the UIDAI website.",
      "There are multiple scholarships available for students. Could you specify your education level?",
    ],
    hi: [
      "मैं आपको सरकारी योजनाओं के लिए आवेदन करने में मदद कर सकता हूं। आप किस सेवा की तलाश कर रहे हैं?",
      "पासपोर्ट आवेदन के लिए आपको आधार कार्ड, पते का प्रमाण और तस्वीरों की आवश्यकता होती है।",
      "पीएम-किसान पात्र किसानों को तीन किस्तों में प्रति वर्ष 6000 रुपये प्रदान करता है।",
      "आप यूआईडीएआई वेबसाइट के माध्यम से ऑनलाइन अपने आधार विवरण अपडेट कर सकते हैं।",
      "छात्रों के लिए कई छात्रवृत्तियां उपलब्ध हैं। क्या आप अपनी शिक्षा स्तर निर्दिष्ट कर सकते हैं?",
    ],
  };

  const startListening = () => {
    setIsListening(true);
    setAssistantText("Listening... Please speak now");

    // Simulate listening
    setTimeout(() => {
      if (isListening) {
        const responses =
          assistantResponses[currentLanguage.toLowerCase()] ||
          assistantResponses.en;
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        setAssistantText(randomResponse);
        setIsListening(false);

        // Add to history
        setVoiceHistory((prev) => [
          {
            id: prev.length + 1,
            type: "assistant",
            text: randomResponse,
            time: "Just now",
          },
          ...prev.slice(0, 4),
        ]);
      }
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setAssistantText("Ready to help. Click the microphone to start speaking.");
  };

  const playDemo = () => {
    setIsSpeaking(true);
    const responses = assistantResponses.en;
    const demoText = responses[Math.floor(Math.random() * responses.length)];
    setAssistantText(demoText);

    setTimeout(() => {
      setIsSpeaking(false);
    }, 2000);
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang.name);
    const responses = assistantResponses[lang.code] || assistantResponses.en;
    setAssistantText(`Language changed to ${lang.name}. ${responses[0]}`);
  };

  const handleQueryClick = (query) => {
    const responses = assistantResponses.en;
    const response = `Regarding "${query}" - ${responses[Math.floor(Math.random() * responses.length)]}`;
    setAssistantText(response);

    setVoiceHistory((prev) => [
      { id: prev.length + 1, type: "user", text: query, time: "Now" },
      { id: prev.length + 2, type: "assistant", text: response, time: "Now" },
      ...prev.slice(0, 3),
    ]);
  };

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
    <section className="voice-assistant-section" id="assistant">
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
            AI Assistant
          </div>
          <h2 className="section-title">
            Your Personal <span>Voice Assistant</span>
          </h2>
          <p className="section-description">
            Speak naturally in your preferred language. Our AI understands
            context and provides accurate information about government services.
          </p>
        </motion.div>

        <div className="assistant-container">
          {/* Left Panel - Assistant Visual */}
          <motion.div
            className="assistant-visual"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="visual-container">
              <div
                className={`assistant-circle ${isListening ? "listening" : ""} ${isSpeaking ? "speaking" : ""}`}
              >
                <div className="circle-inner">
                  <FaRobot className="assistant-icon" />
                  <div className="circle-glow"></div>
                </div>

                {/* Language Dots */}
                <div className="language-dots">
                  {languages.slice(0, 4).map((lang, index) => (
                    <div
                      key={lang.code}
                      className="language-dot"
                      style={{
                        transform: `rotate(${index * 90}deg) translateX(120px) rotate(-${index * 90}deg)`,
                      }}
                      onClick={() => changeLanguage(lang)}
                    >
                      <span className="dot-flag">{lang.flag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assistant Status */}
              <div className="assistant-status">
                <div className="status-indicator">
                  <div
                    className={`status-dot ${isListening ? "listening" : isSpeaking ? "speaking" : "idle"}`}
                  ></div>
                  <span className="status-text">
                    {isListening
                      ? "Listening..."
                      : isSpeaking
                        ? "Speaking..."
                        : "Ready"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Controls & Chat */}
          <motion.div
            className="assistant-controls"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Assistant Response */}
            <motion.div className="assistant-response" variants={itemVariants}>
              <div className="response-header">
                <FaRobot className="response-icon" />
                <h3 className="response-title">Saksham Assistant</h3>
              </div>
              <div className="response-bubble">
                <p className="response-text">{assistantText}</p>
              </div>
            </motion.div>

            {/* Voice Controls */}
            <motion.div className="voice-controls" variants={itemVariants}>
              <button
                className={`control-btn mic-btn ${isListening ? "active" : ""}`}
                onClick={startListening}
                disabled={isListening}
              >
                <FaMicrophone className="control-icon" />
                <span className="control-text">
                  {isListening ? "Listening..." : "Start Speaking"}
                </span>
              </button>

              <button
                className="control-btn stop-btn"
                onClick={stopListening}
                disabled={!isListening}
              >
                <FaStop className="control-icon" />
                <span className="control-text">Stop</span>
              </button>

              <button
                className="control-btn demo-btn"
                onClick={playDemo}
                disabled={isSpeaking}
              >
                <FaPlay className="control-icon" />
                <span className="control-text">Demo</span>
              </button>

              <div className="language-control">
                <FaLanguage className="lang-icon" />
                <select
                  className="lang-select"
                  value={currentLanguage}
                  onChange={(e) => {
                    const lang = languages.find(
                      (l) => l.name === e.target.value,
                    );
                    if (lang) changeLanguage(lang);
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Common Queries */}
            <motion.div className="common-queries" variants={itemVariants}>
              <h4 className="queries-title">Common Queries</h4>
              <div className="queries-grid">
                {commonQueries.map((query, index) => (
                  <button
                    key={index}
                    className="query-chip"
                    onClick={() => handleQueryClick(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Chat History */}
            <motion.div className="chat-history" variants={itemVariants}>
              <h4 className="history-title">Recent Conversations</h4>
              <div className="history-list">
                {voiceHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`history-item ${message.type}`}
                  >
                    <div className="message-bubble">
                      <p className="message-text">{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          className="assistant-features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h4 className="feature-title">Context Aware</h4>
            <p className="feature-desc">Understands conversation context</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h4 className="feature-title">Secure</h4>
            <p className="feature-desc">Encrypted voice data processing</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h4 className="feature-title">Fast Response</h4>
            <p className="feature-desc">Average response time: 1.2s</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🌐</div>
            <h4 className="feature-title">Multi-Language</h4>
            <p className="feature-desc">Supports 12+ Indian languages</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceAssistant;
