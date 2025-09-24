import { useState, useEffect } from "react";

export default function DashboardPage({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (user.role === "patient") {
      // Fetch appointments for this patient
      fetch(`/api/appointments?patientId=${user.id}`)
        .then(res => res.json())
        .then(data => setAppointments(data));
    } else if (user.role === "doctor") {
      // Fetch doctor's availability
      fetch(`/api/availability?doctorId=${user.id}`)
        .then(res => res.json())
        .then(data => setAvailability(data));

      // Fetch doctor's booked appointments
      fetch(`/api/appointments?doctorId=${user.id}`)
        .then(res => res.json())
        .then(data => setAppointments(data));
    }
  }, [user]);

  return (
    <div className="page-container">
      <h1>{user.role === "patient" ? "Patient Dashboard" : "Doctor Dashboard"}</h1>

      {user.role === "patient" && (
        <>
          <h2>Your Appointments</h2>
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                Appointment with {a.doctorName} on {a.date} at {a.time}
              </li>
            ))}
          </ul>
        </>
      )}

      {user.role === "doctor" && (
        <>
          <h2>Your Availability</h2>
          <ul>
            {availability.map((av) => (
              <li key={av.id}>
                {av.day}: {av.start_time} - {av.end_time}
              </li>
            ))}
          </ul>

          <h2>Your Appointments</h2>
          <ul>
            {appointments.map((a) => (
              <li key={a.id}>
                Appointment with {a.patientName} on {a.date} at {a.time}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
