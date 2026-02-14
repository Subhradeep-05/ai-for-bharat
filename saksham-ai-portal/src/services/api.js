import axios from "axios";

// Create axios instance with base URL - Using import.meta.env for Vite
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies/session handling
});

// Request interceptor to add token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["x-auth-token"] = token; // For backward compatibility
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Handle server errors (500)
    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error - please check your connection");
    }

    return Promise.reject(error);
  },
);

// Application API functions
export const applicationAPI = {
  // Submit new application
  submitApplication: async (applicationData) => {
    try {
      const response = await API.post("/applications", applicationData);
      return response.data;
    } catch (error) {
      console.error("Submit application error:", error);
      console.error("Error response:", error.response?.data); // ← ADD THIS
      console.error("Error status:", error.response?.status); // ← ADD THIS
      throw (
        error.response?.data || {
          success: false,
          message: "Network error. Please try again.",
        }
      );
    }
  },

  // Send confirmation email
  sendEmail: async (emailData) => {
    try {
      const response = await API.post("/applications/send-email", emailData);
      return response.data;
    } catch (error) {
      console.error("Send email error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to send email. Please check your email manually.",
        }
      );
    }
  },

  // Get user's applications
  getMyApplications: async () => {
    try {
      const response = await API.get("/applications/my-applications");
      return response.data;
    } catch (error) {
      console.error("Get applications error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch applications",
        }
      );
    }
  },

  // Get specific application by ID
  getApplicationById: async (applicationId) => {
    try {
      const response = await API.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error("Get application error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch application details",
        }
      );
    }
  },

  // Check application status
  checkStatus: async (applicationId) => {
    try {
      const response = await API.get(`/applications/${applicationId}/status`);
      return response.data;
    } catch (error) {
      console.error("Check status error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to check application status",
        }
      );
    }
  },

  // Cancel application
  cancelApplication: async (applicationId) => {
    try {
      const response = await API.delete(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error("Cancel application error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to cancel application",
        }
      );
    }
  },
};

// Auth API functions
export const authAPI = {
  // User login
  login: async (credentials) => {
    try {
      const response = await API.post("/auth/login", credentials);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Login failed. Please check your credentials.",
        }
      );
    }
  },

  // User signup
  signup: async (userData) => {
    try {
      const response = await API.post("/auth/signup", userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Signup failed. Please try again.",
        }
      );
    }
  },

  // Get current user from API
  getCurrentUser: async () => {
    try {
      const response = await API.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to get user details",
        }
      );
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Get current user from localStorage (synchronous)
  getCurrentUserFromStorage: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      console.log(
        "📤 Sending profile update to:",
        `${API.defaults.baseURL}/auth/profile`,
      );
      console.log("📦 Data:", userData);
      const response = await API.put("/auth/profile", userData);
      console.log("📥 Response:", response.data);
      if (response.data.success) {
        // Update stored user data
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      return response.data;
    } catch (error) {
      console.error("❌ Update profile error:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("Update profile error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to update profile",
        }
      );
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await API.post("/auth/change-password", passwordData);
      return response.data;
    } catch (error) {
      console.error("Change password error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to change password",
        }
      );
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await API.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to process request",
        }
      );
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await API.post("/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to reset password",
        }
      );
    }
  },
};

// Utility functions for API
export const apiUtils = {
  // Check if API is reachable
  checkHealth: async () => {
    try {
      const response = await API.get("/health");
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      return { status: "unreachable" };
    }
  },

  // Set auth token manually
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
    }
  },

  // Clear all stored data
  clearStorage: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userApplications");
  },

  // Add to authAPI object
  getUserProfile: async () => {
    try {
      const response = await API.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Get profile error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to get profile",
        }
      );
    }
  },

  logoutAll: async () => {
    try {
      const response = await API.post("/auth/logout-all");
      return response.data;
    } catch (error) {
      console.error("Logout all error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to logout all devices",
        }
      );
    }
  },

  deleteAccount: async () => {
    try {
      const response = await API.delete("/auth/account");
      return response.data;
    } catch (error) {
      console.error("Delete account error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete account",
        }
      );
    }
  },

  getSessions: async () => {
    try {
      const response = await API.get("/auth/sessions");
      return response.data;
    } catch (error) {
      console.error("Get sessions error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to get sessions",
        }
      );
    }
  },

  revokeSession: async (sessionId) => {
    try {
      const response = await API.post(`/auth/revoke-session/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error("Revoke session error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to revoke session",
        }
      );
    }
  },
};

export default API;
