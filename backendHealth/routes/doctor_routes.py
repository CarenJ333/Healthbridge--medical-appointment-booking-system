from flask import Blueprint, jsonify
from models.doctor import Doctor

doctor_bp = Blueprint("doctor_bp", __name__)

# ---------------------------
# Get all doctors
# ---------------------------
@doctor_bp.route("/", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()

    result = [
        {
            "id": d.id,
            "name": getattr(d.user, "name", None),     
            "email": getattr(d.user, "email", None),
            "specialty": d.specialty,
            "phone": d.phone,
            "bio": d.bio
        }
        for d in doctors
    ]

    return jsonify(result), 200
