// pages/AppointmentPage.jsx
import AppointmentForm from "../components/AppointmentForm";

export default function AppointmentPage() {
  return (
    <div>
      <h1 style= {{ textAlign: "center", marginBottom: "20px" }}>Book Appointment</h1>
      <AppointmentForm />
    </div>
  );
}
