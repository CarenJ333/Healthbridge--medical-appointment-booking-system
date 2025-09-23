#login (patients and doctor) register(for patients only)
from flask import Blueprint, request, jsonify
from app import db, bcrypt
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        role=data["role"]
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id, "email": new_user.email}), 201
