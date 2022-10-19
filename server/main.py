from flask import Flask
from flask_restx import Api

from server.config import Config
from server.create_data import create_data
from server.setup_db import db
from server.views.lesson import lesson_ns


# Function to create flask application
def create_app(config: Config) -> Flask:
	application = Flask(__name__)
	application.config.from_object(config)
	application.app_context().push()
	return application


# Function to configurate flask application
def configure_app(app: Flask):
	db.init_app(app)
	api = Api(app)
	api.add_namespace(lesson_ns)


# Start application
if __name__ == '__main__':
	config = Config()
	app = create_app(config)
	configure_app(app)
	# create_data(app, db)
	app.run()