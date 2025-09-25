import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Point directly to the instance folder
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "instance", "healthbridge.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "dev"
