from flask import Blueprint, jsonify, request
from models.appointment import Appointment
from datetime import datetime


appointment_bp = Blueprint("appointment_bp", __name__)

@appointment_bp.route("/", methods=["GET", "POST","PATCH", "OPTIONS"])
def handle_appointments():
    if request.method == "OPTIONS":
        return "", 200

    # ---------------------------
    # GET appointments
    # ---------------------------
    if request.method == "GET":
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
                "patient_email": a.patient.email if a.patient else None,
                "doctor_id": a.doctor_id,
                "doctor_name": a.doctor.user.name if a.doctor and a.doctor.user else a.doctor.user.email,
                "date": str(a.date),
                "time": str(a.time),
                "status": a.status
            })
        return jsonify(result), 200

    # ---------------------------
    # POST new appointment
    # ---------------------------
    if request.method == "POST":
        data = request.get_json()

        date_obj = datetime.strptime(data["date"], "%Y-%m-%d").date()
        time_obj = datetime.strptime(data["time"], "%H:%M").time()  # <- convert time string to time object


        new_appt = Appointment(
            doctor_id=data["doctor_id"],
            patient_id=data["patient_id"],
            date=date_obj,
            time=time_obj,
            status=data.get("status", "Pending")
        )
        from models.user import db
        db.session.add(new_appt)
        db.session.commit()

        # return the created appointment
        return jsonify({
            "appointment": {
                "id": new_appt.id,
                "doctor_id": new_appt.doctor_id,
                "patient_id": new_appt.patient_id,
                "date": str(new_appt.date),
                "time": str(new_appt.time),
                "status": new_appt.status
            }
        }), 201

    # ---------------------------
    # PATCH appointment (cancel)
    # ---------------------------
@appointment_bp.route("/<int:appt_id>", methods=["PATCH"])
def update_appointment(appt_id):
    data = request.get_json()
    appt = Appointment.query.get(appt_id)
    if not appt:
        return jsonify({"error": "Appointment not found"}), 404

    if "status" in data:
        appt.status = data["status"]

    from models.user import db
    db.session.commit()

    return jsonify({
        "id": appt.id,
        "doctor_id": appt.doctor_id,
        "patient_id": appt.patient_id,
        "date": str(appt.date),
        "time": str(appt.time),
        "status": appt.status
    }), 200
