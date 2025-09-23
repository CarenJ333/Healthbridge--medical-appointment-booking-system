import React, { useState } from "react";

const AppointmentForm = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")); // logged in patient

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: user.id, // your backend must send this at login
          doctor_id: doctor,
          date,
          time,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
      } else {
        setMessage(data.message || "Error booking appointment");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Book an Appointment</h3>
      <label>Doctor</label>
      <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required>
        <option value="">-- Select Doctor --</option>
        <option value="1">Dr. Smith - Cardiologist</option>
        <option value="2">Dr. Lee - Dermatologist</option>
      </select>

      <label>Date</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <label>Time</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

      <button type="submit">Book</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AppointmentForm;
