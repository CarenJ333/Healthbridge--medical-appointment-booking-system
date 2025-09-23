import React from "react";
import { useAuth } from "../context/AuthContext";
import PatientDashboard from "../components/PatientDashboard";
import DoctorDashboard from "../components/DoctorDashboard";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Please login first.</p>;
  }

  return (
    <div>
      <header>
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Logout</button>
      </header>

      {user.role === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
    </div>
  );
};

export default DashboardPage;
