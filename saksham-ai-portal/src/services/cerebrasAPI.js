import axios from "axios";

// Your Cerebras API key
const CEREBRAS_API_KEY = "csk-xd9pyr8t4d2tn993dxxn2trtffh6rnkfj5k6ppcwyjdfx4r5";
const API_URL = "https://api.cerebras.ai/v1/chat/completions";

console.log(
  "🔑 Cerebras API Key loaded:",
  CEREBRAS_API_KEY ? "✅ Yes" : "❌ No",
);

export const cerebrasAPI = {
  sendMessage: async (messages, options = {}) => {
    try {
      console.log("📤 Sending to Cerebras (20x faster than OpenAI)...");

      const response = await axios.post(
        API_URL,
        {
          model: options.model || "llama3.1-8b", // Free model
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 800,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CEREBRAS_API_KEY}`,
          },
        },
      );

      console.log("✅ Cerebras response received");
      return response.data;
    } catch (error) {
      console.error(
        "❌ Cerebras API Error:",
        error.response?.data || error.message,
      );
      throw error;
    }
  },

  // For streaming responses (optional)
  streamMessage: async (messages, onChunk, options = {}) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CEREBRAS_API_KEY}`,
        },
        body: JSON.stringify({
          model: options.model || "llama3.1-8b",
          messages: messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 800,
          stream: true,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || "";
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              console.error("Error parsing stream:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("❌ Cerebras stream error:", error);
      throw error;
    }
  },
};
