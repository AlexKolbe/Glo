'use strict';

// ---------- Объявление объекта appData ----------
const appData = {
	screens: '',
	title: '',
	screenPrice: 0,
	adaptive: true,
	allServicePrices: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	service1: '',
	service2: '',
	commissionInput: 0,
	commissionPercent: 10,

	// Получение данных от пользователя
	asking: function () {
		appData.title = prompt("Как называется ваш проект?", "Мой проект");
		appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

		// Используем метод для запроса числа
		appData.screenPrice = appData.askForNumber("Сколько будет стоить данная работа?", "10000");

		appData.adaptive = confirm("Нужен ли адаптив на сайте?");

		// Получение процента отката с проверкой
		do {
			appData.commissionInput = prompt("Какой процент отката посреднику? (например: 10)", "10");

			// Если пользователь нажал Отмена
			if (appData.commissionInput === null) {
				console.warn("Ввод отменен. Используется значение по умолчанию 10%");
				appData.commissionPercent = 10;
				break;
			}

			const parsedCommission = appData.parseNumber(appData.commissionInput);

			if (isNaN(parsedCommission) || parsedCommission < 0 || parsedCommission > 100) {
				alert("Пожалуйста, введите число от 0 до 100!");
			} else {
				appData.commissionPercent = parsedCommission;
				break;
			}
		} while (true);
	},

	// Улучшенная функция проверки числа
	isNumber: function (value) {
		// Проверяем, что значение не null/undefined
		if (value === null || value === undefined) {
			return false;
		}

		// Убираем пробелы в начале и конце
		const trimmedValue = value.toString().trim();

		// Проверяем, является ли значение числом после очистки
		return !isNaN(parseFloat(trimmedValue)) && isFinite(trimmedValue) && trimmedValue !== '';
	},

	// Функция для безопасного преобразования в число
	parseNumber: function (value) {
		if (!appData.isNumber(value)) {
			return NaN;
		}

		// Убираем пробелы и преобразуем
		const trimmedValue = value.toString().trim();
		return parseFloat(trimmedValue);
	},

	// Функция для запроса числа с проверкой
	askForNumber: function (promptMessage, defaultValue) {
		let inputValue;
		let parsedNumber;

		do {
			inputValue = prompt(promptMessage, defaultValue);

			// Если пользователь нажал Отмена
			if (inputValue === null) {
				alert("Отмена ввода. Используется значение по умолчанию.");
				parsedNumber = appData.parseNumber(defaultValue);
				break;
			}

			parsedNumber = appData.parseNumber(inputValue);

			if (isNaN(parsedNumber)) {
				alert("Пожалуйста, введите корректное число!");
			}
		} while (isNaN(parsedNumber));

		return parsedNumber;
	},

	// Function expression для получения суммы дополнительных услуг
	getAllServicePrices: function () {
		let sum = 0;

		for (let i = 0; i < 2; i++) {
			if (i === 0) {
				appData.service1 = prompt("Какой дополнительный тип услуги нужен? (первая услуга)", "Дизайн");

				// Используем метод для запроса цены
				const servicePrice = appData.askForNumber("Сколько это будет стоить дополнительная услуга?", "5000");
				sum += servicePrice;

			} else if (i === 1) {
				appData.service2 = prompt("Какой дополнительный тип услуги нужен? (вторая услуга)", "SEO");

				// Используем метод для запроса цены
				const servicePrice = appData.askForNumber("Сколько это будет стоить дополнительная услуга?", "5000");
				sum += servicePrice;
			}
		}
		return sum;
	},

	// Function declaration для получения полной стоимости
	getFullPrice: function () {
		return appData.screenPrice + appData.allServicePrices;
	},

	// Функция для форматирования названия
	getTitle: function () {
		// Удаляем начальные пробелы и преобразуем первый символ в верхний регистр, остальные в нижний
		return appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
	},

	// Функция для получения стоимости за вычетом отката
	getServicePercentPrices: function () {
		const commissionAmount = appData.fullPrice * (appData.commissionPercent / 100);
		return Math.ceil(appData.fullPrice - commissionAmount);
	},

	// Функция для проверки типа переменной
	showTypeOf: function (variable) {
		console.log(typeof variable, variable);
	},

	// Функция для получения сообщения о скидке
	getRollbackMessage: function (price) {
		if (price > 30000) {
			return "Даем скидку в 10%";
		} else if (price >= 15000 && price <= 30000) {
			return "Даем скидку в 5%";
		} else if (price > 0 && price < 15000) {
			return "Скидка не предусмотрена";
		} else if (price < 0) {
			return "Что то пошло не так";
		} else {
			return "Стоимость равна 0, 15000 или 30000";
		}
	},


	// Основной метод запуска приложения
	start: function () {
		// Получение данных от пользователя
		appData.asking();

		// Расчеты
		appData.allServicePrices = appData.getAllServicePrices();
		appData.fullPrice = appData.getFullPrice();
		appData.servicePercentPrice = appData.getServicePercentPrices();

		// Форматирование названия
		appData.title = appData.getTitle();

		// Вывод в консоль
		console.log(appData.title);
		console.log(appData.fullPrice);
		console.log(appData.allServicePrices);

	}
};

// ---------- Запуск приложения ----------
appData.start();
