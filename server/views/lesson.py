from flask import request
from flask_restx import Namespace, Resource

from server.models.lesson import LessonSchema, Lesson
from server.setup_db import db

lesson_ns = Namespace('lessons')

lesson_schema = LessonSchema()
lessons_schema = LessonSchema(many=True)


@lesson_ns.route('/')
class LessonsViews(Resource):
	# Get all lessons
	def get(self):
		try:
			lessons = db.session.query(Lesson).all()
			return lessons_schema.dump(lessons), 200
		except Exception as e:
			return e, 404


@lesson_ns.route('/<int:pk>')
class LessonViews(Resource):
	# Get one lesson by id
	def get(self, pk):
		try:
			lesson = db.session.query(Lesson).get(pk)
			return lesson_schema.dump(lesson), 200
		except Exception as e:
			return e

	# Update lesson by id
	def put(self, pk):
		data = request.json
		try:
			db.session.query(Lesson).filter(Lesson.id == pk).update(data)
			return f'Lesson-{pk} updated', 201
		except Exception as e:
			return e

	# Update lesson by id
	def patch(self, pk):
		data = request.json
		try:
			db.session.query(Lesson).filter(Lesson.id == pk).update(data)
			return f'Lesson-{pk} updated', 201
		except Exception as e:
			return e