"""Definicion de modelos"""
from config import db
from werkzeug.security import check_password_hash, generate_password_hash


class Usuario(db.Model):
    """Definiendo el modelo de usuario"""
    id = db.Column(db.Integer, primary_key=True)
    telefono = db.Column(db.BigInteger, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    es_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Usuario id={self.id} email={self.email}>"

    @classmethod
    def check_password(self, hashed_password, password):
        """Chequea que la contraseña este correcta"""
        return check_password_hash(hashed_password, password)


class Tema(db.Model):
    """Definiendo el modelo de tema"""
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(
        db.DateTime, default=db.func.current_timestamp())
    usuario_id = db.Column(db.Integer, db.ForeignKey(
        'usuario.id'), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    usuario = db.relationship(
        'Usuario', backref=db.backref('temas', lazy=True))

    def __repr__(self):
        return f"<Tema id={self.id} titulo={self.titulo}>"


class Comentario(db.Model):
    """Definiendo el modelo de comentario"""
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.Text, nullable=False)
    fecha_creacion = db.Column(
        db.DateTime, default=db.func.current_timestamp())
    usuario_id = db.Column(db.Integer, db.ForeignKey(
        'usuario.id'), nullable=False)
    tema_id = db.Column(db.Integer, db.ForeignKey('tema.id'), nullable=False)
    activo = db.Column(db.Boolean, default=True)

    usuario = db.relationship(
        'Usuario', backref=db.backref('comentarios', lazy=True))
    tema = db.relationship(
        'Tema', backref=db.backref('comentarios', lazy=True))

    def __repr__(self):
        return f"<Comentario id={self.id}>"
