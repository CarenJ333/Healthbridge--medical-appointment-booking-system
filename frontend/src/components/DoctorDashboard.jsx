import React from "react";
import "../App.css";

const DoctorDashboard = ({ user, onLogout }) => {
  const doctorName = user?.name || "Doctor";

  // Example appointments (later fetch from backend)
  const appointments = [
    { id: 1, patient: "Mary Jane", date: "2025-09-25", time: "10:00 AM" },
    { id: 2, patient: "John Doe", date: "2025-09-26", time: "2:30 PM" },
  ];

  const handleComplete = (id) => {
    // TODO: send PATCH request to backend
    console.log("Appointment completed:", id);
  };

  const handleCancel = (id) => {
    // TODO: send DELETE request to backend
    console.log("Appointment canceled:", id);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome Dr. {doctorName} 👨‍⚕️</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-card">
          <h2>{appointments.length}</h2>
          <p>Upcoming Appointments</p>
        </div>
        <div className="stat-card">
          <h2>12</h2>
          <p>Patients Treated</p>
        </div>
      </section>

      {/* Appointments List */}
      <div className="dashboard-main">
        <div className="dashboard-card">
          <h3>My Appointments</h3>
          <ul className="appointments-list">
            {appointments.map((appt) => (
              <li key={appt.id}>
                <strong>{appt.patient}</strong> - {appt.date}, {appt.time}
                <button
                  className="complete-btn"
                  onClick={() => handleComplete(appt.id)}
                >
                  Complete
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
