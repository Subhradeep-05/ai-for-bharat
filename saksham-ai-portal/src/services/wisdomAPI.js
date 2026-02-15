import axios from "axios";

// Free API service that works without payment
const API_URL = "https://wisdom-gate.juheapi.com/v1/chat/completions";
// This is a public demo key - works for testing
const API_KEY =
  "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";

console.log("🔑 Using Wisdom Gate API (free alternative)");

export const wisdomAPI = {
  sendMessage: async (messages, options = {}) => {
    try {
      console.log("📤 Sending to Wisdom Gate...");

      const response = await axios.post(
        API_URL,
        {
          model: options.model || "deepseek-chat", // or "gpt-3.5-turbo", etc.
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 800,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      console.log("✅ Wisdom Gate response received");
      return response.data;
    } catch (error) {
      console.error(
        "❌ Wisdom Gate API Error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },
};
