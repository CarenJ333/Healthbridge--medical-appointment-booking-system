import React, { useState } from "react";
import "../App.css";

const PatientDashboard = ({ user, onLogout }) => {
  const patientName = user?.name || "Patient";

  // Local state for booking form
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBookAppointment = (e) => {
    e.preventDefault();
    // TODO: send to backend
    console.log("Booking:", { doctor, date, time });
    alert(`Appointment booked with ${doctor} on ${date} at ${time}`);
  };

  return (
    <div className="patient-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Housepital360</h2>
        <ul>
          <li>Dashboard</li>
          <li>Appointments</li>
          <li>Calendar</li>
          <li>Lab Results</li>
          <li>Pharmacy</li>
          <li>Billing</li>
          <li>Messages</li>
          <li>Settings</li>
          <li className="logout" onClick={onLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Welcome, {patientName} 👋</h1>
        </header>

        {/* Top Action Buttons */}
        <div className="top-actions">
          <button>📅 Book Appointment</button>
          <button>💊 Order Medicine</button>
          <button>📑 View Reports</button>
          <button>💳 Pay Bills</button>
        </div>

        {/* Dashboard Cards */}
        <div className="cards-grid">
          {/* Confirmed Appointments */}
          <div className="card appointments">
            <h3>Confirmed Appointments</h3>
            <div className="appointment-item">
              <p><strong>SIMON NUROGE</strong></p>
              <p>7/9/2025 - In-person</p>
              <span className="status confirmed">Confirmed</span>
            </div>
            <div className="appointment-item">
              <p><strong>SIMON NUROGE</strong></p>
              <p>7/7/2025 - Telemedicine</p>
              <span className="status confirmed">Confirmed</span>
            </div>
            <div className="appointment-item">
              <p><strong>John Doe</strong></p>
              <p>10/10/2023 - Follow up</p>
              <span className="status confirmed">Confirmed</span>
            </div>
          </div>

          {/* Book Appointment (with form) */}
          <div className="card book-appointment">
            <h3>Book an Appointment</h3>
            <form className="appointment-form" onSubmit={handleBookAppointment}>
              <label>Choose Doctor</label>
              <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
                <option value="">-- Select Doctor --</option>
                <option>Dr. Smith - Cardiologist</option>
                <option>Dr. Lee - Dermatologist</option>
                <option>Dr. Adams - Pediatrician</option>
              </select>

              <label>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

              <label>Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

              <button type="submit">Book Now</button>
            </form>
          </div>

          {/* Lab Results */}
          <div className="card lab-results">
            <h3>Lab Results Summary</h3>
            <p>No recent lab results.</p>
          </div>

          {/* Current Medications */}
          <div className="card medications">
            <h3>Current Medications</h3>
            <p>
              Your AI assistant is ready to help with medications, appointments,
              and health questions.
            </p>
            <button className="chat-btn">Start Chat</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
