'use strict';


let title = prompt("Как называется ваш проект?", "Мой проект");
console.log(`Название проекта: ` + title);

let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
console.log(`Типы экранов: ` + screens);

let screenPrice = parseFloat(prompt("Сколько будет стоить данная работа?", "12000"));
console.log(`Стоимость работы: ` + screenPrice);

let adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(`Адаптив нужен: ` + adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен? (первая услуга)", "Дизайн");
let servicePrice1 = parseFloat(prompt("Сколько это будет стоить? (первая услуга)", "5000"));

let service2 = prompt("Какой дополнительный тип услуги нужен? (вторая услуга)", "SEO");
let servicePrice2 = parseFloat(prompt("Сколько это будет стоить? (вторая услуга)", "3000"));

console.log(`Услуга 1: ` + service1`, стоимость: ` + servicePrice1);
console.log(`Услуга 2: ` + service2`, стоимость: ` + servicePrice2);

fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(`Полная стоимость: ` + fullPrice);

let commissionPercent = parseFloat(prompt("Какой процент отката посреднику? (например: 10)", "10"));

if (isNaN(commissionPercent) || commissionPercent < 0 || commissionPercent > 100) {
	console.warn("Введен некорректный процент отката. Используется значение по умолчанию 10%");
	commissionPercent = 10;
}

let commissionAmount = fullPrice * (commissionPercent / 100);
let servicePercentPrice = Math.ceil(fullPrice - commissionAmount);

console.log(`Процент отката: ` + commissionPercent + `%`);
console.log(`Сумма отката: ` + commissionAmount);
console.log(`Стоимость за вычетом отката: ` + servicePercentPrice);

console.log("\n--- Расчет скидки ---");

if (fullPrice > 30000) {
	console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice < 30000) {
	console.log("Даем скидку в 5%");
} else if (fullPrice > 0 && fullPrice < 15000) {
	console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
	console.log("Что то пошло не так");
} else {
	console.log("Стоимость равна 0, 15000 или 30000");
}
