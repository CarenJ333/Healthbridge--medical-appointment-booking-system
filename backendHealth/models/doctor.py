from flask_sqlalchemy import SQLAlchemy
from models.user import db

class Doctor(db.Model):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    bio = db.Column(db.Text)

    # Relationship to User
    user = db.relationship("User", backref=db.backref("doctor", uselist=False))

    def __repr__(self):
        return f"<Doctor id={self.id} email={self.user.email} specialty={self.specialty}>"
