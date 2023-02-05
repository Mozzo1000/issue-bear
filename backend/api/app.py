from flask import Flask, url_for
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.models import db, ma
from api.config import DevConfig, ProdConfig
import os
from api.routes.auth import auth_endpoint
from api.routes.projects import projects_endpoint
from api.routes.issues import issues_endpoint
from api.routes.user import user_endpoint

app = Flask(__name__)
CORS(app)
if os.environ.get("FLASK_DEBUG") == "1":
    app.config.from_object(DevConfig)
else:
    app.config.from_object(ProdConfig)
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

app.register_blueprint(auth_endpoint)
app.register_blueprint(projects_endpoint)
app.register_blueprint(issues_endpoint)
app.register_blueprint(user_endpoint)

@app.route("/")
def index():
    return {
        "name": "issue-bear-api",
        "version": "0.1.0"
    }