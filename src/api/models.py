"""Definicion de modelos"""
from ..config import db


class Usuario(db.Model):
    """Definiendo el modelo de usuario"""
    id = db.Column(db.Integer, primary_key=True)
    telefono = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"<Usuario id={self.id} email={self.email}>"
