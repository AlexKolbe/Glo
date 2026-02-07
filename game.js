function createGameBot() {
	// Замыкание для хранения состояния игры
	let secretNumber;
	let attemptsLeft;

	function initGame() {
		secretNumber = Math.floor(Math.random() * 100) + 1;
		attemptsLeft = 10;
		console.log('Новая игра! Угадай число от 1 до 100');
		console.log(`У вас есть ${attemptsLeft} попыток.`);
		console.log('-----------------------------------');
		askGuess();
	}

	function askGuess() {
		// Если попытки закончились
		if (attemptsLeft <= 0) {
			console.log(`Попытки закончились. Загаданное число было: ${secretNumber}`);
			const playAgain = confirm('Попытки закончились, хотите сыграть еще?');
			if (playAgain) {
				initGame();
			} else {
				console.log('До свидания! Спасибо за игру!');
			}
			return;
		}

		const userInput = prompt(`Попытка ${11 - attemptsLeft}. Введите число от 1 до 100 (осталось попыток: ${attemptsLeft}):`);

		// Если пользователь нажал "Отмена"
		if (userInput === null) {
			console.log('Игра окончена. До свидания!');
			console.log(`Загаданное число было: ${secretNumber}`);
			return;
		}

		// Преобразуем ввод в число
		const userNumber = Number(userInput);

		// Проверяем, является ли ввод числом
		if (isNaN(userNumber) || userInput.trim() === '') {
			console.log('Введи число!');
			console.log(`Осталось попыток: ${attemptsLeft}`);
			// Рекурсивно вызываем функцию снова (попытка не тратится)
			return askGuess();
		}

		// Проверяем, что число в диапазоне
		if (userNumber < 1 || userNumber > 100) {
			console.log('Введи число от 1 до 100!');
			console.log(`Осталось попыток: ${attemptsLeft}`);
			// Попытка не тратится на некорректный ввод
			return askGuess();
		}

		// Уменьшаем количество попыток при корректном вводе
		attemptsLeft--;

		// Сравниваем числа
		if (userNumber === secretNumber) {
			console.log(`Поздравляю, Вы угадали число ${secretNumber}!`);
			const playAgain = confirm('Хотели бы сыграть еще?');
			if (playAgain) {
				initGame();
			} else {
				console.log('Спасибо за игру! До новых встреч!');
			}
			return;
		} else if (userNumber > secretNumber) {
			console.log(`Загаданное число меньше ${userNumber}, осталось попыток: ${attemptsLeft}`);
		} else {
			console.log(`Загаданное число больше ${userNumber}, осталось попыток: ${attemptsLeft}`);
		}

		// Рекурсивно вызываем функцию для следующей попытки
		return askGuess();
	}

	// Возвращаем функцию для начала игры
	return initGame;
}

// Запуск игры
const startGame = createGameBot();
startGame();
