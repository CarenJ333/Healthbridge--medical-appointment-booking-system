import pytest
from app import create_app, db
from flask import json

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client

def test_register_patient(client):
    response = client.post("/auth/register", json={
        "name": "Test Patient",
        "email": "patient@test.com",
        "password": "password",
        "role": "patient"
    })
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data["email"] == "patient@test.com"

def test_doctor_availability_endpoint(client):
    # Example test for doctor endpoint (will require Marshel’s API)
    response = client.get("/doctors")
    assert response.status_code == 200
