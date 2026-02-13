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
	rollback: 0,
	servicePricesPercent: 0,
	servicePricesNumber: 0,
	fullPrice: 0,
	servicesPercent: {},
	servicesNumber: {},

	init: function () {
		appData.addTitle();

		// Добавляем обработчик для range
		rangeInput.addEventListener('input', appData.updateRollback);

		startBtn.addEventListener('click', appData.start);
		screenAddButton.addEventListener('click', appData.addScreenBlock);
	},

	addTitle: function () {
		document.title = title.textContent;
	},

	start: function () {
		// Проверяем, заполнены ли блоки экранов
		if (!appData.validateScreens()) {
			alert('Пожалуйста, выберите тип экрана и укажите количество для всех блоков');
			return;
		}

		appData.addScreens();
		appData.addServices();
		appData.addPrices();
		appData.showResult();
	},

	// Проверка заполненности блоков экранов
	validateScreens: function () {
		const currentScreens = document.querySelectorAll('.screen');

		for (let screen of currentScreens) {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');

			// Проверяем, что выбран не пустой пункт и введено количество
			if (!select.value || !input.value || input.value.trim() === '') {
				return false;
			}
		}

		return currentScreens.length > 0;
	},

	showResult: function () {
		total.value = appData.screenPrice;
		totalCount.value = appData.totalScreensCount;
		totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
		fullTotalCount.value = appData.fullPrice;
		totalCountRollback.value = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
	},

	addScreens: function () {
		screens = document.querySelectorAll('.screen');
		appData.screens = []; // Очищаем массив перед добавлением

		screens.forEach(function (screen, index) {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			appData.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value,
				count: +input.value // Добавляем количество экранов
			});
		});
	},

	addServices: function () {
		// Очищаем объекты услуг перед добавлением
		appData.servicesPercent = {};
		appData.servicesNumber = {};

		percentItems.forEach(function (item) {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesPercent[label.textContent] = +input.value;
			}
		});

		numberItems.forEach(function (item) {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				appData.servicesNumber[label.textContent] = +input.value;
			}
		});
	},

	addScreenBlock: function () {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
	},

	addPrices: function () {
		// Сумма цен экранов
		appData.screenPrice = appData.screens.reduce((sum, screen) => {
			return sum + screen.price;
		}, 0);

		// Общее количество экранов
		appData.totalScreensCount = appData.screens.reduce((sum, screen) => {
			return sum + screen.count;
		}, 0);

		// Сумма дополнительных услуг
		appData.servicePricesNumber = 0;
		appData.servicePricesPercent = 0;

		for (let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key];
		}

		for (let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
		}

		appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
	},

	// Обновление значения range
	updateRollback: function (e) {
		const value = e.target.value;
		rangeValueSpan.textContent = value + '%';
		appData.rollback = +value;
	}
};

// ---------- Запуск приложения ----------
appData.init();
