import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          HealthBridge
        </Link>

        {/* Links */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About
          </Link>
          <Link to="/services" className="navbar-link">
            Services
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-auth">
          {!user ? (
            <>
              <button
                className="btn btn-register"
                onClick={(e) => {
                  e.preventDefault();
                  if (onRegisterClick) {
                    onRegisterClick();
                  } else {
                    window.location.href = "/register"; // fallback
                  }
                }}
              >
                Register
              </button>

              <button
                className="btn btn-login"
                onClick={(e) => {
                  e.preventDefault();
                  if (onLoginClick) {
                    onLoginClick();
                  } else {
                    window.location.href = "/login"; // fallback
                  }
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              {user.role === "doctor" && (
                <Link to="/doctor-dashboard" className="btn btn-dashboard">
                  Doctor Dashboard
                </Link>
              )}
              {user.role === "patient" && (
                <Link to="/patient-dashboard" className="btn btn-dashboard">
                  Patient Dashboard
                </Link>
              )}
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
