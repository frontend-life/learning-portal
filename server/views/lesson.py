from flask_restx import Namespace, Resource

from models.lesson import LessonSchema, Lesson
from setup_db import db

lesson_ns = Namespace('lessons')

lesson_schema = LessonSchema()
lessons_schema = LessonSchema(many=True)


# Get all lessons
@lesson_ns.route('/')
class LessonsViews(Resource):
	def get(self):
		lessons = db.session.query(Lesson).all()
		return lessons_schema.dump(lessons), 200


# Get one lesson by id
@lesson_ns.route('/<int:pk>')
class LessonViews(Resource):
	def get(self, pk):
		lesson = db.session.query(Lesson).get(pk)
		return lesson_schema.dump(lesson), 200