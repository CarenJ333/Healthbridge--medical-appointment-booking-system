# appointment booking and management
from flask import Blueprint, request, jsonify
from datetime import datetime
from models import db, Appointment

appointments_bp = Blueprint("appointments", __name__, url_prefix="/appointments")

@appointments_bp.route("", methods=["POST"])
def create_appointment():
    data = request.get_json()
    try:
        appointment_time = datetime.fromisoformat(data["appointmentTime"])
    except Exception:
        return jsonify({"error": "Invalid date format"}), 400

    new_appt = Appointment(
        doctor_id=data["doctorId"],
        patient_id=data["patientId"],
        appointment_time=appointment_time
    )
    db.session.add(new_appt)
    db.session.commit()
    return jsonify(new_appt.to_dict()), 201


@appointments_bp.route("", methods=["GET"])
def list_appointments():
    doctor_id = request.args.get("doctorId")
    patient_id = request.args.get("patientId")

    query = Appointment.query
    if doctor_id:
        query = query.filter_by(doctor_id=doctor_id)
    if patient_id:
        query = query.filter_by(patient_id=patient_id)

    return jsonify([appt.to_dict() for appt in query.all()]), 200


@appointments_bp.route("/<int:id>", methods=["PATCH"])
def update_appointment(id):
    appt = Appointment.query.get_or_404(id)
    data = request.get_json()
    if "status" in data:
        appt.status = data["status"]
        db.session.commit()
    return jsonify(appt.to_dict()), 200

