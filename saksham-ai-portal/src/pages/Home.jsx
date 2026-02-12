import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Statistics from "../components/Statistics/Statistics";
import Graphs from "../components/Graphs/Graphs";
import VoiceAssistant from "../components/VoiceAssistant/VoiceAssistant";
import Footer from "../components/Footer/Footer";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { authService } from "../services/authService";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";

const Home = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleSignupSuccess = (user) => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        isAuthenticated={isAuthenticated}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        onSignupSuccess={handleSignupSuccess}
      />

      <Hero />
      <Services />
      <Statistics />
      <Graphs />
      <VoiceAssistant />
      <Footer />
    </motion.div>
  );
};

export default Home;
