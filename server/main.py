from flask import Flask

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main_page():
	return 'Hello world'


if __name__ == '__main__':
	app.run(port=8080, debug=True)