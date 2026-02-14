const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const auth = require("../middleware/auth");

// Submit new application
router.post("/", auth, async (req, res) => {
  try {
    console.log("=== APPLICATION SUBMISSION ===");
    console.log("Headers:", {
      "content-type": req.headers["content-type"],
      "x-auth-token": req.headers["x-auth-token"] ? "Present" : "Missing",
      authorization: req.headers.authorization ? "Present" : "Missing",
    });
    console.log("Body:", req.body);
    console.log("User from token:", req.user);

    const { schemeId, schemeName, userEmail } = req.body;
    const userId = req.user?.id || req.user?._id || req.user?.userId; // Handle different token structures

    // Validate required fields
    const missingFields = [];
    if (!schemeId) missingFields.push("schemeId");
    if (!schemeName) missingFields.push("schemeName");
    if (!userEmail) missingFields.push("userEmail");

    if (missingFields.length > 0) {
      console.log("❌ Missing fields:", missingFields);
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missing: missingFields,
      });
    }

    if (!userId) {
      console.log("❌ No user ID from token. Token user object:", req.user);
      return res.status(400).json({
        success: false,
        message: "User ID not found in token. Please log in again.",
      });
    }

    console.log("✅ All fields present, proceeding with userId:", userId);

    // Check if already applied
    const existingApplication = await Application.findOne({
      schemeId,
      userId,
      status: { $in: ["pending", "processing"] },
    });

    if (existingApplication) {
      console.log("❌ Already applied:", existingApplication.applicationId);
      return res.status(400).json({
        success: false,
        message: "You have already applied for this scheme",
        applicationId: existingApplication.applicationId,
      });
    }

    // Generate unique application ID
    const applicationId = `APP${Date.now()}${Math.floor(Math.random() * 1000)}`;
    console.log("📝 Generated Application ID:", applicationId);

    // Create new application
    const application = new Application({
      schemeId,
      schemeName,
      userId,
      userEmail,
      applicationId,
      status: "pending",
      appliedDate: new Date(),
    });

    await application.save();
    console.log("✅ Application saved successfully");

    // Get user details for potential future use
    const user = await User.findById(userId).select("-password");
    console.log("👤 User found:", user ? user.email : "Not found");

    res.json({
      success: true,
      applicationId,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Application submission error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this scheme",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit application. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Send confirmation email
router.post("/send-email", auth, async (req, res) => {
  try {
    console.log("=== SEND EMAIL ===");
    console.log("Request body:", req.body);

    const { to, template, data } = req.body;
    const userId = req.user?.id || req.user?._id;

    // Validate required fields
    if (!to || !template || !data) {
      console.log("❌ Missing email fields:", { to, template, data });
      return res.status(400).json({
        success: false,
        message: "Missing required fields for email",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("⚠️ Email credentials not configured in .env file");
      console.log(
        "EMAIL_USER:",
        process.env.EMAIL_USER ? "✅ Present" : "❌ Missing",
      );
      console.log(
        "EMAIL_PASSWORD:",
        process.env.EMAIL_PASSWORD ? "✅ Present" : "❌ Missing",
      );

      // Don't fail, just warn
      return res.json({
        success: true,
        message: "Application submitted, but email service not configured",
        mock: true,
      });
    }

    const result = await sendEmail(to, template, data);

    if (result.success) {
      console.log("✅ Email sent successfully to:", to);
      res.json({
        success: true,
        message: "Email sent successfully",
        messageId: result.messageId,
      });
    } else {
      console.error("❌ Failed to send email:", result.error);
      res.status(500).json({
        success: false,
        message: "Failed to send email",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("❌ Email sending error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get user's applications
router.get("/my-applications", auth, async (req, res) => {
  try {
    console.log("=== FETCH USER APPLICATIONS ===");
    const userId = req.user?.id || req.user?._id;
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const applications = await Application.find({ userId }).sort({
      appliedDate: -1,
    });

    console.log(`✅ Found ${applications.length} applications for user`);

    res.json({
      success: true,
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

// Get application by ID
router.get("/:applicationId", auth, async (req, res) => {
  try {
    console.log("=== FETCH SINGLE APPLICATION ===");
    const userId = req.user?.id || req.user?._id;
    const { applicationId } = req.params;

    console.log("Application ID:", applicationId);
    console.log("User ID:", userId);

    const application = await Application.findOne({
      applicationId: applicationId,
      userId: userId,
    });

    if (!application) {
      console.log("❌ Application not found");
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    console.log("✅ Application found");
    res.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("❌ Error fetching application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
    });
  }
});

// Test email route (remove in production)
router.post("/test-email", async (req, res) => {
  try {
    console.log("=== TEST EMAIL ===");
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Email address required",
      });
    }

    const result = await sendEmail(to, "application-confirmation", {
      userName: "Test User",
      schemeName: "Test Scheme",
      applicationId: `TEST${Date.now()}`,
      appliedDate: new Date().toLocaleDateString(),
      schemeDetails: {
        benefit: "Test Benefit",
        website: "test.gov.in",
        helpline: "1800-TEST",
      },
    });

    console.log("Test email result:", result);
    res.json(result);
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check for email service
router.get("/email/status", auth, async (req, res) => {
  try {
    const emailConfigured = !!(
      process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
    );

    res.json({
      success: true,
      emailConfigured,
      emailUser: process.env.EMAIL_USER ? "✅ Configured" : "❌ Not configured",
      status: emailConfigured
        ? "Email service ready"
        : "Email service not configured",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to check email status",
    });
  }
});

module.exports = router;
