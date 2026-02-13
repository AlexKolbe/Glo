/*
Скачать архив, прикрепленный к уроку.

1) Повесить на кнопку обработчик события click и реализовать такой функционал:
В input[type=text] можно ввести цвет: red, green, blue и так далее.
По нажатию на кнопку необходимо брать этот цвет и добавлять его свойству style="backgroundColor: " квадрата
Работать должно так: ввели в input[type=text] yellow, по нажатию на кнопку значение input[type=text] попадает в свойство style="backgroundColor: yellow" и фон квадрата должен поменяться

2) В кружке (который внутри квадрата) есть кнопка. Дать ей свойство style="display: none; "

3) Повесить на input[type=range] обработчик события input и реализовать такой функционал:

при каждом изменении положения ползунка значение input[type=range] необходимо заносить в свойства ширины и высоты кружка (который внутри квадрата) (height и width) (в процентах!!)
*/

// 1) Кнопка для изменения цвета квадрата
const btn = document.getElementById('btn');
const textInput = document.getElementById('text');
const square = document.getElementById('square');

btn.addEventListener('click', function () {
	const color = textInput.value.trim();
	square.style.backgroundColor = color;
});

// 2) Скрываем кнопку внутри круга
const eBtn = document.getElementById('e_btn');
eBtn.style.display = 'none';

// 3) Range input - изменение размера кружка
const range = document.getElementById('range');
const rangeSpan = document.getElementById('range-span');
const circle = document.getElementById('circle');

range.addEventListener('input', function () {
	const value = range.value;
	rangeSpan.textContent = value;
	circle.style.width = value + '%';
	circle.style.height = value + '%';
});


