import React from "react";

const DoctorCard = ({ name, specialty, availability }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="font-bold">{name}</h3>
      <p>Specialty: {specialty}</p>
      <p>Availability: {availability}</p>
    </div>
  );
};

export default DoctorCard;
