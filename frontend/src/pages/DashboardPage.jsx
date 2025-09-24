import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import DoctorDashboard from "../components/DoctorDashboard";
import PatientDashboard from "../components/PatientDashboard";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Please login first.</p>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <header style={{ marginBottom: "20px" }}>
          <h1>Welcome, {user.name}</h1>
          <button onClick={logout}>Logout</button>
        </header>

        {user.role === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
      </main>
    </div>
  );
};

export default DashboardPage;
