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

	init() {
		this.addTitle();

		// Добавляем обработчик для range с привязкой контекста
		rangeInput.addEventListener('input', (e) => this.updateRollback(e));

		// Привязываем контекст для обработчиков кнопок
		startBtn.addEventListener('click', () => this.start());
		resetBtn.addEventListener('click', () => this.reset());
		screenAddButton.addEventListener('click', () => this.addScreenBlock());

		// Изначально скрываем кнопку сброс
		resetBtn.style.display = 'none';
	},

	addTitle() {
		document.title = headerTitle.textContent;
	},

	start() {
		// Проверяем, заполнены ли блоки экранов
		if (!this.validateScreens()) {
			alert('Пожалуйста, выберите тип экрана и укажите количество для всех блоков');
			return;
		}

		this.addScreens();
		this.addServices();
		this.addPrices();
		this.showResult();
		this.disableInputs();

		// Меняем видимость кнопок
		startBtn.style.display = 'none';
		resetBtn.style.display = 'block';
	},

	// Проверка заполненности блоков экранов
	validateScreens() {
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

	showResult() {
		total.value = this.screenPrice;
		totalCount.value = this.totalScreensCount;
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
		fullTotalCount.value = this.fullPrice;
		totalCountRollback.value = this.fullPrice - (this.fullPrice * (this.rollback / 100));
	},

	addScreens() {
		screens = document.querySelectorAll('.screen');
		this.screens = []; // Очищаем массив перед добавлением

		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			const selectName = select.options[select.selectedIndex].textContent;

			this.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value,
				count: +input.value // Добавляем количество экранов
			});
		});
	},

	addServices() {
		// Очищаем объекты услуг перед добавлением
		this.servicesPercent = {};
		this.servicesNumber = {};

		percentItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				this.servicesPercent[label.textContent] = +input.value;
			}
		});

		numberItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const label = item.querySelector('label');
			const input = item.querySelector('input[type=text]');

			if (check.checked) {
				this.servicesNumber[label.textContent] = +input.value;
			}
		});
	},

	addScreenBlock() {
		const cloneScreen = screens[0].cloneNode(true);
		screens[screens.length - 1].after(cloneScreen);
		screens = document.querySelectorAll('.screen');
	},

	addPrices() {
		// Сумма цен экранов
		this.screenPrice = this.screens.reduce((sum, screen) => {
			return sum + screen.price;
		}, 0);

		// Общее количество экранов
		this.totalScreensCount = this.screens.reduce((sum, screen) => {
			return sum + screen.count;
		}, 0);

		// Сумма дополнительных услуг
		this.servicePricesNumber = 0;
		this.servicePricesPercent = 0;

		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}

		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}

		this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
	},

	// Обновление значения range
	updateRollback(e) {
		const value = e.target.value;
		rangeValueSpan.textContent = value + '%';
		this.rollback = +value;
	},

	// Блокировка всех input[type=text] и select с левой стороны
	disableInputs() {
		// Блокируем select и input в блоках screen
		screens.forEach((screen) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			select.disabled = true;
			input.disabled = true;
		});

		// Блокируем input[type=text] в блоках услуг
		percentItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			input.disabled = true;
		});

		numberItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			input.disabled = true;
		});
	},

	// Разблокировка всех input[type=text] и select
	enableInputs() {
		// Разблокируем select и input в блоках screen
		screens.forEach((screen) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			select.disabled = false;
			input.disabled = false;
		});

		// Разблокируем input[type=text] в блоках услуг
		percentItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			input.disabled = false;
		});

		numberItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			input.disabled = false;
		});
	},

	// Сброс всех значений
	resetInputValues() {
		// Сбрасываем select и input в блоках screen
		screens.forEach((screen) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			select.value = '';
			input.value = '';
		});

		// Сбрасываем input[type=text] в блоках услуг
		percentItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const input = item.querySelector('input[type=text]');
			check.checked = false;
			input.value = '';
		});

		numberItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const input = item.querySelector('input[type=text]');
			check.checked = false;
			input.value = '';
		});

		// Сбрасываем range
		rangeInput.value = 0;
		rangeValueSpan.textContent = '0%';

		// Сбрасываем поля справа
		total.value = '';
		totalCount.value = '';
		totalCountOther.value = '';
		fullTotalCount.value = '';
		totalCountRollback.value = '';
	},

	// Удаление дополнительных блоков
	removeExtraScreens() {
		const allScreens = document.querySelectorAll('.screen');

		// Удаляем все блоки, кроме первого
		for (let i = allScreens.length - 1; i > 0; i--) {
			allScreens[i].remove();
		}

		// Обновляем переменную screens
		screens = document.querySelectorAll('.screen');
	},

	// Сброс объекта в исходное состояние
	reset() {
		// Удаляем дополнительные блоки экранов
		this.removeExtraScreens();

		// Сбрасываем значения всех полей ввода
		this.resetInputValues();

		// Разблокируем все инпуты
		this.enableInputs();

		// Очищаем данные объекта
		this.screens = [];
		this.screenPrice = 0;
		this.rollback = 0;
		this.servicePricesPercent = 0;
		this.servicePricesNumber = 0;
		this.fullPrice = 0;
		this.servicesPercent = {};
		this.servicesNumber = {};

		// Меняем видимость кнопок
		startBtn.style.display = 'block';
		resetBtn.style.display = 'none';
	}
};

// ---------- Запуск приложения ----------
appData.init();
