import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://healthbridge-medical-appointment-booking-okbi.onrender.com/appointments/";
const DOCTORS_URL = "http://healthbridge-medical-appointment-booking-okbi.onrender.com/doctors/";


const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch appointments & doctors
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Fetch patient's appointments
    const fetchAppointments = async () => {
      try {
        const res = await fetch(API_URL + "?patientId=" + user.id);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all doctors
    const fetchDoctors = async () => {
      try {
        const res = await fetch(DOCTORS_URL);
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        // Ensure name is always present
        const formatted = data.map((d) => ({
          ...d,
          name: d.name || "Unknown",
        }));
        setDoctors(formatted);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, [user]);

  // Cancel appointment
  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`${API_URL}${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Canceled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel appointment");

      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? updated : a))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Book new appointment
const bookAppointment = async () => {
  if (!user || !selectedDoctor || !date || !time) {
    alert("Please fill all fields.");
    return;
  }

  const newAppointment = {
    doctor_id: parseInt(selectedDoctor, 10),
    patient_id: user.id,
    date,
    time,
    status: "Pending",
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    });
    if (!res.ok) throw new Error("Failed to book appointment");

    const data = await res.json();
    const appt = data.appointment; // <-- extract from nested object

    // Map doctor name from doctors array
    const doctorName = doctors.find(d => d.id === appt.doctor_id)?.name || "Unknown";

    setAppointments((prev) => [
      ...prev,
      {
        id: appt.id,
        patient_id: appt.patient_id,
        doctor_name: doctorName,  // <- use doctor_name here
        date: appt.date,
        time: appt.time,
        status: appt.status,
      },
    ]);

    // Reset form
    setSelectedDoctor("");
    setDate("");
    setTime("");
  } catch (err) {
    alert(err.message);
  }
};


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
  if (!user) return <p>Please login first.</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const displayName = user.name || user.email || "Guest";

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
          <h2 style={{ marginBottom: "30px", fontSize: "20px", fontWeight: "bold" }}>
            Patient Dashboard
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
        <h1 style={{ marginBottom: "20px" }}>Welcome, {displayName}!</h1>

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

        {/* Appointments Table */}
        <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "20px" }}>My Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
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
                    <td style={{ padding: "10px" }}>{appt.doctor_name}</td>
                    <td style={{ padding: "10px" }}>{appt.date}</td>
                    <td style={{ padding: "10px" }}>{appt.time}</td>
                    <td style={{ padding: "10px", color: getStatusColor(appt.status), fontWeight: "bold" }}>
                      {appt.status}
                    </td>
                    <td style={{ padding: "10px" }}>
                      {appt.status !== "Canceled" && (
                        <button
                          onClick={() => cancelAppointment(appt.id)}
                          style={{
                            padding: "5px 10px",
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Book Appointment Form */}
          <div style={{ marginTop: "30px" }}>
            <h3>Book Appointment</h3>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <button
              onClick={bookAppointment}
              style={{
                padding: "5px 15px",
                background: "#2ed573",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
