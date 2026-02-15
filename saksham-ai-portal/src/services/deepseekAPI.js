import axios from "axios";

// 🔴 TEMPORARILY HARDCODE FOR TESTING
const DEEPSEEK_API_KEY = "sk-0c7ec1bdf59b41739a824af7c6933b4a";
// const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

console.log(
  "🔑 API Key (hardcoded):",
  DEEPSEEK_API_KEY ? "✅ Loaded" : "❌ Missing",
);
const API_URL = "https://api.deepseek.com/v1/chat/completions";

export const deepseekAPI = {
  sendMessage: async (messages, options = {}) => {
    try {
      console.log("Sending request to DeepSeek...");

      const response = await axios.post(
        API_URL,
        {
          model: options.model || "deepseek-chat",
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
        },
      );

      console.log("✅ DeepSeek response received");
      return response.data;
    } catch (error) {
      console.error(
        "❌ DeepSeek API Error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};
