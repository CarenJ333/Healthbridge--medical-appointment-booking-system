import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // 🔹 Current: Fake login
    if (email === "doctor@example.com" && password === "123456") {
      setUser({ name: "Dr. Smith", role: "doctor" });
    } else if (email === "patient@example.com" && password === "123456") {
      setUser({ name: "Mary Jane", role: "patient" });
    } else {
      alert("Invalid credentials!");
    }

    // 🔹 Future: Replace with backend call
    /*
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      // data could be: { name: "Dr. John", role: "doctor" }
      setUser(data);
    } catch (error) {
      alert(error.message);
    }
    */
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
