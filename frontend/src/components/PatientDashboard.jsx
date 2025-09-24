import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => {
        // Filter so patient only sees their own
        const myAppointments = data.filter(
          (appt) => appt.patient === user.name
        );
        setAppointments(myAppointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, [user.name]);

  // Cancel appointment
  const cancelAppointment = (id) => {
    fetch(`http://localhost:3000/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Canceled" }),
    })
      .then((res) => res.json())
      .then((updated) =>
        setAppointments(
          appointments.map((a) => (a.id === id ? updated : a))
        )
      );
  };

  // Book new appointment (example only — replace with form later)
  const bookAppointment = () => {
    const newAppointment = {
      doctor: "Dr. John Doe (Dermatology)",
      patient: user.name,
      date: "2025-09-30",
      time: "03:00 PM",
      status: "Pending",
    };

    fetch("http://localhost:3000/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then((data) => setAppointments([...appointments, data]));
  };

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "green";
      case "Pending":
        return "orange";
      case "Canceled":
        return "red";
      default:
        return "gray";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#2f3542",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{ marginBottom: "40px", cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            HealthBridge
          </h2>
          <p style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
            Dashboard
          </p>
          <p style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/book-appointment")}>
            Book Appointment
          </p>
          <p style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/appointments")}>
            My Appointments
          </p>
          <p style={{ margin: "15px 0", cursor: "pointer" }} onClick={() => navigate("/profile")}>
            Profile
          </p>
        </div>
        <p
          style={{ marginTop: "auto", cursor: "pointer", color: "#ff4757" }}
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f1f2f6", padding: "20px" }}>
        <h1 style={{ marginBottom: "20px" }}>Welcome, {user.name}!</h1>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>Total Booked</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{appointments.length}</p>
          </div>
          <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>Total Confirmed</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "green" }}>
              {appointments.filter((a) => a.status === "Confirmed").length}
            </p>
          </div>
          <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>Total Pending</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "orange" }}>
              {appointments.filter((a) => a.status === "Pending").length}
            </p>
          </div>
          <div style={{ flex: 1, background: "white", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
            <h3>Total Canceled</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
              {appointments.filter((a) => a.status === "Canceled").length}
            </p>
          </div>
        </div>

        {/* Appointment Table */}
        <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "20px" }}>My Appointments</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Doctor</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Date</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Time</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Status</th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td style={{ padding: "10px" }}>{appt.doctor}</td>
                  <td style={{ padding: "10px" }}>{appt.date}</td>
                  <td style={{ padding: "10px" }}>{appt.time}</td>
                  <td
                    style={{
                      padding: "10px",
                      color: getStatusColor(appt.status),
                      fontWeight: "bold",
                    }}
                  >
                    {appt.status}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {appt.status !== "Canceled" && (
                      <button
                        onClick={() => cancelAppointment(appt.id)}
                        style={{
                          padding: "5px 10px",
                          marginRight: "5px",
                          background: "#ff6b81",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      style={{
                        padding: "5px 10px",
                        background: "#1e90ff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/reschedule/${appt.id}`)}
                    >
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Book Appointment Button */}
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#2ed573",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={bookAppointment}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
