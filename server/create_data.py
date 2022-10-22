from models.lesson import Lesson


# Fill table lesson
def create_data(app, db):
	"""
	This function is nnded to fill the table lesson
	:param app: application
	:param db: data base
	"""
	with app.app_context():
		db.create_all()
		r1 = Lesson(title="Первые шаги",
		            description="Пишем hello world на языке python",
		            home_work="Напишите самостоятельно приложение",
		            link_to_youtube="https://www.youtube.com/watch?v=btuxcr7Sxw4&list=PLA0M1Bcd0w8yWHh2V70bTtbVxJICrnJHd&ab_channel=selfedu")

		r2 = Lesson(title="Типы чисел в python",
		            description="Базовые числовые типы в Python: int, float, complex.",
		            home_work="Почитай про Краткие операторы: +=, -=, *=, /=, **=.",
		            link_to_youtube="https://www.youtube.com/watch?v=HZrbYY10cJI&list=PLA0M1Bcd0w8yWHh2V70bTtbVxJICrnJHd&index=4&ab_channel=selfedu")

		r3 = Lesson(title="Функции print() и input()",
		            description="Узнаете как применять в программах функцию print() для вывода информации в консоль и функцию input() для ввода информации",
		            home_work="Почитай про Параметры sep и end функции print()",
		            link_to_youtube="https://www.youtube.com/watch?v=8hzpSR_Qaj8&list=PLA0M1Bcd0w8yWHh2V70bTtbVxJICrnJHd&index=6&ab_channel=selfedu")

		r4 = Lesson(title="Спецсимволы, экранирование символов, raw-строки",
		            description=r"Работаем со спецсимволами строк: \n - перевод строки;\t - табуляция;\\ - обратный слеш",
		            home_work="Почитай про Понятие экранирования и зачем это нужно. ",
		            link_to_youtube="https://www.youtube.com/watch?v=VZsWVN6QaKc&list=PLA0M1Bcd0w8yWHh2V70bTtbVxJICrnJHd&index=11&ab_channel=selfedu")

	with db.session.begin():
		db.session.add_all([r1, r2, r3, r4])
