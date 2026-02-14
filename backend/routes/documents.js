const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto"); // ADD THIS
const mongoose = require("mongoose");
const Document = require("../models/Document");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken"); // ADD THIS
const { sendEmail } = require("../utils/emailService");
const auth = require("../middleware/auth");

// Debug logging
console.log("✅ Documents route loaded");
console.log("📄 Document model loaded:", !!Document);
console.log("📄 Document model name:", Document?.modelName);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created upload directory:", uploadDir);
} else {
  console.log("📁 Upload directory exists:", uploadDir);
}

// Test database connection
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connected in documents route");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error in documents route:", err);
});

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    // Sanitize filename - remove special characters
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
    cb(null, `${req.user.id}_${uniqueId}${ext}`);
  },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only PDF, images, Word, and Excel files are allowed.",
      ),
      false,
    );
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB limit
  },
  fileFilter: fileFilter,
});

// Helper function to determine file type
const getFileType = (mimetype) => {
  if (mimetype.includes("pdf")) return "pdf";
  if (mimetype.includes("image")) return "image";
  if (mimetype.includes("word") || mimetype.includes("document")) return "word";
  if (mimetype.includes("excel") || mimetype.includes("sheet")) return "excel";
  return "other";
};

// Helper function to calculate size display
const getSizeDisplay = (size) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
};

