class Config:
	SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	JSON_AS_ASCII = False
	DEBUG = True
	RESTX_JSON = {'ensure_ascii': False, 'indent': 4}
	PORT = 8080