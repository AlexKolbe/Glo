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

// ---------- Дополнительные элементы для CMS ----------
const cmsCheckbox = document.getElementById('cms-open');
const hiddenCmsBlock = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const cmsOtherInput = document.getElementById('cms-other-input');
const cmsOtherBlock = document.querySelector('.hidden-cms-variants .main-controls__input');

// Сохраняем исходные значения из HTML
const defaultValues = {
	screenInputs: [],
	percentInputs: [],
	numberInputs: []
};

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
	cmsPrice: 0,

	init() {
		this.addTitle();
		this.saveDefaultValues(); // Сохраняем исходные значения

		// Добавляем обработчик для range с привязкой контекста
		rangeInput.addEventListener('input', (e) => this.updateRollback(e));

		// Привязываем контекст для обработчиков кнопок
		startBtn.addEventListener('click', () => this.start());
		resetBtn.addEventListener('click', () => this.reset());
		screenAddButton.addEventListener('click', () => this.addScreenBlock());

		// Добавляем обработчики для CMS
		cmsCheckbox.addEventListener('change', (e) => this.toggleCmsBlock(e));
		cmsSelect.addEventListener('change', (e) => this.handleCmsSelect(e));

		// Изначально скрываем кнопку сброс
		resetBtn.style.display = 'none';
	},

	// Сохраняем исходные значения из HTML
	saveDefaultValues() {
		// Сохраняем значения для блоков экранов
		screens.forEach((screen) => {
			const input = screen.querySelector('input');
			defaultValues.screenInputs.push(input.value);
		});

		// Сохраняем значения для percent блоков
		percentItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			defaultValues.percentInputs.push({
				element: input,
				value: input.value
			});
		});

		// Сохраняем значения для number блоков
		numberItems.forEach((item) => {
			const input = item.querySelector('input[type=text]');
			defaultValues.numberInputs.push({
				element: input,
				value: input.value
			});
		});
	},

	addTitle() {
		document.title = headerTitle.textContent;
	},

	// Обработчик для чекбокса CMS
	toggleCmsBlock(e) {
		if (e.target.checked) {
			hiddenCmsBlock.style.display = 'flex';
		} else {
			hiddenCmsBlock.style.display = 'none';
			// Сбрасываем select и скрываем input при снятии чекбокса
			cmsSelect.value = '';
			cmsOtherBlock.style.display = 'none';
			cmsOtherInput.value = '';
			this.cmsPrice = 0;
		}
	},

	// Обработчик для select CMS
	handleCmsSelect(e) {
		if (e.target.value === 'other') {
			cmsOtherBlock.style.display = 'flex';
		} else {
			cmsOtherBlock.style.display = 'none';
			cmsOtherInput.value = '';
		}
	},

	start() {
		// Проверяем, заполнены ли блоки экранов
		if (!this.validateScreens()) {
			alert('Пожалуйста, выберите тип экрана и укажите количество для всех блоков');
			return;
		}

		this.addScreens();
		this.addServices();

		// Сначала рассчитываем базовую стоимость экранов
		this.calculateScreenPrice();

		// Затем рассчитываем стоимость дополнительных услуг (проценты от стоимости экранов)
		this.calculateServicesPrice();

		// Рассчитываем стоимость CMS (проценты от стоимости экранов)
		this.calculateCmsPrice();

		// Собираем полную стоимость
		this.calculateFullPrice();

		this.showResult();
		this.disableInputs();

		// Меняем видимость кнопок
		startBtn.style.display = 'none';
		resetBtn.style.display = 'block';
	},

	// Расчет стоимости экранов
	calculateScreenPrice() {
		this.screenPrice = this.screens.reduce((sum, screen) => {
			return sum + screen.price;
		}, 0);

		// Общее количество экранов
		this.totalScreensCount = this.screens.reduce((sum, screen) => {
			return sum + screen.count;
		}, 0);
	},

	// Расчет стоимости дополнительных услуг
	calculateServicesPrice() {
		this.servicePricesNumber = 0;
		this.servicePricesPercent = 0;

		for (let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key];
		}

		for (let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
		}
	},

	// Расчет стоимости CMS (проценты от стоимости экранов)
	calculateCmsPrice() {
		this.cmsPrice = 0;

		if (cmsCheckbox.checked) {
			const selectedValue = cmsSelect.value;

			if (selectedValue === '50') {
				// WordPress - 50% от стоимости экранов
				this.cmsPrice = this.screenPrice * 0.5;
			} else if (selectedValue === 'other' && cmsOtherInput.value) {
				// Другое - введенное значение (предполагаем, что это проценты)
				const percent = +cmsOtherInput.value;
				if (!isNaN(percent)) {
					this.cmsPrice = this.screenPrice * (percent / 100);
				}
			}
		}
	},

	// Расчет полной стоимости
	calculateFullPrice() {
		// Полная стоимость = экраны + доп. услуги (числовые) + доп. услуги (проценты) + CMS
		this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent + this.cmsPrice;
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

		// Блокируем элементы CMS
		cmsCheckbox.disabled = true;
		cmsSelect.disabled = true;
		cmsOtherInput.disabled = true;
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

		// Разблокируем элементы CMS
		cmsCheckbox.disabled = false;
		cmsSelect.disabled = false;
		cmsOtherInput.disabled = false;
	},

	// Сброс всех значений к исходным из HTML
	resetInputValues() {
		// Сбрасываем select и input в блоках screen
		screens.forEach((screen, index) => {
			const select = screen.querySelector('select');
			const input = screen.querySelector('input');
			select.value = ''; // Сбрасываем select на первый пустой option
			input.value = ''; // Очищаем input экрана (в HTML нет value)
		});

		// Сбрасываем input[type=text] в блоках услуг к исходным значениям
		percentItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const input = item.querySelector('input[type=text]');
			check.checked = false;
			// Восстанавливаем исходное значение из HTML
			const defaultItem = defaultValues.percentInputs.find(d => d.element === input);
			if (defaultItem) {
				input.value = defaultItem.value;
			}
		});

		numberItems.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]');
			const input = item.querySelector('input[type=text]');
			check.checked = false;
			// Восстанавливаем исходное значение из HTML
			const defaultItem = defaultValues.numberInputs.find(d => d.element === input);
			if (defaultItem) {
				input.value = defaultItem.value;
			}
		});

		// Сбрасываем CMS
		cmsCheckbox.checked = false;
		hiddenCmsBlock.style.display = 'none';
		cmsSelect.value = '';
		cmsOtherBlock.style.display = 'none';
		cmsOtherInput.value = '';

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

		// Сбрасываем значения всех полей ввода к исходным
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
		this.cmsPrice = 0;

		// Меняем видимость кнопок
		startBtn.style.display = 'block';
		resetBtn.style.display = 'none';
	}
};

// ---------- Запуск приложения ----------
appData.init();
