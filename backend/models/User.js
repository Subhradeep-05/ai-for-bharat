const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  occupation: {
    type: String,
    default: "",
  },
  income: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["General", "SC", "ST", "OBC", "Other"],
    default: "General",
  },
  age: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", ""],
    default: "",
  },
  familySize: {
    type: Number,
    default: 1,
  },
  preferredLanguage: {
    type: String,
    default: "English",
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ❌ NO pre-save middleware - we hash in the route
// ❌ NO comparePassword method - we use bcrypt.compare directly in route

module.exports = mongoose.model("User", UserSchema);
