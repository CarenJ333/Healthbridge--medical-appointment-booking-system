import React from "react";
import DoctorCard from "../components/DoctorCard";

const DoctorsPage = () => {
  const doctors = [
    { id: 1, name: "Dr. Smith", specialty: "Cardiologist", availability: "Mon-Fri" },
    { id: 2, name: "Dr. Brown", specialty: "Dermatologist", availability: "Tue-Thu" },
  ];

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {doctors.map((doc) => (
        <DoctorCard key={doc.id} {...doc} />
      ))}
    </div>
  );
};

export default DoctorsPage;
