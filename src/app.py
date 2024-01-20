"""Aplicacion principal"""
import os
from MySQLdb import DataError, IntegrityError
from werkzeug.security import generate_password_hash
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy.orm import Session
from config import db
from flask_migrate import Migrate
from api.models import Usuario, Comentario, Tema
from api.services_original import crear_usuario
from api.services.login_authentication import UserAuthetication
from api.entities.user_entities import UserModel


app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}}) # Solititudes de cualquier origen al path de api
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:alejo@localhost:3308/comunidad_geek'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
# @cross_origin()
def home():
    """Ruta principal de la aplicación."""
    usuarios = Usuario.query.all()
    return str(usuarios)


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        if "email" not in data or "password" not in data or "telefono" not in data:
            return jsonify({"msg": "Faltan datos de email, password o teléfono"}), 400

        if len(data["email"]) > 255:
            return jsonify({"msg": "El email es más largo de lo permitido"}), 400
        if len(data["password"]) > 60:
            return jsonify({"msg": "La contraseña es más larga de lo permitido"}), 400
        if len(str(data["telefono"])) > 15:
            return jsonify({"msg": "El teléfono es más largo de lo permitido"}), 400

        existing_user = db.session.query(Usuario).filter(
            Usuario.email == data["email"]).first()

        if existing_user:
            return jsonify({"msg": "El usuario ya existe"}), 401

        hashed_password = generate_password_hash(
            data["password"], method='pbkdf2:sha256')
        new_user = Usuario(
            email=data["email"], password=hashed_password, telefono=data["telefono"])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario Registrado Satisfactoriamente"}), 201

    except DataError as e:
        return jsonify({"msg": "Error en los datos ingresados"}), 500

    except IntegrityError as e:
        return jsonify({"msg": "El usuario ya existe"}), 500

    except Exception as e:
        return jsonify({"msg": "Error en codigo: {}".format(e)}), 500


@app.route("/login", methods=["POST"])
def route_login():
    data = request.json
    if "email" not in data or "password" not in data:
        return jsonify({"msg": "Falta el correo o la contraseña"}), 400

    user = UserModel(0, data["email"], data["password"], 0)
    # Busca al usuario en la base de datos
    session = Session()

    #   Buscar al usuario en la base de datos
    existing_user = db.session.query(Usuario).filter(
        Usuario.email == data["email"]).first()

    if existing_user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 401

    logged_user = UserAuthetication.login(user)

    if logged_user is None:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    return jsonify({"msg": "Login perfecto", "user": logged_user.email, "telefono": logged_user.telefono, "id": logged_user.id}), 200


