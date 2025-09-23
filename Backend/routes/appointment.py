# appointment booking and management
from flask import Blueprint, request, jsonify
from app import db
from models import Appointment

appointment_bp = Blueprint("appointments", __name__)

@appointment_bp.route("/", methods=["POST"])
def create_appointment():
    data = request.get_json()
    new_appointment = Appointment(
        patient_id=data["patient_id"],
        doctor_id=data["doctor_id"],
        appointment_time=data["appointment_time"]
    )
    db.session.add(new_appointment)
    db.session.commit()
    return jsonify({"id": new_appointment.id, "status": new_appointment.status}), 201
