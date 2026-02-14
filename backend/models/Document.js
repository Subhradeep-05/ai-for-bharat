const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "identity",
        "income",
        "education",
        "land",
        "caste",
        "bank",
        "other",
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ["pdf", "image", "word", "excel", "other"],
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileKey: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedOn: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected", "expired"],
      default: "pending",
    },
    expiryDate: {
      type: Date,
    },
    tags: [String],
    rejectionReason: {
      type: String,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedOn: {
      type: Date,
    },
    mimeType: {
      type: String,
    },
    documentType: {
      type: String,
    },
    referenceNumber: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for category display
DocumentSchema.virtual("categoryDisplay").get(function () {
  const categoryMap = {
    identity: "Identity Proof",
    income: "Income Proof",
    education: "Education",
    land: "Land Records",
    caste: "Caste Certificate",
    bank: "Bank Details",
    other: "Other",
  };
  return categoryMap[this.category] || this.category;
});

// Virtual for size display - calculated on the fly
DocumentSchema.virtual("sizeDisplay").get(function () {
  if (!this.size) return "0 B";
  if (this.size < 1024) {
    return `${this.size} B`;
  } else if (this.size < 1024 * 1024) {
    return `${(this.size / 1024).toFixed(2)} KB`;
  } else {
    return `${(this.size / (1024 * 1024)).toFixed(2)} MB`;
  }
});

module.exports = mongoose.model("Document", DocumentSchema);
