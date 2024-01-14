"""Definiendo el modelo de usuario"""
from werkzeug.security import check_password_hash, generate_password_hash


class UserModel():
    """Definiendo el modelo de usuario"""

    def __init__(self, id, email, password, telefono) -> None:
        self.id = id
        self.email = email
        self.password = password
        self.telefono = telefono

    @classmethod
    def check_password(self, hashed_password, password):
        """"Chequea que la contraseña este correcta"""
        return check_password_hash(hashed_password, password)