// @route   POST /api/documents/upload
// @desc    Upload a document
// @access  Private
router.post("/upload", auth, (req, res) => {
  // Use multer upload as middleware
  upload.single("document")(req, res, async function (err) {
    // Handle multer errors
    if (err) {
      console.error("❌ Multer error:", err);
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size exceeds 1MB limit",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed",
      });
    }

    try {
      console.log("=== DOCUMENT UPLOAD ===");
      console.log("User ID:", req.user.id);
      console.log("File:", req.file);
      console.log("Body:", req.body);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const {
        documentType,
        category,
        documentName,
        expiryDate,
        tags,
        referenceNumber,
      } = req.body;

      // Validate required fields
      if (!documentType || !category || !documentName) {
        // Clean up uploaded file
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
          console.log("🧹 Cleaned up uploaded file due to missing fields");
        }

        return res.status(400).json({
          success: false,
          message:
            "Missing required fields: documentType, category, documentName",
        });
      }

      // Validate category
      const validCategories = [
        "identity",
        "income",
        "education",
        "land",
        "caste",
        "bank",
        "other",
      ];
      if (!validCategories.includes(category)) {
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
          console.log("🧹 Cleaned up uploaded file due to invalid category");
        }
        return res.status(400).json({
          success: false,
          message:
            "Invalid category. Must be one of: identity, income, education, land, caste, bank, other",
        });
      }

      // Get user for email
      const user = await User.findById(req.user.id);
      if (!user) {
        // Clean up uploaded file
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
          console.log("🧹 Cleaned up uploaded file due to user not found");
        }

        console.log(
          "⚠️ User not found in database but token is valid. User ID:",
          req.user.id,
        );

        return res.status(401).json({
          success: false,
          message: "User session expired. Please log in again.",
          code: "USER_NOT_FOUND",
        });
      }

      // Parse tags
      let tagsArray = [];
      if (tags) {
        tagsArray = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);
      }

      // Create document record
      const document = new Document({
        userId: req.user.id,
        name: documentName,
        category: category,
        type: getFileType(req.file.mimetype),
        fileUrl: `/uploads/documents/${req.file.filename}`,
        fileKey: req.file.filename,
        size: req.file.size,
        mimeType: req.file.mimetype,
        documentType: documentType,
        referenceNumber: referenceNumber || "",
        tags: tagsArray,
      });

      // Set expiry date if provided
      if (expiryDate) {
        document.expiryDate = new Date(expiryDate);
      }

      // Validate document before saving
      const validationError = document.validateSync();
      if (validationError) {
        // Clean up uploaded file
        if (req.file && req.file.path) {
          fs.unlinkSync(req.file.path);
          console.log("🧹 Cleaned up uploaded file due to validation error");
        }
        console.error("❌ Validation error:", validationError);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.errors,
        });
      }

      await document.save();
      console.log("✅ Document saved successfully:", document._id);

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

      // Save token to database
      const tokenDoc = new VerificationToken({
        documentId: document._id,
        userId: req.user.id,
        token: verificationToken,
      });
      await tokenDoc.save();

      // Create verification link
      const verificationLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-document?token=${verificationToken}`;

      // Send verification email
      try {
        await sendEmail(user.email, "document-verification", {
          userName: user.name,
          documentName: documentName,
          uploadDate: new Date().toLocaleDateString(),
          documentType: documentType,
          referenceNumber: referenceNumber,
          verificationLink: verificationLink,
        });
        console.log("✅ Verification email sent to:", user.email);
      } catch (emailError) {
        console.error("❌ Failed to send verification email:", emailError);
        // Don't fail the upload if email fails
      }

      // Format response
      const responseDoc = {
        id: document._id,
        name: document.name,
        category: document.category,
        type: document.type,
        size: document.size,
        sizeDisplay: getSizeDisplay(document.size),
        status: document.status,
        uploadedOn: document.uploadedOn.toISOString().split("T")[0],
        expiryDate: document.expiryDate
          ? document.expiryDate.toISOString().split("T")[0]
          : "N/A",
        tags: document.tags,
        fileUrl: document.fileUrl,
        documentType: document.documentType,
        referenceNumber: document.referenceNumber,
      };

      res.status(201).json({
        success: true,
        message:
          "Document uploaded successfully. Please check your email to verify.",
        document: responseDoc,
      });
    } catch (error) {
      console.error("❌ Document upload error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      // Check for specific error types
      if (error.name === "ValidationError") {
        console.error("Validation errors:", error.errors);
      }
      if (error.name === "MongoError" || error.code === 11000) {
        console.error("Duplicate key error");
      }

      // Clean up uploaded file if there was an error
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
          console.log("✅ Cleaned up uploaded file after error");
        } catch (unlinkError) {
          console.error("Error cleaning up file:", unlinkError);
        }
      }

      res.status(500).json({
        success: false,
        message: error.message || "Failed to upload document",
      });
    }
  });
});

// @route   POST /api/documents/verify
// @desc    Verify document via email link
// @access  Public (with token)
router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    // Find token in database
    const verificationToken = await VerificationToken.findOne({
      token,
      isUsed: false,
    });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Check if token is expired
    if (verificationToken.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Verification token has expired",
      });
    }

    // Find the document
    const document = await Document.findById(
      verificationToken.documentId,
    ).populate("userId");

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Update document status to verified
    document.status = "verified";
    document.verifiedOn = new Date();
    await document.save();

    // Mark token as used
    verificationToken.isUsed = true;
    await verificationToken.save();

    // Send success email
    try {
      await sendEmail(document.userId.email, "document-verified-success", {
        userName: document.userId.name,
        documentName: document.name,
      });
      console.log("✅ Success email sent to:", document.userId.email);
    } catch (emailError) {
      console.error("❌ Failed to send success email:", emailError);
    }

    res.json({
      success: true,
      message: "Document verified successfully",
    });
  } catch (error) {
    console.error("❌ Document verification error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify document",
    });
  }
});

// @route   GET /api/documents/verify/:token
// @desc    Verify document via GET (for direct link)
// @access  Public
router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const verificationToken = await VerificationToken.findOne({
      token,
      isUsed: false,
    });

    if (!verificationToken) {
      return res.redirect(
        `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-failed?reason=invalid`,
      );
    }

    if (verificationToken.expiresAt < new Date()) {
      return res.redirect(
        `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-failed?reason=expired`,
      );
    }

    // Redirect to frontend with token
    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-document?token=${token}`,
    );
  } catch (error) {
    console.error("❌ Token verification redirect error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/verify-failed?reason=error`,
    );
  }
});

