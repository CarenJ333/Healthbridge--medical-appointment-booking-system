#entry point
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from routes.auth_routes import auth_bp
    from routes.doctor_routes import doctor_bp
    from routes.appointment_routes import appointment_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(doctor_bp, url_prefix="/doctors")
    app.register_blueprint(appointment_bp, url_prefix="/appointments")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
