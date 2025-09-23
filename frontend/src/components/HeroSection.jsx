// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; // we’ll create this CSS file

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        {/* Left text */}
        <div className="hero-text">
          <h1>Your Health, Our Priority</h1>
          <p>Book appointments with trusted doctors easily and quickly.</p>
          <Link to="/doctors" className="hero-button">
            Find a Doctor
          </Link>
        </div>

        {/* Right image */}
        <div className="hero-image">
          <img src="/images/nurse.jpeg" alt="Doctor" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
