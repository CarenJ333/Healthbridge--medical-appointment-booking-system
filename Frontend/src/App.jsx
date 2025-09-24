import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/appointments">Book Appointment</Link> |{" "}
        <Link to="/availability">Set Availability</Link> |{" "}
        <Link to="/services">Services</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>

      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to HealthBridge</h1>} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Dashboard route - here we pass a mock user object (id + role) 
    Later: replace with real authentication (patient/doctor) */}
        <Route path="/dashboard" element={<DashboardPage user={{ id: 1, role: "patient" }} />} />

      </Routes>
    </Router>
  );
}

export default App;
