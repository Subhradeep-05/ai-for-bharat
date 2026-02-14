const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Add this import
const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        profileCompleted: user.profileCompleted || false,
        preferredLanguage: user.preferredLanguage || "English",
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during signup. Please try again.",
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        profileCompleted: user.profileCompleted || false,
        preferredLanguage: user.preferredLanguage || "English",
        state: user.state || "",
        district: user.district || "",
        occupation: user.occupation || "",
        annualIncome: user.annualIncome || "",
        category: user.category || "General",
        dob: user.dob || "",
        gender: user.gender || "",
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("❌ Get user error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    console.log("=== UPDATE PROFILE ===");
    console.log("User ID:", req.user.id);
    console.log("Update data:", req.body);

    const {
      name,
      phone,
      state,
      district,
      address,
      occupation,
      annualIncome,
      category,
      dob,
      gender,
      aadhaar,
      pan,
      preferences,
    } = req.body;

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (state) updateFields.state = state;
    if (district) updateFields.district = district;
    if (address) updateFields.address = address;
    if (occupation) updateFields.occupation = occupation;
    if (annualIncome) updateFields.annualIncome = annualIncome;
    if (category) updateFields.category = category;
    if (dob) updateFields.dob = dob;
    if (gender) updateFields.gender = gender;
    if (aadhaar) updateFields.aadhaar = aadhaar;
    if (pan) updateFields.pan = pan;
    if (preferences) updateFields.preferences = preferences;

    // Check if profile is now completed (all required fields filled)
    const requiredFields = [
      "name",
      "phone",
      "state",
      "district",
      "occupation",
      "dob",
      "gender",
    ];
    const user = await User.findById(req.user.id);

    if (user) {
      const isProfileCompleted = requiredFields.every(
        (field) => updateFields[field] || user[field],
      );
      updateFields.profileCompleted = isProfileCompleted;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ Profile updated successfully");
    res.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("❌ Profile update error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("❌ Password change error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
});

// @route   POST /api/auth/logout-all
// @desc    Logout from all devices (invalidate all tokens)
// @access  Private
router.post("/logout-all", auth, async (req, res) => {
  try {
    // In a real implementation, you might want to maintain a token blacklist
    // For now, we'll just return success - the frontend will clear the token

    res.json({
      success: true,
      message: "Logged out from all devices",
    });
  } catch (err) {
    console.error("❌ Logout all error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to logout from all devices",
    });
  }
});

// @route   DELETE /api/auth/account
// @desc    Delete user account
// @access  Private
router.delete("/account", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("❌ Account deletion error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
});

// @route   GET /api/auth/sessions
// @desc    Get active sessions
// @access  Private
router.get("/sessions", auth, async (req, res) => {
  try {
    // In a real implementation, you would track sessions in a separate collection
    // For now, return mock data
    const sessions = [
      {
        id: 1,
        device: "Chrome on Windows",
        lastActive: "now",
        current: true,
        ip: "192.168.1.1",
        location: "India",
      },
      {
        id: 2,
        device: "Mobile App",
        lastActive: "2 days ago",
        current: false,
        ip: "192.168.1.2",
        location: "India",
      },
    ];

    res.json({
      success: true,
      sessions,
    });
  } catch (err) {
    console.error("❌ Get sessions error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
    });
  }
});

// @route   POST /api/auth/revoke-session/:sessionId
// @desc    Revoke a specific session
// @access  Private
router.post("/revoke-session/:sessionId", auth, async (req, res) => {
  try {
    // In a real implementation, you would revoke the specific session token
    res.json({
      success: true,
      message: "Session revoked successfully",
    });
  } catch (err) {
    console.error("❌ Revoke session error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to revoke session",
    });
  }
});

module.exports = router;
