from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, get_jwt_identity, get_jwt)
from api.models import Project, ProjectSchema, Issue

issues_endpoint = Blueprint('issues', __name__)

@issues_endpoint.route("/v1/issues/<token>", methods=["POST"])
def add_issue(token):
    project = Project.query.filter(Project.token==token).first()

    email = None
    if "email" in request.json:
        email = request.json["email"]
    new_issue = Issue(description=request.json["description"], email=email, tag=request.json["tag"], project_id=project.id)
    new_issue.save_to_db()
    return jsonify({'message': 'New issue added.'}), 200
