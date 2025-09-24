export default function ServicesPage() {
  return (
    <div className="page-container">
      <h1>Our Services</h1>
      <p>HealthBridge makes booking and managing medical appointments easy and efficient.</p>

      <div className="services-grid">
        <div className="service-card">
          <h2>Book Appointments Online</h2>
          <p>Patients can book doctor appointments anytime, from anywhere.</p>
        </div>

        <div className="service-card">
          <h2>Doctor Profiles</h2>
          <p>Browse doctors by their specialty, availability, and expertise.</p>
        </div>

        <div className="service-card">
          <h2>Manage Availability</h2>
          <p>Doctors can set their working hours to match patient bookings.</p>
        </div>

        <div className="service-card">
          <h2>Personal Dashboards</h2>
          <p>Both patients and doctors can view and track upcoming appointments.</p>
        </div>
      </div>
    </div>
  );
}
