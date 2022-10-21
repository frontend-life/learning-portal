from flask import request
from flask_restx import Namespace, Resource

from server.models.lesson import LessonSchema, Lesson
from server.setup_db import db

lesson_ns = Namespace('lessons')

lesson_schema = LessonSchema()
lessons_schema = LessonSchema(many=True)


# Get all lessons
@lesson_ns.route('/')
class LessonsViews(Resource):
	def get(self):
		lessons = db.session.query(Lesson).all()
		return lessons_schema.dump(lessons), 200

	def post(self):
		data = request.json
		lesson = Lesson(**data)
		db.session.add(lesson)
		db.session.commit()
		return lesson_schema.dump(lesson), 200


# Get one lesson by id
@lesson_ns.route('/<int:pk>')
class LessonViews(Resource):
	def get(self, pk):
		lesson = db.session.query(Lesson).get(pk)
		return lesson_schema.dump(lesson), 200