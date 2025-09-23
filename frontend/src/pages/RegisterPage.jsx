import React, { useState } from "react";
import "../App.css"; // create this CSS file

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    console.log("Registered:", form);
    alert(`Registered: ${form.name}`);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="register-input"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="register-input"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="register-input"
        onChange={handleChange}
      />
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
