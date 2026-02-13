'use strict';

// ---------- Получение элементов со страницы ----------

// 1. Заголовок "Калькулятор верстки" через getElementsByTagName
const headerTitle = document.getElementsByTagName('h1')[0];

// 2. Кнопки "Рассчитать" и "Сброс" через getElementsByClassName
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

// 3. Кнопка "+" под выпадающим списком через querySelector
const screenAddButton = document.querySelector('.screen-btn');

// 4. Элементы с классом other-items и дополнительными классами percent и number через querySelectorAll
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');

// 5. Input type=range через родителя с классом rollback
const rangeInput = document.querySelector('.rollback input[type=range]');

// 6. Span с классом range-value через родителя с классом rollback
const rangeValueSpan = document.querySelector('.rollback .range-value');

// 7. Все инпуты с классом total-input справа через getElementsByClassName
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

// 8. Все блоки с классом screen в изменяемую переменную (далее будем переопределять)
let screens = document.querySelectorAll('.screen');

// ---------- Объявление объекта appData ----------
const appData = {
	title: '',
	screens: [],
	screenPrice: 0,
	adaptive: true,
	rollback: 10,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicePercentPrice: 0,
	servicesPercent: {},
	servicesNumber: {},

	init: function () {
		appData.addTitle();

		startBtn.addEventListener('click', appData.start);
		screenAddButton.addEventListener('click', appData.addScreenBlock);
	},

	addTitle: function () {
		document.title = title.textContent;
	},

	start: function () {

		appData.addScreens();
		appData.addServices();

		appData.addPrices();

		// appData.getServicePercentPrices();


		// appData.logger();

		appData.showResult();
	},

	showResult: function () {
		// alert('alert' + appData.fullPrice);
		total.value = appData.screenPrice
		// totalCount
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		// totalCountRollback
	},

	addScreens: function () {
		// console.log('add screens');
		screens = document.querySelectorAll('.screen');
		screens.forEach(function (screen, index) {
			// console.log(screen);
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value
			})

			// console.log(select.value);
			// console.log(input.value);
		})

		console.log(appData.screens);
	},

	addServices: function () {
		percentItems.forEach(function (item) {

			const check = item.querySelector('input[type=checkbox');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text');

			console.log(check);
			console.log(label);
			console.log(input);
			if (check.checked) {
				appData.servicesPercent[label.textContent] = +input.value
			}
		});

		numberItems.forEach(function (item) {

			const check = item.querySelector('input[type=checkbox');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text');

			if (check.checked) {
				appData.servicesNumber[label.textContent] = +input.value
			}
		});


	},

	// Проверка: содержит ли строка хотя бы одну букву (не только цифры)
	isText: function (str) {
		if (!str || typeof str !== 'string') return false;

		// Проверяем, содержит ли строка хотя бы одну букву (русскую или английскую)
		const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(str);

		// Проверяем, состоит ли строка ТОЛЬКО из цифр и пробелов
		const onlyDigitsAndSpaces = /^[\d\s]+$/.test(str);

		return hasLetter && !onlyDigitsAndSpaces;
	},

	// Проверка: содержит ли строка ТОЛЬКО цифры (число)
	isOnlyDigits: function (str) {
		if (!str || typeof str !== 'string') return false;

		// Удаляем все пробелы и проверяем, состоит ли только из цифр
		const trimmedStr = str.replace(/\s/g, '');
		return /^\d+$/.test(trimmedStr) || /^\d+\.?\d*$/.test(trimmedStr);
	},

	// Генерация уникального ключа для услуги
	generateUniqueKey: function (baseName, obj) {
		let key = baseName;
		let counter = 1;

		// Если ключ уже существует, добавляем суффикс
		while (obj.hasOwnProperty(key)) {
			key = `${baseName}_${counter}`;
			counter++;
		}

		return key;
	},

	addScreenBlock: function () {
		console.log('click');
		const cloneScreen = screens[0].cloneNode(true);
		// console.log(cloneScreen);
		screens[screens.length - 1].after(cloneScreen)
	},

	addPrices: function () {
		// Используем reduce для подсчета суммы цен экранов
		appData.screenPrice = appData.screens.reduce((sum, screen) => {
			return sum + +screen.price;
		}, 0);

		// Подсчет суммы дополнительных услуг
		appData.allServicePrices = 0;
		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}
		appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
	},



	getServicePercentPrices: function () {
		appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
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

	logger: function () {
		console.log('Общая стоимость: ', appData.fullPrice);
		console.log('Стоимость со скидкой: ', appData.servicePercentPrice);
		console.log('Стоимость экранов: ', appData.screenPrice);
		console.log('Типы экранов: ', appData.screens);
		console.log('Дополнительные услуги: ', appData.services);
		console.log('Название проекта: ', appData.title);
		console.log('Сообщение о скидке: ', appData.getRollbackMessage(appData.fullPrice));
	}
};

// ---------- Запуск приложения ----------
appData.init();




// // ---------- Проверка получения элементов ----------
// console.log('Заголовок h1:', headerTitle);
// console.log('Кнопки Рассчитать:', startBtn);
// console.log('Кнопка "+":', screenAddButton);
// console.log('Элементы other-items.percent:', percentItems);
// console.log('Элементы other-items.number:', numberItems);
// console.log('Input range:', rangeInput);
// console.log('Span range-value:', rangeValueSpan);
// console.log('Все total-input:', totalInputs);
// console.log('Блоки screen (изменяемая переменная):', screens);

