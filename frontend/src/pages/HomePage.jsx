// src/pages/HomePage.jsx
import React from "react";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          {/* Left Content */}
          <div className="hero-text">
            <h1>
              Welcome to <span className="highlight">HealthBridge</span>
            </h1>
            <p>
              Book, manage, and track your medical appointments anytime,
              anywhere.
            </p>
            <div className="buttons">
              <button className="btn primary">Book Appointment</button>
              <button className="btn secondary">Learn More</button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image">
            <img src="/images/nurse.jpeg" alt="Doctors and Nurses" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
