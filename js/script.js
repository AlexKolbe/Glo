// Функция-конструктор DomElement
function DomElement(selector, height, width, bg, fontSize) {
	// Свойства
	this.selector = selector;
	this.height = height;
	this.width = width;
	this.bg = bg;
	this.fontSize = fontSize;

	// Метод для создания элемента
	this.createElement = function () {
		let element;
		let text = 'Это текст внутри созданного элемента';

		// Проверяем первый символ selector
		if (this.selector[0] === '.') {
			// Создаем div с классом (убираем точку из названия класса)
			element = document.createElement('div');
			element.className = this.selector.slice(1);
		} else if (this.selector[0] === '#') {
			// Создаем параграф с id (убираем решетку из названия id)
			element = document.createElement('p');
			element.id = this.selector.slice(1);
		} else {
			// Если selector не начинается с . или #, создаем обычный div
			element = document.createElement('div');
			console.log('Селектор должен начинаться с . или #');
		}

		// Устанавливаем стили с помощью cssText
		element.style.cssText = `
            height: ${this.height}px;
            width: ${this.width}px;
            background: ${this.bg};
            font-size: ${this.fontSize}px;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

		// Добавляем текст в элемент
		element.textContent = text;

		// Добавляем элемент на страницу (в контейнер)
		const container = document.querySelector('.container');
		if (container) {
			container.appendChild(element);
		} else {
			// Если нет контейнера, добавляем в body
			document.body.appendChild(element);
		}

		return element;
	};
}

// Создаем новые объекты на основе класса DomElement

// Пример 1: Элемент с классом (div)
const element1 = new DomElement(
	'.block',           // selector
	100,                // height
	100,                // width
	'#ff6b6b',          // bg (красный)
	16                  // fontSize
);

// Пример 2: Элемент с id (параграф)
const element2 = new DomElement(
	'#best',            // selector
	150,                // height
	300,                // width
	'#4ecdc4',          // bg (бирюзовый)
	20                  // fontSize
);

// Пример 3: Еще один элемент с классом
const element3 = new DomElement(
	'.card',            // selector
	180,                // height
	250,                // width
	'#ffe66d',          // bg (желтый)
	18                  // fontSize
);

// Вызываем методы для создания элементов на странице
element1.createElement();
element2.createElement();
element3.createElement();

// Дополнительный пример с проверкой селектора
console.log('Элементы успешно созданы!');
