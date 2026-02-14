const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  schemeId: {
    type: String,
    required: true,
  },
  schemeName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  applicationId: {
    type: String,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "processing"],
    default: "pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  documents: [
    {
      name: String,
      url: String,
      uploadedAt: Date,
    },
  ],
  notes: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
