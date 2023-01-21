from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, get_jwt_identity, get_jwt)
from api.models import Project, ProjectSchema, User, db
from sqlalchemy.exc import IntegrityError
import uuid

projects_endpoint = Blueprint('projects', __name__)

@projects_endpoint.route("/v1/projects")
@jwt_required()
def get_projects():
    projects_schema = ProjectSchema(many=True)
    current_user = User.find_by_email(get_jwt_identity())
    projects = Project.query.filter(Project.members.any(id=current_user.id)).all()
    return jsonify(projects_schema.dump(projects))

@projects_endpoint.route("/v1/projects", methods=["POST"])
@jwt_required()
def add_project():
    if not "name" in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "name not given"
        }), 400
    
    url = None
    if "url" in request.json:
        url = request.json["url"]

    current_user = User.find_by_email(get_jwt_identity())
    new_project = Project(name=request.json["name"], url=url)
    new_project.members.append(current_user)
    try:
        new_project.save_to_db()
        return jsonify({'message': 'New project created'}), 201
    except IntegrityError:
        return jsonify({
            "error": "Server error",
            "message": "Could not generate a unique token, try again later."
        }), 500

@projects_endpoint.route('/v1/projects/<id>', methods=["DELETE"])
@jwt_required()
def remove_project(id):
    current_user = User.find_by_email(get_jwt_identity())
    project = Project.query.filter(Project.id==id, Project.members.any(id=current_user.id)).first()
    try: 
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project has been removed.'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@projects_endpoint.route('/v1/projects/<id>/members', methods=["POST"])
@jwt_required()
def add_member(id):
    if not "email" in request.json:
        return jsonify({
            "error": "Bad request",
            "message": "email not given"
        }), 400
    current_user = User.find_by_email(get_jwt_identity())
    project = Project.query.filter(Project.id==id, Project.members.any(id=current_user.id)).first()

    new_user = User.find_by_email(request.json["email"])
    project.members.append(new_user)
    
    try:
        project.save_to_db()
        return jsonify({'message': 'New member added.'}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500

@projects_endpoint.route('/v1/projects/<id>/token', methods=["PUT"])
@jwt_required()
def generate_new_token(id):
    current_user = User.find_by_email(get_jwt_identity())
    project = Project.query.filter(Project.id==id, Project.members.any(id=current_user.id)).first()
    new_token = uuid.uuid4().hex
    project.token = new_token
    try:
        project.save_to_db()
        return jsonify({'message': 'New token generated for project.', 'token': new_token}), 200
    except:
        return jsonify({'message': 'Something went wrong'}), 500