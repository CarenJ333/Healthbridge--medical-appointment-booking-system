# admin adds doctor, doctors update availability
from flask import Blueprint, jsonify
from models import Doctor

doctors_bp = Blueprint("doctors", __name__, url_prefix="/doctors")

@doctors_bp.route("", methods=["GET"])
def list_doctors():
    return jsonify([doc.to_dict() for doc in Doctor.query.all()]), 200

@doctors_bp.route("/<int:id>", methods=["GET"])
def doctor_profile(id):
    doc = Doctor.query.get_or_404(id)
    return jsonify(doc.to_dict()), 200

