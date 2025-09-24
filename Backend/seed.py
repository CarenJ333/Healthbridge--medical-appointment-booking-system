# script to seed database with sample data
from app import app, db
from models import User, Doctor, Appointment
from datetime import datetime, timedelta

with app.app_context():
    db.drop_all()
    db.create_all()

    # Users
    admin = User(username="admin", email="admin@gmail.com", is_admin=True)
    admin.set_password("adminpass")
    user1 = User(username="Alice", email="alice@gmail.com"); user1.set_password("alicepass")
    user2 = User(username="Bob", email="bob@gmail.com"); user2.set_password("bobpass")
    user3 = User(username="Charlie", email="charlie@gmail.com"); user3.set_password("charliepass")
    user4 = User(username="Diana", email="diana@gmail.com"); user4.set_password("dianapass")
    user5 = User(username="Earnest", email="earnest@gmail.com"); user5.set_password("earnestpass")
    user6 = User(username="Caren", email="caren@gmail.com"); user6.set_password("carenpass")
    user7 = User(username="Fredrick", email="fredrick@gmail.com"); user7.set_password("fredrickpass")
    user8 = User(username="Marshel", email="marshel@gmail.com"); user8.set_password("marshelpass")

    # Doctors
    d1 = Doctor(name="Dr. Grace", specialty="Cardiology", available=True, contact_email="grace@clinic.com")
    d2 = Doctor(name="Dr. Omar", specialty="General", available=True, contact_email="omar@clinic.com")

    db.session.add_all([admin, user1, user2, user3, user4, user5, user6, user7, user8, d1, d2])
    db.session.commit()

    # Appointments for all users
    ap1 = Appointment(patient_id=user1.id, doctor_id=d1.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=2),
                      reason="Checkup")

    ap2 = Appointment(patient_id=user2.id, doctor_id=d2.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=3),
                      reason="Flu symptoms")

    ap3 = Appointment(patient_id=user3.id, doctor_id=d1.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=4),
                      reason="Headache consultation")

    ap4 = Appointment(patient_id=user4.id, doctor_id=d2.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=5),
                      reason="Follow-up")

    ap5 = Appointment(patient_id=user5.id, doctor_id=d1.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=6),
                      reason="Chest pain")

    ap6 = Appointment(patient_id=user6.id, doctor_id=d2.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=7),
                      reason="Fever")

    ap7 = Appointment(patient_id=user7.id, doctor_id=d1.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=8),
                      reason="Back pain")

    ap8 = Appointment(patient_id=user8.id, doctor_id=d2.id,
                      scheduled_at=datetime.utcnow() + timedelta(days=9),
                      reason="Routine check")

    db.session.add_all([ap1, ap2, ap3, ap4, ap5, ap6, ap7, ap8])
    db.session.commit()

    print("Seed complete: 8 users, 2 doctors, 8 appointments.")
