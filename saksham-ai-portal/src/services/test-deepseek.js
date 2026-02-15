// Simple test to check if API works
const testDeepSeek = async () => {
  const API_KEY = "sk-0c7ec1bdf59b41739a824af7c6933b4a";
  const API_URL = "https://api.deepseek.com/v1/chat/completions";

  try {
    console.log("1️⃣ Testing DeepSeek API...");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Say hello in Hindi" }],
        temperature: 0.7,
        max_tokens: 100,
      }),
    });

    console.log("2️⃣ Response status:", response.status);

    const data = await response.json();
    console.log("3️⃣ Response data:", data);

    if (response.ok) {
      console.log("✅ SUCCESS! API is working");
      console.log("🤖 AI says:", data.choices[0].message.content);
    } else {
      console.error("❌ API Error:", data);
    }
  } catch (error) {
    console.error("❌ Network Error:", error);
  }
};

// Run the test
testDeepSeek();
