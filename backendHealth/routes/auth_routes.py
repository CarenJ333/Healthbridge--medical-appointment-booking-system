from flask import Blueprint, request, jsonify
from models.user import db, User
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth", __name__)

# ---------------------------
# Register a new user
# ---------------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"status": "error", "message": "User already exists"}), 409

    # Doctor emails already seeded
    doctor_emails = [
        "john.doe@healthbridge.com",
        "jane.smith@healthbridge.com",
        "michael.brown@healthbridge.com",
        "emily.davis@healthbridge.com",
        "robert.wilson@healthbridge.com",
        "susan.taylor@healthbridge.com",
    ]
    role = "doctor" if email in doctor_emails else "patient"

    # Default name: prefix of email
    default_name = email.split("@")[0]

    new_user = User(
        email=email,
        password=generate_password_hash(password),
        role=role,
        name=default_name  # <-- important: avoids missing "name"
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": f"User registered successfully as {role}",
        "id": new_user.id,
        "email": new_user.email,
        "role": new_user.role,
        "name": new_user.name,
    }), 201


# ---------------------------
# Login
# ---------------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401

    return jsonify({
        "status": "success",
        "message": "Login successful",
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "name": user.name or user.email.split("@")[0],  # fallback if name missing
    }), 200
