from marshmallow import Schema, fields

from setup_db import db


# Create a table
class Lesson(db.Model):
	__tablename__ = 'lesson'
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(255))
	description = db.Column(db.String(255))
	home_work = db.Column(db.String(255))
	link_to_youtube = db.Column(db.String(255))


# Add serialization
class LessonSchema(Schema):
	id = fields.Int()
	title = fields.Str()
	description = fields.Str()
	home_work = fields.Str()
	link_to_youtube = fields.Str()
