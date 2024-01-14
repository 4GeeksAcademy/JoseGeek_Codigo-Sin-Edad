from ..entities.user_entities import UserModel
from ...config import db


class UserAuthetication:

    @classmethod
    def login(cls, usuario):
        """Metodo de login"""
        try:
            user = db.session.query(Usuario).filter_by(
                email=usuario.email).first()
            if user is not None and UserModel.check_password(user.password, usuario.password):
                # Crear un objeto UserModel con los datos del usuario
                logged_user = UserModel(
                    user.id, user.email, user.password, user.telefono)
                return logged_user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
