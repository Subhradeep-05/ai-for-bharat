const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  state: {
    type: String,
  },
  district: {
    type: String,
  },
  address: {
    type: String,
  },
  occupation: {
    type: String,
  },
  annualIncome: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["General", "SC", "ST", "OBC", "Other"],
    default: "General",
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"],
  },
  aadhaar: {
    type: String,
  },
  pan: {
    type: String,
  },
  preferences: {
    language: { type: String, default: "English" },
    theme: { type: String, default: "light" },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
      schemeUpdates: { type: Boolean, default: true },
      applicationStatus: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
    },
    voice: {
      enabled: { type: Boolean, default: false },
      language: { type: String, default: "hi-IN" },
      speed: { type: String, default: "normal" },
      gender: { type: String, default: "female" },
    },
    privacy: {
      showProfile: { type: Boolean, default: false },
      dataSharing: { type: Boolean, default: true },
      analytics: { type: Boolean, default: true },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