// @route   GET /api/documents
// @desc    Get all documents for current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    console.log("=== FETCH DOCUMENTS ===");
    console.log("User ID:", req.user.id);

    const documents = await Document.find({
      userId: req.user.id,
      isDeleted: false,
    }).sort({ uploadedOn: -1 });

    console.log(`✅ Found ${documents.length} documents`);

    // Format documents for frontend
    const formattedDocs = documents.map((doc) => ({
      id: doc._id,
      name: doc.name,
      category: doc.category,
      categoryDisplay: doc.categoryDisplay,
      type: doc.type,
      size: doc.size,
      sizeDisplay: doc.sizeDisplay,
      status: doc.status,
      uploadedOn: doc.uploadedOn.toISOString().split("T")[0],
      expiryDate: doc.expiryDate
        ? doc.expiryDate.toISOString().split("T")[0]
        : "N/A",
      tags: doc.tags,
      rejectionReason: doc.rejectionReason,
      fileUrl: doc.fileUrl,
      fileKey: doc.fileKey,
      documentType: doc.documentType,
      referenceNumber: doc.referenceNumber,
    }));

    res.json({
      success: true,
      documents: formattedDocs,
    });
  } catch (error) {
    console.error("❌ Fetch documents error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch documents",
    });
  }
});

// @route   GET /api/documents/:id
// @desc    Get single document
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id,
      isDeleted: false,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.json({
      success: true,
      document,
    });
  } catch (error) {
    console.error("❌ Fetch document error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch document",
    });
  }
});

// @route   DELETE /api/documents/:id
// @desc    Delete a document
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Soft delete
    document.isDeleted = true;
    await document.save();

    // Optionally delete the actual file
    const filePath = path.join(__dirname, "..", document.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted file: ${filePath}`);
    }

    res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete document error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete document",
    });
  }
});

// @route   POST /api/documents/:id/verify
// @desc    Verify a document (admin only)
// @access  Private (Admin)
router.post("/:id/verify", auth, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const document = await Document.findById(req.params.id).populate("userId");

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    document.status = status;
    document.verifiedBy = req.user.id;
    document.verifiedOn = new Date();

    if (status === "rejected" && rejectionReason) {
      document.rejectionReason = rejectionReason;
    }

    await document.save();

    // Send email notification to user
    try {
      await sendEmail(
        document.userId.email,
        status === "verified" ? "document-verified" : "document-rejected",
        {
          userName: document.userId.name,
          documentName: document.name,
          status: status,
          rejectionReason: rejectionReason,
        },
      );
      console.log(
        `✅ ${status} notification email sent to ${document.userId.email}`,
      );
    } catch (emailError) {
      console.error("❌ Failed to send verification email:", emailError);
    }

    res.json({
      success: true,
      message: `Document ${status} successfully`,
    });
  } catch (error) {
    console.error("❌ Verify document error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify document",
    });
  }
});

// @route   GET /api/documents/stats/summary
// @desc    Get document statistics
// @access  Private
router.get("/stats/summary", auth, async (req, res) => {
  try {
    const stats = await Document.aggregate([
      { $match: { userId: req.user.id, isDeleted: false } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      total: 0,
      verified: 0,
      pending: 0,
      rejected: 0,
      expired: 0,
    };

    stats.forEach((stat) => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    res.json({
      success: true,
      stats: result,
    });
  } catch (error) {
    console.error("❌ Fetch stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch document statistics",
    });
  }
});

// @route   GET /api/documents/file/:filename
// @desc    Serve uploaded file
// @access  Private
router.get("/file/:filename", auth, async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads/documents", filename);

    console.log(`📁 Serving file: ${filename}`);
    console.log(`📁 File path: ${filePath}`);

    // Verify that the file belongs to the user
    const document = await Document.findOne({
      fileKey: filename,
      userId: req.user.id,
    });

    if (!document) {
      console.log("❌ File not found in database");
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    if (!fs.existsSync(filePath)) {
      console.log("❌ File not found on server");
      return res.status(404).json({
        success: false,
        message: "File not found on server",
      });
    }

    // Set proper headers for file download
    res.setHeader(
      "Content-Type",
      document.mimeType || "application/octet-stream",
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(document.name)}"`,
    );

    console.log(`✅ Serving file: ${filename}`);
    res.sendFile(filePath);
  } catch (error) {
    console.error("❌ Serve file error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to serve file",
    });
  }
});

// @route   GET /api/documents/categories/list
// @desc    Get all categories with document counts
// @access  Private
router.get("/categories/list", auth, async (req, res) => {
  try {
    const categories = await Document.aggregate([
      { $match: { userId: req.user.id, isDeleted: false } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("❌ Fetch categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
});

module.exports = router;
