import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { documentAPI } from "@/services/documentAPI";
import "./VerifyDocument.css";

const VerifyDocument = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const reason = searchParams.get("reason");

    if (reason) {
      // Handle failure cases from redirect
      setVerifying(false);
      setError(getErrorMessage(reason));
      return;
    }

    if (!token) {
      setError("No verification token provided");
      setVerifying(false);
      return;
    }

    verifyDocument(token);
  }, [searchParams]);

  const getErrorMessage = (reason) => {
    switch (reason) {
      case "invalid":
        return "Invalid verification link";
      case "expired":
        return "Verification link has expired";
      case "error":
        return "An error occurred during verification";
      default:
        return "Verification failed";
    }
  };

  const verifyDocument = async (token) => {
    try {
      const response = await documentAPI.verifyDocument(token);

      if (response.success) {
        setSuccess(true);

        // Redirect to login or dashboard after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(response.message || "Verification failed");
      }
    } catch (err) {
      setError(err.message || "Failed to verify document");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        {verifying ? (
          <>
            <FaSpinner className="spinner" />
            <h2>Verifying Your Document...</h2>
            <p>Please wait while we verify your document.</p>
          </>
        ) : success ? (
          <>
            <FaCheckCircle className="success-icon" />
            <h2>Document Verified Successfully! ✅</h2>
            <p>
              Your document has been verified. You will be redirected to the
              home page.
            </p>
          </>
        ) : (
          <>
            <FaTimesCircle className="error-icon" />
            <h2>Verification Failed</h2>
            <p>{error}</p>
            <button onClick={() => navigate("/")} className="back-btn">
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyDocument;
