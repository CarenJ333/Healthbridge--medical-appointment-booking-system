import os

class Config:
    # Secret key for sessions
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev")

    # Database (default: SQLite file in this folder)
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///healthbridge.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Enable debug mode for development
    DEBUG = True
