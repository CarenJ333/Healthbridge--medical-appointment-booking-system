import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
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

    
      <section className="doctors-section">
        <h2>Available Doctors</h2>
        <div className="doctors-grid">
          <div className="doctor-card">
            <img src="/images/dr john d.webp" alt="Dr. John Doe" />
            <h3>Dr. John Doe</h3>
            <p>Cardiology</p>
          </div>
          <div className="doctor-card">
            <img src="/images/dr jane smith.webp" alt="Dr. Jane Smith" />
            <h3>Dr. Jane Smith</h3>
            <p>Dermatology</p>
          </div>
          <div className="doctor-card">
            <img src="/images/dr michael.jpeg" alt="Dr. Michael Brown" />
            <h3>Dr. Michael Brown</h3>
            <p>Neurology</p>
          </div>
          <div className="doctor-card">
            <img src="/images/dr emilly.webp" alt="Dr. Emily Davis" />
            <h3>Dr. Emily Davis</h3>
            <p>Pediatrics</p>
          </div>
          <div className="doctor-card">
            <img src="/images/dr robert.jpeg" alt="Dr. Robert Wilson" />
            <h3>Dr. Robert Wilson</h3>
            <p>Orthopedics</p>
          </div>
          <div className="doctor-card">
            <img src="/images/dr susan.webp" alt="Dr. Susan Taylor" />
            <h3>Dr. Susan Taylor</h3>
            <p>Oncology</p>
          </div>
        </div>
      </section>

    
      <section className="testimonials-section">
        <h2>What People Say About Us</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>
              "The doctors are very professional and caring. I got my result
              quickly and everything was seamless."
            </p>
            <strong>Jane Doe</strong>
          </div>
          <div className="testimonial-card">
            <p>
              "The doctors are very professional and caring. I got my result
              quickly and everything was seamless."
            </p>
            <strong>Jane smith</strong>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
