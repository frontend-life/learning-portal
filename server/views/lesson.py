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
		try:
			lessons = db.session.query(Lesson).all()
			return lessons_schema.dump(lessons), 200
		except Exception as e:
			return e, 404


# Get one lesson by id
@lesson_ns.route('/<int:pk>')
class LessonViews(Resource):
	def get(self, pk):
		try:
			lesson = db.session.query(Lesson).get(pk)
			return lesson_schema.dump(lesson), 200
		except Exception as e:
			return e

	def put(self, pk):
		data = request.json
		try:
			db.session.query(Lesson).filter(Lesson.id == pk).update(data)
			return f'Lesson-{pk} updated', 201
		except Exception as e:
			return e

	def patch(self, pk):
		data = request.json
		try:
			db.session.query(Lesson).filter(Lesson.id == pk).update(data)
			return f'Lesson-{pk} updated', 201
		except Exception as e:
			return e