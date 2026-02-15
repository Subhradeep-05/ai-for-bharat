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
  FaSpinner,
  FaGlobe,
} from "react-icons/fa";
import "/src/pages/Dashboard/dashboard-sections.css";
import { cerebrasAPI } from "@/services/cerebrasAPI";

const AIAssistant = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Namaste! I'm Saarthi AI, your personal guide for government schemes. How can I help you today? You can ask me in Hindi, English, Tamil, Telugu, Bengali, or any other Indian language.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("auto");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // ✅ Quick Replies Array
  const quickReplies = [
    "PM Kisan eligibility",
    "Ayushman Bharat documents",
    "Scholarship deadline",
    "Apply for PM Awas Yojana",
    "Check application status",
    "Documents required for pension",
  ];

  // ✅ Suggested Questions Array
  const suggestedQuestions = [
    {
      id: 1,
      question: "What is PM Kisan Samman Nidhi?",
      answer:
        "PM Kisan provides ₹6,000/year to farmers. Apply at pmkisan.gov.in with Aadhaar and land records.",
    },
    {
      id: 2,
      question: "How to apply for Ayushman Bharat?",
      answer:
        "Visit nearest CSC with Aadhaar, ration card, and income certificate for ₹5 lakh health cover.",
    },
    {
      id: 3,
      question: "Documents needed for pension?",
      answer:
        "Age proof, BPL certificate, bank passbook, and Aadhaar card required for pension schemes.",
    },
    {
      id: 4,
      question: "PM Kisan ki yogyata kya hai?",
      answer:
        "PM Kisan ke liye aapke paas kheti ki zameen honi chahiye. Har saal ₹6,000 milta hai.",
    },
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Save messages to history whenever they change
  useEffect(() => {
    if (messages.length > 1) {
      saveToHistory();
    }
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = () => {
    try {
      const saved = localStorage.getItem(
        `saarthi_chat_history_${user?.id || "guest"}`,
      );
      if (saved) {
        const history = JSON.parse(saved);
        setChatHistory(history);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const saveToHistory = () => {
    try {
      const recentMessages = messages.slice(-50);
      const historyData = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        messages: recentMessages,
        preview:
          recentMessages[recentMessages.length - 1]?.text.substring(0, 50) +
          "...",
        count: recentMessages.length,
      };

      const updatedHistory = [historyData, ...chatHistory.slice(0, 9)];
      setChatHistory(updatedHistory);
      localStorage.setItem(
        `saarthi_chat_history_${user?.id || "guest"}`,
        JSON.stringify(updatedHistory),
      );
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(`saarthi_chat_history_${user?.id || "guest"}`);
  };

  const loadHistorySession = (session) => {
    setMessages(session.messages);
    setShowHistory(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLanguagePrompt = (query) => {
    let langInstruction = "";

    if (selectedLanguage !== "auto") {
      const langMap = {
        hi: "Respond in Hindi language only. Use Devanagari script.",
        en: "Respond in English language only.",
        ta: "Respond in Tamil language only. Use Tamil script.",
        te: "Respond in Telugu language only. Use Telugu script.",
        bn: "Respond in Bengali language only. Use Bengali script.",
        mr: "Respond in Marathi language only. Use Devanagari script.",
        gu: "Respond in Gujarati language only. Use Gujarati script.",
        pa: "Respond in Punjabi language only. Use Gurmukhi script.",
      };
      langInstruction = langMap[selectedLanguage] || "";
    } else {
      const devanagariRegex = /[\u0900-\u097F]/;
      const tamilRegex = /[\u0B80-\u0BFF]/;
      const teluguRegex = /[\u0C00-\u0C7F]/;
      const bengaliRegex = /[\u0980-\u09FF]/;

      if (devanagariRegex.test(query)) {
        langInstruction =
          "The user is writing in Hindi. Respond in Hindi using Devanagari script.";
      } else if (tamilRegex.test(query)) {
        langInstruction =
          "The user is writing in Tamil. Respond in Tamil using Tamil script.";
      } else if (teluguRegex.test(query)) {
        langInstruction =
          "The user is writing in Telugu. Respond in Telugu using Telugu script.";
      } else if (bengaliRegex.test(query)) {
        langInstruction =
          "The user is writing in Bengali. Respond in Bengali using Bengali script.";
      } else {
        langInstruction =
          "Respond in the same language the user used. If they used English, respond in English.";
      }
    }

    return langInstruction;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const langInstruction = getLanguagePrompt(inputText);
      const recentMessages = messages.slice(-10);
      const conversationHistory = recentMessages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const systemPrompt = {
        role: "system",
        content: `You are Saarthi AI, a helpful assistant for Indian government schemes. 
                ${langInstruction}
                
                Provide accurate, concise information about:
                - PM Kisan, Ayushman Bharat, Scholarships, Pensions
                - Eligibility criteria, documents required
                - Application process, deadlines
                - Answer in simple language, be friendly and helpful.
                
                Current user: ${user?.name || "Guest"}
                IMPORTANT: Always respond in the SAME LANGUAGE that the user wrote in.
                If they write in Hindi, respond in Hindi.
                If they write in English, respond in English.
                If they write in Tamil, respond in Tamil.`,
      };

      const apiMessages = [
        systemPrompt,
        ...conversationHistory,
        { role: "user", content: inputText },
      ];

      console.log("📤 Sending to Cerebras with language:", selectedLanguage);

      const response = await cerebrasAPI.sendMessage(apiMessages, {
        model: "llama3.1-8b",
        temperature: 0.7,
        max_tokens: 800,
      });

      console.log("✅ Cerebras response:", response);

      const botResponse =
        response.choices[0]?.message?.content ||
        "I'm sorry, I couldn't process that. Please try again.";

      const botMessage = {
        id: messages.length + 2,
        type: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ API Error:", error);

      const errorMessage = {
        id: messages.length + 2,
        type: "bot",
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Voice recognition not supported. Please use Chrome.");
      return;
    }

    setIsRecording(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const langMap = {
      hi: "hi-IN",
      en: "en-IN",
      ta: "ta-IN",
      te: "te-IN",
      bn: "bn-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      pa: "pa-IN",
      auto: "hi-IN",
    };

    recognition.lang = langMap[selectedLanguage] || "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleTextToSpeech = (text) => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);

      const langMap = {
        hi: "hi-IN",
        ta: "ta-IN",
        te: "te-IN",
        bn: "bn-IN",
        mr: "mr-IN",
        gu: "gu-IN",
        pa: "pa-IN",
      };

      utterance.lang = langMap[selectedLanguage] || "hi-IN";
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis?.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const languages = [
    { code: "auto", name: "🌐 Auto Detect", flag: "🤖" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
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

        {/* Language Selector */}
        <div className="language-selector">
          <FaGlobe className="language-icon" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
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
                          title="Listen"
                        >
                          {isPlaying ? <FaStop /> : <FaVolumeUp />}
                        </button>
                        <button
                          className="message-action"
                          onClick={() => handleCopyText(message.text)}
                          title="Copy"
                        >
                          <FaCopy />
                        </button>
                        <button className="message-action" title="Helpful">
                          <FaThumbsUp />
                        </button>
                        <button className="message-action" title="Not helpful">
                          <FaThumbsDown />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="message-text">
                    <FaSpinner className="spinning" /> Thinking...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && messages.length < 3 && (
            <div className="quick-replies">
              <p className="quick-replies-title">Suggested questions:</p>
              <div className="quick-reply-buttons">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                    disabled={isLoading}
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
                placeholder={`Type in ${languages.find((l) => l.code === selectedLanguage)?.name || "your language"}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="chat-text-input"
                disabled={isLoading}
              />
              <button
                className={`voice-btn ${isRecording ? "recording" : ""}`}
                onClick={handleVoiceInput}
                disabled={isLoading}
                title="Voice input"
              >
                <FaMicrophone />
              </button>
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="input-hint">
              Speak or type in any language - I'll respond in the same language
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="ai-side-panel">
          {/* Language Info */}
          <div className="language-info-panel">
            <h4>🌐 Selected Language</h4>
            <div className="current-language">
              <span className="selected-lang-badge">
                {languages.find((l) => l.code === selectedLanguage)?.flag}{" "}
                {languages.find((l) => l.code === selectedLanguage)?.name}
              </span>
            </div>
            <div className="language-tags">
              {languages.slice(1).map((lang) => (
                <span
                  key={lang.code}
                  className={`lang-tag ${selectedLanguage === lang.code ? "active" : ""}`}
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  {lang.flag} {lang.name}
                </span>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="chat-history-panel">
            <div className="history-header">
              <h4>🕒 Chat History</h4>
              <div className="history-actions">
                {chatHistory.length > 0 && (
                  <button
                    className="clear-history"
                    onClick={clearHistory}
                    title="Clear history"
                  >
                    <FaTimes />
                  </button>
                )}
                <button
                  className="view-all-history"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? "Hide" : "View All"}
                </button>
              </div>
            </div>

            {showHistory ? (
              <div className="history-list">
                {chatHistory.length > 0 ? (
                  chatHistory.map((session) => (
                    <div
                      key={session.id}
                      className="history-item"
                      onClick={() => loadHistorySession(session)}
                    >
                      <span className="history-date">{session.date}</span>
                      <span className="history-preview">{session.preview}</span>
                      <span className="history-count">
                        {session.count} msgs
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="no-history">No chat history yet</div>
                )}
              </div>
            ) : (
              <div className="recent-chats">
                {chatHistory.slice(0, 3).map((session, index) => (
                  <div
                    key={index}
                    className="recent-chat-item"
                    onClick={() => loadHistorySession(session)}
                  >
                    <FaHistory />
                    <span>{session.preview || "Previous conversation"}</span>
                  </div>
                ))}
                {chatHistory.length === 0 && (
                  <div className="recent-chat-item">
                    <FaHistory />
                    <span>No recent chats</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="suggested-questions-panel">
            <h4>📝 Try Asking</h4>
            <div className="suggested-list">
              {suggestedQuestions.map((sq) => (
                <div
                  key={sq.id}
                  className="suggested-item"
                  onClick={() => handleQuickReply(sq.question)}
                >
                  <p className="suggested-question">{sq.question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
