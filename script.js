'use strict';

// ---------- Объявление переменных ----------
let title;
let screens;
let screenPrice;
let adaptive;

let allServicePrices;
let fullPrice;
let servicePercentPrice;

let service1;
let service2;
let servicePrice1;
let servicePrice2;
let commissionPercent;

// ---------- Объявление функций ----------

const isNumber = function (num) {
	return !isNaN(parseFloat(num)) && isFinite(num)
}


// Получение данных от пользователя
const asking = function () {
	title = prompt("Как называется ваш проект?", "Мой проект");
	screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
	screenPrice = prompt("Сколько будет стоить данная работа?");

	// 1. Переписано получение screenPrice через do-while
	do {
		screenPrice = prompt("Сколько будет стоить данная работа?");
		if (!isNumber(screenPrice)) {
			alert("Пожалуйста, введите число!");
		}
	} while (!isNumber(screenPrice));

	screenPrice = parseFloat(screenPrice);


	adaptive = confirm("Нужен ли адаптив на сайте?");

	// Получение процента отката
	commissionPercent = parseFloat(prompt("Какой процент отката посреднику? (например: 10)", "10"));

	if (isNaN(commissionPercent) || commissionPercent < 0 || commissionPercent > 100) {
		console.warn("Введен некорректный процент отката. Используется значение по умолчанию 10%");
		commissionPercent = 10;
	}
}

// Function expression для получения суммы дополнительных услуг
const getAllServicePrices = function () {
	let sum = 0; // Добавлено объявление переменной

	for (let i = 0; i < 2; i++) {
		let priceInput;

		if (i === 0) {
			service1 = prompt("Какой дополнительный тип услуги нужен? (первая услуга)", "Дизайн");
			// 2. Добавлена проверка на число для стоимости услуги
			do {
				priceInput = prompt("Сколько это будет стоить дополнительная услуга?", "5000");
				if (!isNumber(priceInput)) {
					alert("Пожалуйста, введите число!");
				}
			} while (!isNumber(priceInput));

			servicePrice1 = parseFloat(priceInput);
			sum += servicePrice1;

		} else if (i === 1) {
			service2 = prompt("Какой дополнительный тип услуги нужен? (вторая услуга)", "SEO");
			// 2. Добавлена проверка на число для стоимости услуги
			do {
				priceInput = prompt("Сколько это будет стоить дополнительная услуга?", "5000");
				if (!isNumber(priceInput)) {
					alert("Пожалуйста, введите число!");
				}
			} while (!isNumber(priceInput));

			servicePrice2 = parseFloat(priceInput);
			sum += servicePrice2;
		}
	}
	return sum;
};

// Function declaration для получения полной стоимости
function getFullPrice() {
	// 3. Приведение типов к числам для правильных расчетов
	return parseFloat(screenPrice) + parseFloat(allServicePrices);
}

// Функция для форматирования названия
function getTitle() {
	// Удаляем начальные пробелы и преобразуем первый символ в верхний регистр, остальные в нижний
	return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

// Функция для получения стоимости за вычетом отката
function getServicePercentPrices() {
	const commissionAmount = fullPrice * (commissionPercent / 100);
	return Math.ceil(fullPrice - commissionAmount);
}

// Функция для проверки типа переменной
function showTypeOf(variable) {
	console.log(typeof variable, variable);
}

// Функция для получения сообщения о скидке
function getRollbackMessage(price) {
	if (price > 30000) {
		return "Даем скидку в 10%";
	} else if (price > 15000 && price < 30000) {
		return "Даем скидку в 5%";
	} else if (price > 0 && price < 15000) {
		return "Скидка не предусмотрена";
	} else if (price < 0) {
		return "Что то пошло не так";
	} else {
		return "Стоимость равна 0, 15000 или 30000";
	}
}

// ---------- Основной код ----------


// Расчеты
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

// Форматирование названия
title = getTitle();

// ---------- Вывод в консоль ----------

console.log(`Название проекта: ${title}`);

// Вызов функции showTypeOf для проверки типов
showTypeOf(screens);
console.log(`Типы экранов для разработки: ${screens}`);

showTypeOf(screenPrice);
console.log(`Стоимость верстки экранов: ${screenPrice}`);

showTypeOf(adaptive);
console.log(`Адаптив нужен: ${adaptive}`);

showTypeOf(service1);
showTypeOf(servicePrice1);
console.log(`Услуга 1: ${service1}, стоимость: ${servicePrice1}`);

showTypeOf(service2);
showTypeOf(servicePrice2);
console.log(`Услуга 2: ${service2}, стоимость: ${servicePrice2}`);

showTypeOf(allServicePrices);
console.log(`Стоимость всех дополнительных услуг: ${allServicePrices}`);

showTypeOf(fullPrice);
console.log(`Полная стоимость проекта: ${fullPrice}`);

showTypeOf(commissionPercent);
console.log(`Процент отката посреднику: ${commissionPercent}%`);

// Сообщение о скидке
console.log(getRollbackMessage(fullPrice));

// Итоговая стоимость
console.log(`Стоимость за вычетом отката посреднику: ${servicePercentPrice}`);
