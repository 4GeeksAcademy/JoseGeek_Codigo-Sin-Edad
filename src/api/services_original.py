"""Servicios para la API."""
import re
from sqlalchemy.exc import DataError
from flask import jsonify, request
from .models import Usuario, db


def validar_email(email):
    """Validar el formato del email."""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None


def validar_password(password):
    """Validar la fortaleza de la contraseña."""
    # Ejemplo: Longitud mínima de 8, al menos una letra y un número
    pattern = r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
    return re.match(pattern, password) is not None


def crear_usuario():
    """Crear un usuario"""
    data = request.get_json()

    # Validaciones
    if not data or 'email' not in data or 'password' not in data or 'telefono' not in data:
        return jsonify({"mensaje": "Datos faltantes o incorrectos"}), 400

    if not validar_email(data['email']):
        return jsonify({"mensaje": "Formato de email inválido"}), 400

    if not validar_password(data['password']):
        return jsonify({"mensaje": "Contraseña no cumple con los requisitos"}), 400

    # Crear una nueva instancia de Usuario
    nuevo_usuario = Usuario(
        email=data['email'],
        password=data['password'],
        telefono=data['telefono']
    )
    db.session.add(nuevo_usuario)
    try:
        db.session.commit()
    except DataError:
        db.session.rollback()
        return jsonify({"Error interno": "Error desconocido"}), 500

    return jsonify({"mensaje": "Usuario creado con éxito"}), 201
