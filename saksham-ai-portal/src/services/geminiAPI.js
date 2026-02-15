import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// ✅ Use a model that's currently available for new users
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

console.log("🔑 Gemini API Key loaded:", GEMINI_API_KEY ? "✅ Yes" : "❌ No");

export const geminiAPI = {
  sendMessage: async (messages, options = {}) => {
    try {
      console.log("📤 Sending to Gemini 2.0 Flash Exp...");

      // Get the last user message (simpler approach works better)
      const userMessage =
        messages.filter((m) => m.role === "user").pop()?.content || "";

      const response = await axios.post(
        `${API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.max_tokens || 800,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("✅ Gemini response received");

      const geminiText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't generate a response. Please try again.";

      return {
        choices: [
          {
            message: {
              content: geminiText,
            },
          },
        ],
      };
    } catch (error) {
      console.error(
        "❌ Gemini API Error:",
        error.response?.data || error.message,
      );

      // Helpful error message
      if (error.response?.status === 404) {
        console.error("🔍 Model may not be available. Try one of these:");
        console.error("   - gemini-2.0-flash-exp");
        console.error("   - gemini-2.0-flash-lite-preview-02-05");
        console.error("   - gemini-2.5-pro-preview-03-25");
      }

      throw error;
    }
  },
};
