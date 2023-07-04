from flask import Blueprint, request, jsonify, abort
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, get_jwt_identity, get_jwt)
from api.models import Project, ProjectSchema, Issue, User, db

issues_endpoint = Blueprint('issues', __name__)

@issues_endpoint.route("/v1/issues/<token>", methods=["POST"])
def add_issue(token):
    project = Project.query.filter(Project.token==token).first()

    email = None
    if "email" in request.json:
        if request.json["email"]:
            email = request.json["email"]
    new_issue = Issue(description=request.json["description"], email=email, tag=request.json["tag"], project_id=project.id)
    new_issue.save_to_db()
    return jsonify({'message': 'New issue added.'}), 200

@issues_endpoint.route('/v1/issues/<id>', methods=["DELETE"])
@jwt_required()
def remove_issue(id):
    current_user = User.find_by_email(get_jwt_identity())
    issue = Issue.query.filter(Issue.id==id).first()
    project = Project.query.filter(Project.id==issue.project_id, Project.members.any(id=current_user.id)).first()
    print(project)
    if project:
        issue.archived = True
        db.session.commit()
        return jsonify({'message': 'Issue has been archived.'}), 200
    else:
        return jsonify({'message': 'Unable to archive, issue does not belong to a project you are a member of.'}), 400
