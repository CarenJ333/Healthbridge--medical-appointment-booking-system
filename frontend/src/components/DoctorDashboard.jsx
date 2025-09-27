import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [loading, setLoading] = useState(true);

  // Fetch appointments for this doctor
  useEffect(() => {
    if (!user) return;

    fetch(`http://healthbridge-medical-appointment-booking-okbi.onrender.com/appointments?doctorId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, [user]);

  // Update status (Confirm/Cancel)
  const updateStatus = (id, newStatus) => {
    fetch(`http://healthbridge-medical-appointment-booking-okbi.onrender.com/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setAppointments((prev) =>
          prev.map((appt) => (appt.id === id ? updated : appt))
        )
      )
      .catch((err) => console.error("Error updating status:", err));
  };

  // Metrics
  const metrics = {
    total: appointments.length,
    confirmed: appointments.filter((a) => a.status === "Confirmed").length,
    pending: appointments.filter((a) => a.status === "Pending").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };

  const statusColors = {
    Confirmed: "green",
    Pending: "orange",
    Cancelled: "red",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2c3e50",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{ color: "#fff", cursor: "pointer" }}
            onClick={() => setActiveSection("Dashboard")}
          >
            Doctor Dashboard
          </h2>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
            {["Dashboard", "Appointments", "Calendar", "Messages", "Lab Results"].map(
              (item) => (
                <li
                  key={item}
                  onClick={() => setActiveSection(item)}
                  style={{
                    padding: "10px 0",
                    cursor: "pointer",
                    fontWeight: activeSection === item ? "bold" : "normal",
                    color: activeSection === item ? "#1abc9c" : "#fff",
                  }}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
        <button
          style={{
            padding: "10px",
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px", background: "#ecf0f1" }}>
        <h1>Good Morning, Dr. {user?.name || "Doctor"}</h1>

        {/* Dashboard Section */}
        {activeSection === "Dashboard" && (
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {["Total Appointments", "Confirmed", "Pending", "Cancelled"].map(
              (title, index) => {
                const value =
                  title === "Total Appointments"
                    ? metrics.total
                    : title === "Confirmed"
                    ? metrics.confirmed
                    : title === "Pending"
                    ? metrics.pending
                    : metrics.cancelled;
                return (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      background: "#fff",
                      padding: "15px",
                      borderRadius: "10px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h3>{title}</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
                  </div>
                );
              }
            )}
          </div>
        )}

        {/* Appointments Section */}
        {activeSection === "Appointments" && (
          <div style={{ marginTop: "30px" }}>
            <h2>Appointments</h2>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderBottom: "2px solid #bdc3c7", padding: "10px", textAlign: "left" }}>Patient</th>
                  <th style={{ borderBottom: "2px solid #bdc3c7", padding: "10px", textAlign: "left" }}>Date</th>
                  <th style={{ borderBottom: "2px solid #bdc3c7", padding: "10px", textAlign: "left" }}>Time</th>
                  <th style={{ borderBottom: "2px solid #bdc3c7", padding: "10px", textAlign: "left" }}>Status</th>
                  <th style={{ borderBottom: "2px solid #bdc3c7", padding: "10px", textAlign: "left" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td style={{ padding: "10px" }}>{appt.patientName}</td>
                    <td style={{ padding: "10px" }}>{appt.date}</td>
                    <td style={{ padding: "10px" }}>{appt.time}</td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          color: "#fff",
                          background: statusColors[appt.status] || "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}>
                      {appt.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(appt.id, "Confirmed")}
                            style={{
                              marginRight: "10px",
                              padding: "5px 10px",
                              background: "green",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(appt.id, "Cancelled")}
                            style={{
                              padding: "5px 10px",
                              background: "red",
                              color: "#fff",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === "Calendar" && (
          <h2 style={{ marginTop: "30px" }}>Calendar Section (Coming Soon)</h2>
        )}
        {activeSection === "Messages" && (
          <h2 style={{ marginTop: "30px" }}>Messages Section (Coming Soon)</h2>
        )}
        {activeSection === "Lab Results" && (
          <h2 style={{ marginTop: "30px" }}>Lab Results Section (Coming Soon)</h2>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
