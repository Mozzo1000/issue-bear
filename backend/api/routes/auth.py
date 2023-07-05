from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, get_jwt_identity, get_jwt)
from api.models import User, UserSchema, RevokedTokenModel, Verification
import random
import string
from datetime import datetime, timedelta

auth_endpoint = Blueprint('auth', __name__)

@auth_endpoint.route("/v1/auth/register", methods=["POST"])
def register():
    if not "email" or not "password" or not "name" in request.json:
        abort(422)
    if User.find_by_email(request.json["email"]):
        return jsonify({'message': 'Email {} is already in use'.format(request.json["email"])}), 409
    
    new_user = User(email=request.json["email"], password=User.generate_hash(request.json["password"]), name=request.json["name"])

    # Alphanumeric (letters and numbers) string with a length of 8 characters
    code = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))

    try:
        new_user.save_to_db()
        user_id = User.find_by_email(request.json["email"]).id
        new_verification = Verification(user_id=user_id, code=code, code_valid_until=str(datetime.now() + timedelta(days=1)))
        new_verification.save_to_db()

        return jsonify({'message': 'Account with email {} was created'.format(request.json["email"])}), 201

    except Exception as error:
        print(error)
        return jsonify({'message': 'Something went wrong'}), 500

@auth_endpoint.route("/v1/auth/verify", methods=["POST"])
def verify():
    if not "email" or not "code" in request.json:
        abort(422)

    current_user = User.find_by_email(request.json["email"])
    print(current_user)
    if current_user:
        verification = Verification.query.filter(Verification.user_id==current_user.id).first()
        print("CURRENT USER EXISTS")
        if datetime.now() < verification.code_valid_until:
            if verification.code == request.json["code"].upper():
                try:
                    verification.status = "verified"
                    verification.code = None
                    verification.code_valid_until = None
                    verification.save_to_db()
                    return jsonify({'message': 'Verification succeeded'}), 200
                except:
                    return jsonify({'message': 'Unable to save to db, something went wrong'}), 500
            else:
                return jsonify({'message': 'Invalid verification code supplied'}), 400
        else:
            return jsonify({'message': 'Verification code has expired'}), 400
    else:
        return jsonify({'message': 'User could not be retrieved by email'}), 404

@auth_endpoint.route("/v1/auth/login", methods=["POST"])
def login():
    if not "email" or not "password" in request.json:
        abort(422)
    current_user = User.find_by_email(request.json["email"])
    if not current_user:
        return jsonify({'message': 'Wrong email or password, please try again.'}), 404

    if User.verify_hash(request.json["password"], current_user.password) and current_user.status == "active":
        if current_user.verification.status != "verified":
            return jsonify({'message': 'Account has not been verified.'}), 403
        access_token = create_access_token(identity=request.json['email'], additional_claims={"role": current_user.role})
        refresh_token = create_refresh_token(identity=request.json['email'])

        user_schema = UserSchema()
        json_output = user_schema.dump(current_user)
        json_output.update({'access_token': access_token, 'refresh_token': refresh_token})
        return jsonify(json_output), 201
    elif current_user.status == "inactive":
        return jsonify({'message': 'Account has been inactivated, contact administrator for more information.'}), 403
    else:
        return jsonify({'message': 'Wrong username or password, please try again.'}), 401

@auth_endpoint.route('/v1/auth/refresh', methods=['POST'])
def token_refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify({'access_token': access_token}), 201

@auth_endpoint.route('/v1/auth/logout/access', methods=['POST'])
@jwt_required()
def user_logout_access():
    jti = get_jwt()["jti"]
    try:
        revoked_token = RevokedTokenModel(jti=jti)
        revoked_token.add()
        return jsonify({'message': 'Access token has been revoked'}), 201
    except:
        return jsonify({'message': 'Something went wrong'}), 500


@auth_endpoint.route('/v1/auth/logout/refresh', methods=['POST'])
@jwt_required(refresh=True)
def user_logout_refresh():
    jti = get_jwt()["jti"]
    try:
        revoked_token = RevokedTokenModel(jti=jti)
        revoked_token.add()
        return jsonify({'message': 'Refresh token has been revoked'}), 201
    except:
        return jsonify({'message': 'Something went wrong'}), 500
