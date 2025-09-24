import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="homepage">
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Welcome to <span className="highlight">HealthBridge</span>
            </h1>
            <p>
              Book, manage, and track your medical appointments anytime,
              anywhere.
            </p>
            <div className="buttons">
              <button className="btn primary" onClick={handleBookAppointment}>
                Book Appointment
              </button>
              <button className="btn secondary">Learn More</button>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/nurse.jpeg" alt="Doctors and Nurses" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
