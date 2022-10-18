from flask_restx import Namespace, Resource

from server.models.lesson import LessonSchema, Lesson
from server.setup_db import db

lesson_ns = Namespace('lessons')

lesson_schema = LessonSchema()
lessons_schema = LessonSchema(many=True)


@lesson_ns.route('/')
class LessonsViews(Resource):
	def get(self):
		lessons = db.session.query(Lesson).all()
		return lessons_schema.dump(lessons), 200


@lesson_ns.route('/<int:pk>')
class LessonViews(Resource):
	def post(self, pk):
		lesson = db.session.query(Lesson).get(pk)
		return lesson_schema.dump(lesson), 200