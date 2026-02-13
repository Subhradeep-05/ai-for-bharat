import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaMicrophone,
  FaPaperPlane,
  FaVolumeUp,
  FaStop,
  FaCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaHistory,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";

const AIAssistant = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Namaste! I'm Saarthi AI, your personal guide for government schemes. How can I help you today? You can ask me in Hindi, English, or any other Indian language.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "PM Kisan eligibility",
    "Ayushman Bharat documents",
    "Scholarship deadline",
    "Apply for PM Awas Yojana",
    "Check application status",
    "Documents required for pension",
  ];

  const suggestedQuestions = [
    {
      id: 1,
      question: "What is PM Kisan Samman Nidhi?",
      answer:
        "PM Kisan Samman Nidhi is a Central Sector scheme that provides income support of ₹6,000 per year to small and marginal farmer families. The amount is transferred in three equal installments of ₹2,000 every four months directly to the bank accounts of beneficiaries.",
    },
    {
      id: 2,
      question: "How to apply for Ayushman Bharat?",
      answer:
        "To apply for Ayushman Bharat (PM-JAY), you can visit the nearest Common Service Centre (CSC) or empaneled hospital. You'll need your Aadhaar card, ration card, and income certificate. The scheme provides health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("pm kisan") || q.includes("kisan")) {
      return "PM Kisan Samman Nidhi provides ₹6,000 per year to farmers. You can apply online at pmkisan.gov.in. Required documents: Aadhaar, land records, bank account. Are you a farmer? I can check your eligibility if you share your details.";
    } else if (q.includes("ayushman") || q.includes("bharat")) {
      return "Ayushman Bharat (PM-JAY) provides health cover of ₹5 lakh per family. You can check eligibility at the nearest CSC center. Documents needed: Aadhaar, ration card, income certificate. Would you like to find a nearby CSC?";
    } else if (q.includes("scholarship")) {
      return "PM Scholarship Scheme offers ₹12,000 per year for meritorious students. Deadline is usually October. You need 50% marks and family income below ₹2.5L. Apply at scholarships.gov.in";
    } else if (q.includes("document") || q.includes("documents")) {
      return "Common documents needed for most schemes: Aadhaar Card, PAN Card, Bank Passbook, Passport size photos, Income Certificate, Caste Certificate (if applicable), and Residence Proof. You can upload them in your Document Vault.";
    } else {
      return (
        "I understand you're asking about " +
        query +
        ". Could you please provide more details? You can ask about specific schemes like PM Kisan, Ayushman Bharat, scholarships, pensions, or document requirements."
      );
    }
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: reply,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
    setShowQuickReplies(false);

    setTimeout(() => {
      const botResponse = generateBotResponse(reply);
      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputText("PM Kisan scheme eligibility");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleTextToSpeech = (text) => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis?.speak(utterance);
      setIsPlaying(true);
    }
  };

  const chatHistory = [
    { date: "Today", count: 3 },
    { date: "Yesterday", count: 2 },
    { date: "This Week", count: 8 },
  ];

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <div className="ai-title">
          <FaRobot className="ai-main-icon" />
          <h2>🤖 Saarthi AI Assistant</h2>
        </div>
        <p className="section-description">
          Ask me anything about government schemes in your language
        </p>
      </div>

      <div className="ai-container">
        {/* Chat Area */}
        <div className="chat-area">
          <div className="chat-messages" id="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.type === "user" ? "user-message" : "bot-message"}`}
              >
                <div className="message-avatar">
                  {message.type === "user" ? <FaUser /> : <FaRobot />}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-footer">
                    <span className="message-time">{message.timestamp}</span>
                    {message.type === "bot" && (
                      <div className="message-actions">
                        <button
                          className="message-action"
                          onClick={() => handleTextToSpeech(message.text)}
                        >
                          {isPlaying ? <FaStop /> : <FaVolumeUp />}
                        </button>
                        <button className="message-action">
                          <FaCopy />
                        </button>
                        <button className="message-action">
                          <FaThumbsUp />
                        </button>
                        <button className="message-action">
                          <FaThumbsDown />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="quick-replies">
              <p className="quick-replies-title">Suggested questions:</p>
              <div className="quick-reply-buttons">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Type your question here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-text-input"
              />
              <button
                className={`voice-btn ${isRecording ? "recording" : ""}`}
                onClick={handleVoiceInput}
              >
                <FaMicrophone />
              </button>
              <button className="send-btn" onClick={handleSendMessage}>
                <FaPaperPlane />
              </button>
            </div>
            <p className="input-hint">
              Speak or type in Hindi, English, or your preferred language
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="ai-side-panel">
          {/* Suggested Questions */}
          <div className="suggested-questions-panel">
            <h4>📝 Suggested Questions</h4>
            <div className="suggested-list">
              {suggestedQuestions.map((sq) => (
                <div
                  key={sq.id}
                  className="suggested-item"
                  onClick={() => handleQuickReply(sq.question)}
                >
                  <p className="suggested-question">{sq.question}</p>
                  <p className="suggested-answer-preview">
                    {sq.answer.substring(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="chat-history-panel">
            <div className="history-header">
              <h4>🕒 Chat History</h4>
              <button
                className="view-all-history"
                onClick={() => setShowHistory(!showHistory)}
              >
                {showHistory ? "Hide" : "View All"}
              </button>
            </div>
            {showHistory ? (
              <div className="history-list">
                {chatHistory.map((item, index) => (
                  <div key={index} className="history-item">
                    <span className="history-date">{item.date}</span>
                    <span className="history-count">{item.count} chats</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="recent-chats">
                <div className="recent-chat-item">
                  <FaHistory />
                  <span>PM Kisan eligibility</span>
                </div>
                <div className="recent-chat-item">
                  <FaHistory />
                  <span>Ayushman Bharat documents</span>
                </div>
              </div>
            )}
          </div>

          {/* Language Info */}
          <div className="language-info-panel">
            <h4>🌐 Supported Languages</h4>
            <div className="language-tags">
              <span className="lang-tag">हिंदी</span>
              <span className="lang-tag">English</span>
              <span className="lang-tag">தமிழ்</span>
              <span className="lang-tag">తెలుగు</span>
              <span className="lang-tag">বাংলা</span>
              <span className="lang-tag">मराठी</span>
              <span className="lang-tag">ગુજરાતી</span>
              <span className="lang-tag">ਪੰਜਾਬੀ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
