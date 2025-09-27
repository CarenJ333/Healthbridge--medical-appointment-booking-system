// src/api/doctorApi.js
import axios from "axios";

const API_URL = "https://healthbridge-medical-appointment-booking-okbi.onrender.com";

export const getDoctors = async () => {
  const res = await axios.get(`${API_URL}/doctors`);
  return res.data;
};

export const updateAvailability = async (doctorId, data) => {
  const res = await axios.put(`${API_URL}/doctors/${doctorId}/availability`, data);
  return res.data;
};
