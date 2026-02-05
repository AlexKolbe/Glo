'use strict';

// ---------- Объявление переменных ----------
// Получение данных от пользователя
let title = prompt("Как называется ваш проект?", "Мой проект");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = parseFloat(prompt("Сколько будет стоить данная работа?", "12000"));
let adaptive = confirm("Нужен ли адаптив на сайте?");

let service1 = prompt("Какой дополнительный тип услуги нужен? (первая услуга)", "Дизайн");
let servicePrice1 = parseFloat(prompt("Сколько это будет стоить? (первая услуга)", "5000"));

let service2 = prompt("Какой дополнительный тип услуги нужен? (вторая услуга)", "SEO");
let servicePrice2 = parseFloat(prompt("Сколько это будет стоить? (вторая услуга)", "3000"));

// Получение процента отката
let commissionPercent = parseFloat(prompt("Какой процент отката посреднику? (например: 10)", "10"));

// ---------- Объявление функций ----------

// Function expression для получения суммы дополнительных услуг
const getAllServicePrices = function () {
	return servicePrice1 + servicePrice2;
};

// Function declaration для получения полной стоимости
function getFullPrice() {
	return screenPrice + allServicePrices;
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

if (isNaN(commissionPercent) || commissionPercent < 0 || commissionPercent > 100) {
	console.warn("Введен некорректный процент отката. Используется значение по умолчанию 10%");
	commissionPercent = 10;
}

// Расчеты
let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice();
let servicePercentPrice = getServicePercentPrices();

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
