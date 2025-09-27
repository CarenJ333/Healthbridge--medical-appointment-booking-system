// src/api/appointmentApi.js
import axios from "axios";

const API_URL = "http://healthbridge-medical-appointment-booking-okbi.onrender.com";


export const bookAppointment = async (appointmentData) => {
  const res = await axios.post(`${API_URL}/appointments`, appointmentData);
  return res.data;
};

export const getAppointments = async () => {
  const res = await axios.get(`${API_URL}/appointments`);
  return res.data;
};
