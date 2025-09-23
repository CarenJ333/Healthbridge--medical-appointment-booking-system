# sqlalchemy models(user, doctor, appointment)
from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  

    doctor_profile = db.relationship("Doctor", backref="user", uselist=False)
    appointments = db.relationship("Appointment", backref="patient", lazy=True)

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    availability = db.Column(db.String(200)) 

    appointments = db.relationship("Appointment", backref="doctor", lazy=True)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id"), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    status = db.Column(db.String(20), default="pending")  
