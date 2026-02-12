import React, { useState } from "react";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { authService } from "../services/authService";
import "./AuthModals.css";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);
      if (response.success) {
        onLoginSuccess(response.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <div className="modal-logo">
            <span className="modal-flag">🇮🇳</span>
            <h2>Welcome Back</h2>
          </div>
          <p className="modal-subtitle">Sign in to continue to Saarthi</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="modal-footer">
          <p>Don't have an account?</p>
          <button onClick={onSwitchToSignup} className="switch-btn">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
