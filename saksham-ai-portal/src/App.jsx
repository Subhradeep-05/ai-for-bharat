import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import VerifyDocument from "./pages/VerifyDocument"; // Add this import
import { authService } from "./services/authService";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = () => {
      const user = authService.getCurrentUser();
      const token = localStorage.getItem("token");

      if (user && token) {
        setIsAuthenticated(true);
      } else {
        // Clean up if inconsistent
        if (!user && token) {
          localStorage.removeItem("token");
        }
        if (user && !token) {
          localStorage.removeItem("user");
        }
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">
          <div className="chakra-animation"></div>
          <p>Loading Saarthi...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/dashboard/*"
            element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Public verification routes - accessible without authentication */}
          <Route path="/verify-document" element={<VerifyDocument />} />
          <Route path="/verify-failed" element={<VerifyDocument />} />

          {/* Catch all other routes and redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
