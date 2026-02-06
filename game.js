function createGuessingGame() {
	// Замыкание для хранения загаданного числа
	const secretNumber = Math.floor(Math.random() * 100) + 1;

	console.log('Загадано число от 1 до 100. Попробуйте угадать!');

	function askGuess() {
		const userInput = prompt('Угадай число от 1 до 100');

		// Если пользователь нажал "Отмена"
		if (userInput === null) {
			console.log('Игра окончена');
			return;
		}

		// Преобразуем ввод в число
		const userNumber = Number(userInput);

		// Проверяем, является ли ввод числом
		if (isNaN(userNumber) || userInput.trim() === '') {
			console.log('Введи число!');
			// Рекурсивно вызываем функцию снова
			return askGuess();
		}

		// Проверяем, что число в диапазоне
		if (userNumber < 1 || userNumber > 100) {
			console.log('Введи число от 1 до 100!');
			return askGuess();
		}

		// Сравниваем числа
		if (userNumber === secretNumber) {
			console.log('Поздравляю, Вы угадали!!!');
			return;
		} else if (userNumber > secretNumber) {
			console.log('Загаданное число меньше');
		} else {
			console.log('Загаданное число больше');
		}

		// Рекурсивно вызываем функцию для следующей попытки
		return askGuess();
	}

	// Возвращаем функцию для начала игры
	return askGuess;
}

// Запуск игры
const startGame = createGuessingGame();
startGame();
