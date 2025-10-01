from app import app, db
from models.user import User
from models.doctor import Doctor
from werkzeug.security import generate_password_hash

# Predefined doctors
doctors = [
    {"name": "Dr. John Doe", "email": "john.doe@healthbridge.com", "specialty": "Cardiology"},
    {"name": "Dr. Jane Smith", "email": "jane.smith@healthbridge.com", "specialty": "Dermatology"},
    {"name": "Dr. Michael Brown", "email": "michael.brown@healthbridge.com", "specialty": "Neurology"},
    {"name": "Dr. Emily Davis", "email": "emily.davis@healthbridge.com", "specialty": "Pediatrics"},
    {"name": "Dr. Robert Wilson", "email": "robert.wilson@healthbridge.com", "specialty": "Orthopedics"},
    {"name": "Dr. Susan Taylor", "email": "susan.taylor@healthbridge.com", "specialty": "Oncology"},
]

with app.app_context():
    db.create_all()

    for doc in doctors:
        existing_user = User.query.filter_by(email=doc["email"]).first()
        if not existing_user:
            user = User(
                name=doc["name"],   
                email=doc["email"],
                password=generate_password_hash("doctor123"),
                role="doctor"
            )
            db.session.add(user)
            db.session.flush()  

            doctor = Doctor(
                user_id=user.id,
                specialty=doc["specialty"],
                phone=None,
                bio=None
            )
            db.session.add(doctor)

    # Create 1 sample patient
    if not User.query.filter_by(email="patient1@healthbridge.com").first():
        patient = User(
            name="Patient One",   # <-- give patient a name too
            email="patient1@healthbridge.com",
            password=generate_password_hash("password123"),
            role="patient"
        )
        db.session.add(patient)

    db.session.commit()
    print(" Seed data added successfully (6 doctors + 1 patient)")
