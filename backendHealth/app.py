from flask import Flask
from flask_cors import CORS
from models.user import db
from routes.auth_routes import auth_bp
from routes.doctor_routes import doctor_bp
from routes.appointment_routes import appointment_bp
from config import Config   # import your Config class

app = Flask(__name__)
app.config.from_object(Config)  # load settings from config.py

# Debug: check DB URI
print("DB URI:", app.config["SQLALCHEMY_DATABASE_URI"])

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Initialize database
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(doctor_bp, url_prefix="/doctors")
app.register_blueprint(appointment_bp, url_prefix="/appointments")

@app.route("/")
def home():
    return "HealthBridge Backend with Database is running!"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
