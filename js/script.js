// Базовый класс First
class First {
	hello() {
		console.log("Привет я метод родителя!");
	}
}

// Класс Second, который наследует от First
class Second extends First {
	hello() {
		// Вызываем метод родителя
		super.hello();
		// Добавляем дополнительный вывод
		console.log("А я наследуемый метод!");
	}
}

// Пример использования:
const firstObj = new First();
const secondObj = new Second();

console.log("Вызов метода hello у First:");
firstObj.hello(); // Выведет: "Привет я метод родителя!"

console.log("\nВызов метода hello у Second:");
secondObj.hello();
