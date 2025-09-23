import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // React Calendar base styles
import "./CalendarComponent.css"; // your own additional styles

const CalendarComponent = () => {
  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar</h2>
      <Calendar />
    </div>
  );
};

export default CalendarComponent;
