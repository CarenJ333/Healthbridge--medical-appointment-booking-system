import React, { useEffect, useState } from "react";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`https://healthbridge-medical-appointment-booking-okbi.onrender.com/appointments?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err));
  }, [user.id]);
  
  return (
    <div>
      <h3>My Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            {appt.date} at {appt.time} with Dr. {appt.doctor_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
