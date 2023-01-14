from flask import Flask, url_for
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import db, ma
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

@app.route("/")
def index():
    return {
        "name": "issue-bear-api",
        "version": "0.1.0"
    }