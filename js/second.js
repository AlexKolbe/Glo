'use strict';
/* Необходимо выполнить в отдельном JS файле, подключенному к отдельной HTML странице
1) Создать переменную num со значением 266219 (тип данных число)
2) Вывести в консоль произведение (умножение) цифр этого числа
Например: число 123, при помощи javaScript получить каждую цифру ( 1, 2, 3 ) и перемножить их. Правильно использовать цикл или методы перебора.
3) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
4) Вывести в консоль первые 2 цифры полученного числа
5) В отдельном репозитории для усложненных уроков, добавить папку или ветку со вторым уроком в свой репозиторий на GitHub
*/
const num = 266219;


const result = String(String(num).split('').reduce((acc, digit) => acc * Number(digit), 1) ** 3).slice(0, 2);

console.log('Первые 2 цифры: ' + result);

/*
1). Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке. Решите задачу
 a) через if,
 b) через switch-case
 c) через многомерный массив без ифов и switch.
2). У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”, если значение “Александр” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”
 Решить задачу с помощью нескольких тернарных операторов, без использования if или switch
3). Запушить проект в репозиторий для усложненных заданий на GitHub
*/
// 1. Запрашиваем у пользователя язык
let lang = prompt('Выберите язык (введите ru или en):', 'ru');

// Проверяем корректность ввода
if (lang !== 'ru' && lang !== 'en') {
	lang = 'ru'; // значение по умолчанию
	console.log('Выбран неверный язык. Установлен русский по умолчанию.');
}

