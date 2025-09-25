from flask import Blueprint, request, jsonify
from models.appointment import db, Appointment
from models.user import User
from models.doctor import Doctor

appointment_bp = Blueprint("appointment_bp", __name__)

# ---------------------------
# Create an appointment
# ---------------------------
@appointment_bp.route("/", methods=["POST", "OPTIONS"])
def create_appointment():
    if request.method == "OPTIONS":
        return "", 200  # Preflight check for CORS

    data = request.get_json() or {}
    patient_id = data.get("patient_id")
    doctor_id = data.get("doctor_id")
    date = data.get("date")  # "YYYY-MM-DD"
    time = data.get("time")  # "HH:MM:SS"

    patient = User.query.get(patient_id)
    doctor = Doctor.query.get(doctor_id)

    if not patient or not doctor:
        return jsonify({"status": "fail", "message": "Invalid patient or doctor ID"}), 400

    appointment = Appointment(
        patient_id=patient_id,
        doctor_id=doctor_id,
        date=date,
        time=time
    )
    db.session.add(appointment)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Appointment booked successfully",
        "appointment": {
            "id": appointment.id,
            "patient_id": appointment.patient_id,
            "doctor_id": appointment.doctor_id,
            "date": str(appointment.date),
            "time": str(appointment.time),
            "status": appointment.status
        }
    }), 201


# ---------------------------
# Get appointments
# ---------------------------
@appointment_bp.route("/", methods=["GET", "OPTIONS"])
def get_appointments():
    if request.method == "OPTIONS":
        return "", 200

    doctor_id = request.args.get("doctorId")
    patient_id = request.args.get("patientId")

    query = Appointment.query

    if doctor_id:
        query = query.filter_by(doctor_id=doctor_id)
    if patient_id:
        query = query.filter_by(patient_id=patient_id)

    appointments = query.all()
    result = []
    for a in appointments:
        result.append({
            "id": a.id,
            "patient_id": a.patient_id,
            "patient_email": a.patient.email if a.patient else None,  # User has only email
            "doctor_id": a.doctor_id,
            "doctor_name": a.doctor.name if a.doctor else None,       # Doctor model has name
            "doctor_email": a.doctor.email if a.doctor else None,
            "date": str(a.date),
            "time": str(a.time),
            "status": a.status
        })
    return jsonify(result), 200


# ---------------------------
# Update appointment status
# ---------------------------
@appointment_bp.route("/<int:appointment_id>", methods=["PATCH", "OPTIONS"])
def update_appointment(appointment_id):
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json() or {}
    new_status = data.get("status")

    appointment = Appointment.query.get_or_404(appointment_id)

    if new_status:
        appointment.status = new_status
        db.session.commit()

    return jsonify({
        "id": appointment.id,
        "patient_id": appointment.patient_id,
        "doctor_id": appointment.doctor_id,
        "date": str(appointment.date),
        "time": str(appointment.time),
        "status": appointment.status
    }), 200
