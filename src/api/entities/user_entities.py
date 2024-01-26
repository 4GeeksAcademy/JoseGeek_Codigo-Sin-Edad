"""Definiendo el modelo de usuario"""
from werkzeug.security import check_password_hash, generate_password_hash


class UserModel():
    """Definiendo el modelo de usuario"""

    def __init__(self, id, email, password, telefono, usuario, es_admin) -> None:
        self.id = id
        self.email = email
        self.password = password
        self.telefono = telefono
        self.usuario = usuario
        self.es_admin = es_admin

    @classmethod
    def check_password(self, hashed_password, password):
        """"Chequea que la contraseña este correcta"""
        return check_password_hash(hashed_password, password)
