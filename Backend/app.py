#entry point
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Doctor, Appointment
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///healthbridge.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    user = User(
        name=data.get("name"),
        email=data.get("email"),
        role=data.get("role", "patient")  
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201


@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200



@app.route("/doctors", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([doctor.to_dict() for doctor in doctors]), 200


@app.route("/doctors", methods=["POST"])
def create_doctor():
    data = request.get_json()
    doctor = Doctor(
        name=data.get("name"),
        specialization=data.get("specialization")
    )
    db.session.add(doctor)
    db.session.commit()
    return jsonify(doctor.to_dict()), 201


@app.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.get_json()

    try:
        appointment_time = datetime.fromisoformat(data.get("appointmentTime"))
    except Exception:
        return jsonify({"error": "Invalid date format, use ISO8601"}), 400

    appointment = Appointment(
        doctor_id=data.get("doctorId"),
        patient_id=data.get("patientId"),
        appointment_time=appointment_time,
        status=data.get("status", "pending")
    )
    db.session.add(appointment)
    db.session.commit()
    return jsonify(appointment.to_dict()), 201


@app.route("/appointments", methods=["GET"])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([appt.to_dict() for appt in appointments]), 200


@app.route("/appointments/<int:id>", methods=["PATCH"])
def update_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    data = request.get_json()

    if "status" in data:
        appointment.status = data["status"]

    if "appointmentTime" in data:
        try:
            appointment.appointment_time = datetime.fromisoformat(data["appointmentTime"])
        except Exception:
            return jsonify({"error": "Invalid date format, use ISO8601"}), 400

    db.session.commit()
    return jsonify(appointment.to_dict()), 200


@app.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    appointment = Appointment.query.get_or_404(id)
    db.session.delete(appointment)
    db.session.commit()
    return jsonify({"message": "Appointment deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)

