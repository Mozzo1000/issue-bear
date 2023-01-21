from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()
ma = Marshmallow()

user_projects = db.Table("user_projects", 
                        db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
                        db.Column("project_id", db.Integer, db.ForeignKey("projects.id")))


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, default="user")
    status = db.Column(db.String, default="active")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @staticmethod
    def generate_hash(password):
        return generate_password_hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return check_password_hash(hash, password)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        fields = ("id", "name", "email", "role", "status")


class Issue(db.Model):
    __tablename__ = "issues"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)
    tag = db.Column(db.String, nullable=False, default="other")
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class IssueSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Issue

class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=True)
    token = db.Column(db.String, nullable=False, default=uuid.uuid4().hex, unique=True)
    members = db.relationship("User", secondary="user_projects", backref="projects")
    issues = db.relationship("Issue")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    members = ma.List(ma.Nested(UserSchema(only=("id", "name",))))
    issues = ma.List(ma.Nested(IssueSchema()))
    class Meta:
        model = Project

class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)