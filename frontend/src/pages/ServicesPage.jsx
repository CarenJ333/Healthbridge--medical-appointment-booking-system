import "../App.css";

export default function ServicesPage() {
  return (
    <div className="services-page">
    
      <section className="services-hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Our <span className="highlight">Services</span></h1>
          <p>
            At HealthBridge, we simplify healthcare by making it easier for patients 
            to connect with doctors and manage appointments seamlessly.
          </p>
        </div>
      </section>

      <section className="services-content">
        <h2 className="section-title">What We Offer</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Book Appointments Online</h3>
            <p>Patients can schedule doctor visits anytime, from anywhere.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Doctor Profiles</h3>
            <p>Browse doctors by their specialty, availability, and expertise.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Manage Availability</h3>
            <p>Doctors can set their working hours to match patient needs.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Personal Dashboards</h3>
            <p>Patients and doctors can track and manage appointments easily.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Secure Platform</h3>
            <p>All data is protected with the latest security standards.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"></div>
            <h3>Seamless Communication</h3>
            <p>Better patient-doctor interaction through integrated tools.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
