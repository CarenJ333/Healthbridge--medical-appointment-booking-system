import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

const AppointmentsPage = () => {
  return (
    <div className="appointments-page">
      <h2>Appointments</h2>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
