from flask import Flask, request
from flask_cors import CORS
from models.user import db
from routes.auth_routes import auth_bp
from routes.doctor_routes import doctor_bp
from routes.appointment_routes import appointment_bp
import os

app = Flask(__name__)

@app.before_request
def log_request_info():
    print(">>> INCOMING REQUEST:", request.method, request.path, "Host:", request.host)

# --- Config ---
# Avoid redirect issues by setting a secret key and DB path directly
# --- Config ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(BASE_DIR, "instance", "healthbridge.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SECRET_KEY", "dev")

print("DB URI:", app.config["SQLALCHEMY_DATABASE_URI"])

# Enable CORS properly (very important!)
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
