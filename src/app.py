"""Aplicacion principal"""
import os
from flask import Flask, request, jsonify
from .config import db
from flask_migrate import Migrate
from .api.models import Usuario
from .api.services_original import crear_usuario
from .api.services.login_authentication import UserAuthetication
from .api.entities.user_entities import UserModel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:alejo@localhost:3308/comunidad_geek'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def home():
    """Ruta principal de la aplicación."""
    usuarios = Usuario.query.all()
    return str(usuarios)


@app.route('/crear_usuario', methods=['POST'])
def route_crear_usuario():
    """Ruta para crear un usuario."""
    return crear_usuario()


@app.route("/login", methods=["POST"])
def route_login():
    data = request.json  # Cambia request.form a request.json
    user = UserModel(0, data["email"], data["password"], 0)
    logged_user = UserAuthetication.login(db, user)
    if logged_user is not None:
        if logged_user.password:
            return jsonify({"msg": "Login succeeded", "user": logged_user.email, "password": logged_user.password, "telefono": logged_user.telefono}), 200
    else:
        return jsonify({"msg": "Bad username or password"})


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
