# admin adds doctor, doctors update availability
from flask import Blueprint, jsonify
from models import Doctor

doctor_bp = Blueprint("doctor", __name__)

@doctor_bp.route("/", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()
    result = [{"id": d.id, "specialization": d.specialization, "availability": d.availability} for d in doctors]
    return jsonify(result), 200