// a) через if
console.log('1.a) Решение через if:');
if (lang === 'ru') {
	console.log('Дни недели на русском: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
	console.log('Days of week in English: monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}

// b) через switch-case
console.log('\n1.b) Решение через switch-case:');
switch (lang) {
	case 'ru':
		console.log('Дни недели на русском: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
		break;
	case 'en':
		console.log('Days of week in English: monday, tuesday, wednesday, thursday, friday, saturday, sunday');
		break;
}

// c) через многомерный массив без if и switch
console.log('\n1.c) Решение через многомерный массив:');
const weekDays = {
	'ru': ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
	'en': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
};

// Проверяем, есть ли такой язык в объекте
const days = weekDays[lang];
if (days) {
	console.log(`Дни недели: ` + days.join(', '));
}

// 2. Запрашиваем имя у пользователя
const namePerson = prompt('Введите ваше имя:', 'Артем');

// Или в одну строку:
console.log('Роль: ' + namePerson === 'Артем' ? 'директор' : namePerson === 'Александр' ? 'преподаватель' : 'студент');

function processText(input) {
	// 1. Проверяем, является ли аргумент строкой
	if (typeof input !== 'string') {
		console.log('Ошибка: аргумент должен быть строкой');
		return; // Выходим из функции
	}

	// 2. Убираем пробелы в начале и конце строки
	const trimmedString = input.trim();

	// 3. Проверяем длину строки и обрезаем при необходимости
	if (trimmedString.length > 30) {
		// Берем первые 30 символов и добавляем "..."
		return trimmedString.substring(0, 30) + '...';
	}

	// 4. Если строка меньше или равна 30 символам, возвращаем как есть
	return trimmedString;
}

// Примеры использования функции:
console.log(processText('   Привет, мир!   ')); // "Привет, мир!"
console.log(processText('   Это очень длинная строка, которая точно содержит более тридцати символов   ')); // "Это очень длинная строка, ко..."
console.log(processText(123)); // "Ошибка: аргумент должен быть строкой"
console.log(processText(null)); // "Ошибка: аргумент должен быть строкой"

// lesson05-hard
// ===== НОВЫЕ ЗАДАЧИ =====

// 1) Работа с массивом
console.log('\n=== Задача 1: Массив чисел, начинающихся на 2 или 4 ===');

// Создаем массив с 7 многозначными числами в виде строк
const arr = ['12345', '24567', '38901', '42345', '56789', '23456', '45678'];

console.log('Исходный массив:', arr);
console.log('Числа, начинающиеся на 2 или 4:');

// Фильтруем и выводим числа, начинающиеся на 2 или 4
const filteredNumbers = arr.filter(num => {
	const firstDigit = num.charAt(0);
	return firstDigit === '2' || firstDigit === '4';
});

filteredNumbers.forEach(num => console.log(num));

// 2) Простые числа от 1 до 100
console.log('\n=== Задача 2: Простые числа от 1 до 100 ===');

// Функция для проверки, является ли число простым
function isPrime(number) {
	if (number <= 1) return false;
	if (number <= 3) return true;
	if (number % 2 === 0 || number % 3 === 0) return false;

	for (let i = 5; i * i <= number; i += 6) {
		if (number % i === 0 || number % (i + 2) === 0) return false;
	}
	return true;
}

// Перебираем числа от 1 до 100
for (let i = 1; i <= 100; i++) {
	if (isPrime(i)) {
		console.log(`${i} - Делители этого числа: 1 и ${i}`);
	}
}


/*
lesson09-hard

1) Выведите на страницу текущую дату и время в 2-х форматах:
	a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'
	б) '04.02.2020 - 21:05:33'

2) Для вывода в формате (а) напишите функцию, которая будет менять склонение слов в зависимости от числа, "час, часов, часа"

3) Для вывода в формате (б) напишите функцию, которая будет добавлять 0 перед значениями которые состоят из одной цифры (из 9:5:3 1.6.2019 сделает 09:05:03 01.06.2019)

4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду

*/

// Функция для склонения слов (задание 2)
function declensionWord(number, words) {
	const cases = [2, 0, 1, 1, 1, 2];
	return words[
		number % 100 > 4 && number % 100 < 20
			? 2
			: cases[number % 10 < 5 ? number % 10 : 5]
	];
}

// Функция для добавления нуля перед однозначными числами (задание 3)
function addZero(number) {
	return number < 10 ? '0' + number : number.toString();
}

// Функция для получения названия дня недели
function getDayOfWeek(date) {
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	return days[date.getDay()];
}

// Функция для получения названия месяца
function getMonthName(date) {
	const months = [
		'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
		'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
	];
	return months[date.getMonth()];
}

// Функция для форматирования даты в стиле (а)
function formatDateA(date) {
	const dayOfWeek = getDayOfWeek(date);
	const day = date.getDate();
	const month = getMonthName(date);
	const year = date.getFullYear();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const hourWord = declensionWord(hours, ['час', 'часа', 'часов']);
	const minuteWord = declensionWord(minutes, ['минута', 'минуты', 'минут']);
	const secondWord = declensionWord(seconds, ['секунда', 'секунды', 'секунд']);

	return `Сегодня ${dayOfWeek}, ${day} ${month} ${year} года, ${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;
}

// Функция для форматирования даты в стиле (б)
function formatDateB(date) {
	const day = addZero(date.getDate());
	const month = addZero(date.getMonth() + 1); // +1 потому что месяцы от 0 до 11
	const year = date.getFullYear();

	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const seconds = addZero(date.getSeconds());

	return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
}

// Функция для обновления времени на странице
function updateDateTime() {
	const now = new Date();

	// Ищем или создаем контейнеры для вывода
	let dateTimeContainerA = document.getElementById('date-time-format-a');
	let dateTimeContainerB = document.getElementById('date-time-format-b');

	// Если контейнеров нет на странице, создаем их
	if (!dateTimeContainerA) {
		dateTimeContainerA = document.createElement('div');
		dateTimeContainerA.id = 'date-time-format-a';
		document.body.appendChild(dateTimeContainerA);
	}

	if (!dateTimeContainerB) {
		dateTimeContainerB = document.createElement('div');
		dateTimeContainerB.id = 'date-time-format-b';
		document.body.appendChild(dateTimeContainerB);
	}

	// Выводим отформатированные даты
	dateTimeContainerA.textContent = formatDateA(now);
	dateTimeContainerB.textContent = formatDateB(now);
}

// Запускаем обновление каждую секунду (задание 4)
updateDateTime(); // сразу показываем время
setInterval(updateDateTime, 1000);
