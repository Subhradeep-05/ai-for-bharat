const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const path = require("path");

console.log("=".repeat(60));
console.log("🔍 EMAIL DEBUG SCRIPT");
console.log("=".repeat(60));

// 1. Check current directory
console.log("\n📁 Current directory:", __dirname);

// 2. Check if .env file exists
const envPath = path.join(__dirname, ".env");
console.log("📁 Looking for .env at:", envPath);

// 3. Try to read .env file directly
const fs = require("fs");
try {
  const envContent = fs.readFileSync(envPath, "utf8");
  console.log("✅ .env file found and readable");

  // Show first few lines (mask sensitive data)
  const lines = envContent.split("\n");
  console.log("\n📄 .env contents:");
  lines.forEach((line) => {
    if (line.startsWith("EMAIL_USER=")) {
      console.log("   EMAIL_USER=✅ Present");
    } else if (line.startsWith("EMAIL_PASSWORD=")) {
      console.log("   EMAIL_PASSWORD=✅ Present (hidden)");
    } else if (line.trim()) {
      console.log(`   ${line.split("=")[0]}=✅ Present`);
    }
  });
} catch (err) {
  console.error("❌ Cannot read .env file:", err.message);
}

// 4. Load environment variables
console.log("\n🔄 Loading .env with dotenv...");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("❌ dotenv.config error:", result.error);
} else {
  console.log("✅ dotenv.config successful");
}

// 5. Check process.env after loading
console.log("\n🔍 Environment variables after loading:");
console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER ? "✅ Found: " + process.env.EMAIL_USER : "❌ Missing",
);
console.log(
  "EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD
    ? "✅ Found (length: " + process.env.EMAIL_PASSWORD.length + ")"
    : "❌ Missing",
);

if (process.env.EMAIL_PASSWORD) {
  console.log(
    "Password first 4 chars:",
    process.env.EMAIL_PASSWORD.substring(0, 4) + "****",
  );
}

// 6. Test email send if credentials exist
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  console.log("\n📧 Testing email send...");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Test" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "Test Email",
    text: "If you get this, email works!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Send failed:", error);
      console.log("\n🔧 Error details:");
      console.log("Code:", error.code);
      console.log("Command:", error.command);
      console.log("Response:", error.response);
      console.log("ResponseCode:", error.responseCode);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
} else {
  console.log("\n❌ Cannot test email - credentials missing");
}
