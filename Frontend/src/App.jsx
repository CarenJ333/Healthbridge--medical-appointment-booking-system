import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppointmentPage from "./pages/AppointmentPage";
import AvailabilityPage from "./pages/AvailabilityPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/appointments">Book Appointment</Link> |{" "}
        <Link to="/availability">Set Availability</Link>
      </nav>

      <Routes>
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
