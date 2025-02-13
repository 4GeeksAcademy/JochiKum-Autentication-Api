"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if None in [email, password]:
        return jsonify({'msg' : 'one or more required fields are missing'}), 400
    check_user = User.query.filter_by(email= email).first()
    if check_user : 
        return jsonify({'msg' : 'an account with this email already exists'}), 409
    user = User(email = email, password = password, is_active = True )
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    response_body = {
        "message": "Congratulations! your new user has been created!"
    }

    return jsonify(response_body), 201

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if None in [email, password]:
        return jsonify({'msg' : 'one or more required fields are missing'}), 400
    check_user = User.query.filter_by(email=email, password=password).first()
    if check_user : 
        access_token = create_access_token(identity=check_user.id)
        response_body = {
            "message": "Login Succesfull!",
            "token": access_token
        }

        return jsonify(response_body), 200
    
    return jsonify({"msg":"invalid credentials"}), 401
    
@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"msg":"user not found"}), 404
    return jsonify({"msg": "access granted!", "user": user.serialize()}), 200  
