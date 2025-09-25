from flask_sqlalchemy import SQLAlchemy
from models.user import db

class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctors.id"), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")  # Pending, Confirmed, Cancelled

    # Relationships
    patient = db.relationship("User", backref=db.backref("appointments", lazy=True))
    doctor = db.relationship("Doctor", backref=db.backref("appointments", lazy=True))

    def __repr__(self):
        return f"<Appointment {self.patient.email} with {self.doctor.user.email} on {self.date}>"
