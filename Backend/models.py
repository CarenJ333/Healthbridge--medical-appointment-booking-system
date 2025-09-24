# sqlalchemy models(user, doctor, appointment)
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(db.String, nullable=False)  

    appointments = db.relationship("Appointment", back_populates="patient")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
        }


class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    specialization = db.Column(db.String, nullable=False)

    appointments = db.relationship("Appointment", back_populates="doctor")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "specialization": self.specialization,
        }


class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String, default="pending")  

    doctor = db.relationship("Doctor", back_populates="appointments")
    patient = db.relationship("User", back_populates="appointments")

    def to_dict(self):
        return {
            "id": self.id,
            "doctorId": self.doctor_id,
            "patientId": self.patient_id,
            "appointmentTime": (
                self.appointment_time.isoformat()
                if self.appointment_time else None
            ),
            "status": self.status,
            "doctor": self.doctor.to_dict() if self.doctor else None,
            "patient": self.patient.to_dict() if self.patient else None,
        }

