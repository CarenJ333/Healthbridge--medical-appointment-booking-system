import React from "react";
import Sidebar from "./Sidebar";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

const Dashboard = ({ role }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        {role === "doctor" ? <DoctorDashboard /> : <PatientDashboard />}
      </main>
    </div>
  );
};

export default Dashboard;
