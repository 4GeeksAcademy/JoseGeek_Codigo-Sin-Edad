"""Aplicacion principal"""
import os
from sqlalchemy.exc import DataError, IntegrityError
from werkzeug.security import generate_password_hash
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy.orm import Session
from config import db
import secrets
import string
from flask_migrate import Migrate
import smtplib
from email.mime.text import MIMEText
from api.models import Usuario, Comentario, Tema
from api.services_original import crear_usuario
from api.services.login_authentication import UserAuthetication
from api.entities.user_entities import UserModel


app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "*"}}) # Solititudes de cualquier origen al path de api
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgresql_trapezoidal_42170_19vm_user:jIqO6ex4K9DQMrDg4S6NxzUjDTTn6tYo@dpg-cmq0l9mg1b2c73d2qo7g-a/postgresql_trapezoidal_42170_19vm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"


@app.route('/')
def sitemap():
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        if "email" not in data or "password" not in data or "telefono" not in data or "usuario" not in data:
            return jsonify({"msg": "Faltan datos de email, password, usuario o teléfono"}), 400

        if len(data["email"]) > 255:
            return jsonify({"msg": "El email es más largo de lo permitido"}), 400
        if len(data["password"]) > 60:
            return jsonify({"msg": "La contraseña es más larga de lo permitido"}), 400
        if len(str(data["telefono"])) > 15:
            return jsonify({"msg": "El teléfono es más largo de lo permitido"}), 400

        existing_email = db.session.query(Usuario).filter(
            Usuario.email == data["email"]).first()

        existing_user = db.session.query(Usuario).filter(
            Usuario.usuario == data["usuario"]).first()

        if existing_email:
            return jsonify({"msg": "El usuario con este email ya existe"}), 401

        if existing_user:
            return jsonify({"msg": "El nombre de usuario ya existe ya existe"}), 401

        hashed_password = generate_password_hash(
            data["password"], method='pbkdf2:sha256')
        new_user = Usuario(
            email=data["email"], password=hashed_password, telefono=data["telefono"], usuario=data["usuario"])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"id": new_user.id,  # Asumiendo que Usuario tiene un atributo 'id'
                        "email": new_user.email,
                        "telefono": new_user.telefono,
                        "usuario": new_user.usuario}), 201

    except DataError as e:
        return jsonify({"msg": "Error en los datos ingresados"}), 500

    except IntegrityError as e:
        return jsonify({"msg": "El usuario ya existe"}), 500

    except Exception as e:
        return jsonify({"msg": "Error en codigo: {}".format(e)}), 500


def generate_random_password(length):
    if length < 8:  # Asegúrate de que la longitud de la contraseña sea suficiente para la seguridad
        raise ValueError("La contraseña debe tener al menos 8 caracteres")

    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password


@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get("email")
    if not email:
        return jsonify({"msg": "Email es requerido"}), 400

    user = Usuario.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Generar nueva contraseña
    # Aquí deberías generar una contraseña segura
    new_password = generate_random_password(12)
    hashed_password = generate_password_hash(
        new_password, method='pbkdf2:sha256')

    # Actualizar contraseña en la base de datos
    user.password = hashed_password
    db.session.commit()

    # Enviar correo con nueva contraseña
    try:
        msg = MIMEText(
            f"Has solicitado cambiar tu contraseña. Tu nueva contraseña es: {new_password}")
        msg['Subject'] = "Recuperación de Contraseña"
        msg['From'] = 'geekcomunity@geek.com'
        msg['To'] = email

        # Configurar servidor SMTP
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login('comunidadgeek78@gmail.com', 'fxkh pcpn yiop nlgh')
        s.sendmail('comunidadgeek78@gmail.com', [email], msg.as_string())
        s.quit()
    except Exception as e:
        return jsonify({"msg": f"Error al enviar correo: {e}"}), 500

    return jsonify({"msg": "Se ha enviado una nueva contraseña a tu correo"}), 200


@app.route("/login", methods=["POST"])
def route_login():
    data = request.json
    if "email" not in data or "password" not in data:
        return jsonify({"msg": "Falta el correo o la contraseña"}), 400

    user = UserModel(0, data["email"], data["password"], 0, 0, 0)
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

    return jsonify({"msg": "Login perfecto", "email": logged_user.email, "telefono": logged_user.telefono, "id": logged_user.id, "usuario": logged_user.usuario, "es_admin": logged_user.es_admin}), 200


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
            {"id": comentario.id,
             "contenido": comentario.contenido,
             "fecha_creacion": comentario.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
             "usuario_id": comentario.usuario_id,
             "usuario": comentario.usuario.usuario,  # Accediendo al nombre de usuario
             "tema_id": comentario.tema_id}
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

        usuario_actual = Usuario.query.get(data.get("usuario_id"))

        if not usuario_actual:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        if comentario.usuario_id != data.get("usuario_id") and not usuario_actual.es_admin:
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
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Permitir que los administradores o el propio usuario eliminen el comentario
        if comentario.usuario_id != user_id and not user.es_admin:
            return jsonify({"msg": "No autorizado para eliminar este comentario"}), 403

        comentario.activo = False
        db.session.commit()

        return jsonify({"msg": "Comentario eliminado satisfactoriamente"}), 200

    except Exception as e:
        return jsonify({"msg": "Error al eliminar el comentario: {}".format(e)}), 500


@app.route('/temas', methods=['GET'])
def get_temas():
    try:
        temas = Tema.query.join(Usuario).filter(Tema.activo == True).all()
        temas_list = [
            {
                "id": tema.id,
                "titulo": tema.titulo,
                "contenido": tema.contenido,
                "fecha_creacion": tema.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S'),
                "usuario_id": tema.usuario_id,
                "nombre_usuario": tema.usuario.usuario  # Obtén el nombre de usuario
            }
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

        usuario_actual = Usuario.query.get(data.get("usuario_id"))
        if not usuario_actual:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Permitir que los administradores o el propio usuario actualicen el tema
        if tema.usuario_id != usuario_actual.id and not usuario_actual.es_admin:
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
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Permitir que los administradores o el propio usuario eliminen el tema
        if tema.usuario_id != user_id and not user.es_admin:
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