@app.route('/add_comment', methods=['POST'])
def add_comment():
    try:
        data = request.json
        if "contenido" not in data or "usuario_id" not in data or "tema_id" not in data:
            return jsonify({"msg": "Faltan datos de contenido, usuario_id o tema_id"}), 400

        existing_user = db.session.query(Usuario).filter(
            Usuario.id == data["usuario_id"]).first()
        if not existing_user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        existing_tema = db.session.query(Tema).filter(
            Tema.id == data["tema_id"]).first()
        if not existing_tema:
            return jsonify({"msg": "Tema no encontrado"}), 404

        # Crea y guarda el nuevo comentario
        new_comment = Comentario(
            contenido=data["contenido"],
            usuario_id=data["usuario_id"],
            tema_id=data["tema_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({"msg": "Comentario añadido satisfactoriamente"}), 201

    except DataError as e:
        return jsonify({"msg": "Error en los datos ingresados"}), 500

    except IntegrityError as e:
        return jsonify({"msg": "Error de integridad de datos"}), 500

    except Exception as e:
        return jsonify({"msg": "Error en código: {}".format(e)}), 500


@app.route('/comments', methods=['GET'])
def get_comments():
    try:
        comentarios = Comentario.query.filter_by(activo=True).all()

        comentarios_list = [
            {"id": comentario.id, "contenido": comentario.contenido,
             "fecha_creacion": comentario.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
             "usuario_id": comentario.usuario_id, "tema_id": comentario.tema_id}
            for comentario in comentarios
        ]

        return jsonify(comentarios_list), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener los comentarios: {}".format(e)}), 500


@app.route('/comment/<int:comentario_id>', methods=['GET'])
def get_comment(comentario_id):
    try:
        comentario = Comentario.query.filter_by(
            id=comentario_id, activo=True).first()

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        comentario_data = {
            "id": comentario.id,
            "contenido": comentario.contenido,
            "fecha_creacion": comentario.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
            "usuario_id": comentario.usuario_id,
            "tema_id": comentario.tema_id
        }

        return jsonify(comentario_data), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener el comentario: {}".format(e)}), 500


@app.route('/update_comment/<int:comentario_id>', methods=['PUT'])
def update_comment(comentario_id):
    try:
        data = request.json
        comentario = Comentario.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        if comentario.usuario_id != data.get("usuario_id"):
            return jsonify({"msg": "No autorizado para actualizar este comentario"}), 403

        comentario.contenido = data.get("contenido", comentario.contenido)
        db.session.commit()

        return jsonify({"msg": "Comentario actualizado satisfactoriamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al actualizar el comentario: {}".format(e)}), 500


@app.route('/delete_comment/<int:comentario_id>', methods=['DELETE'])
def delete_comment(comentario_id):
    try:
        comentario = Comentario.query.get(comentario_id)

        if not comentario:
            return jsonify({"msg": "Comentario no encontrado"}), 404

        user_id = request.json.get("usuario_id")
        user = Usuario.query.get(user_id)
        if not user or (comentario.usuario_id != user_id and not user.es_admin):
            return jsonify({"msg": "No autorizado para eliminar este comentario"}), 403

        # Eliminar el comentario (soft delete)
        comentario.activo = False
        db.session.commit()

        return jsonify({"msg": "Comentario eliminado satisfactoriamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al eliminar el comentario: {}".format(e)}), 500


@app.route('/temas', methods=['GET'])
def get_temas():
    try:
        temas = Tema.query.filter_by(activo=True).all()
        temas_list = [
            {"id": tema.id, "titulo": tema.titulo, "contenido": tema.contenido,
             "fecha_creacion": tema.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
             "usuario_id": tema.usuario_id}
            for tema in temas
        ]

        return jsonify(temas_list), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener los temas: {}".format(e)}), 500


@app.route('/tema/<int:tema_id>', methods=['GET'])
def get_tema(tema_id):
    try:
        tema = Tema.query.filter_by(id=tema_id, activo=True).first()

        if not tema:
            return jsonify({"msg": "Tema no encontrado"}), 404

        tema_data = {
            "id": tema.id,
            "titulo": tema.titulo,
            "contenido": tema.contenido,
            "fecha_creacion": tema.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
            "usuario_id": tema.usuario_id
        }

        return jsonify(tema_data), 200

    except Exception as e:
        return jsonify({"msg": "Error al obtener el tema: {}".format(e)}), 500


@app.route('/create_tema', methods=['POST'])
def create_tema():
    try:
        data = request.json
        nuevo_tema = Tema(
            titulo=data["titulo"],
            contenido=data["contenido"],
            usuario_id=data["usuario_id"]
        )
        db.session.add(nuevo_tema)
        db.session.commit()

        return jsonify({"msg": "Tema creado satisfactoriamente", "tema_id": nuevo_tema.id}), 201

    except Exception as e:
        return jsonify({"msg": "Error al crear el tema: {}".format(e)}), 500


@app.route('/update_tema/<int:tema_id>', methods=['PUT'])
def update_tema(tema_id):
    try:
        data = request.json
        tema = Tema.query.get(tema_id)

        if not tema:
            return jsonify({"msg": "Tema no encontrado"}), 404

        if tema.usuario_id != data["usuario_id"]:
            return jsonify({"msg": "No autorizado para actualizar este tema"}), 403

        tema.titulo = data.get("titulo", tema.titulo)
        tema.contenido = data.get("contenido", tema.contenido)
        db.session.commit()

        return jsonify({"msg": "Tema actualizado satisfactoriamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al actualizar el tema: {}".format(e)}), 500


@app.route('/delete_tema/<int:tema_id>', methods=['DELETE'])
def delete_tema(tema_id):
    try:
        tema = Tema.query.get(tema_id)

        if not tema:
            return jsonify({"msg": "Tema no encontrado"}), 404

        user_id = request.json.get("usuario_id")
        user = Usuario.query.get(user_id)
        if not user or (tema.usuario_id != user_id and not user.es_admin):
            return jsonify({"msg": "No autorizado para eliminar este tema"}), 403

        # Soft delete
        tema.activo = False
        db.session.commit()

        return jsonify({"msg": "Tema eliminado satisfactoriamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al eliminar el tema: {}".format(e)}), 500


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
