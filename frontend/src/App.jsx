import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";   
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppointmentPage from "./pages/AppointmentPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <h2>Unauthorized - You don’t have access</h2>;
  }

  return children;
}

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app-container">
      <Navbar />

      <div className="content-wrap">
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/appointment-page" element={<AppointmentPage />} />
          <Route path="/availability-page" element={<AvailabilityPage />} />

          {/* Role-based dashboards */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard user={storedUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard user={storedUser} />
              </ProtectedRoute>
            }
          />

          {/* Extra pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>

      <Footer /> 
    </div>
  );
};

export default App;
