import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔹 Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await fetch(
      "https://healthbridge-medical-appointment-booking-okbi.onrender.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Login failed");
    }

    const data = await response.json();

    // 🔹 Shape user object
    const newUser = {
      id: data.id,
      name: data.name || data.email.split("@")[0],
      email: data.email,
      role: data.role,
    };

    // 🔹 This triggers saving to localStorage (thanks to useEffect above)
    setUser(newUser);
  };

  const logout = () => {
    setUser(null); // localStorage is cleared automatically by useEffect
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
