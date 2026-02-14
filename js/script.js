// Загружаем данные из localStorage при старте или используем пустой массив
let toDoData = [];

// Функция для сохранения данных в localStorage
const saveToLocalStorage = function () {
	localStorage.setItem('todoData', JSON.stringify(toDoData));
};

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = function () {
	const savedData = localStorage.getItem('todoData');
	if (savedData) {
		toDoData = JSON.parse(savedData);
	} else {
		toDoData = []; // Пустой массив, если данных нет
	}
	render();
};

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const render = function () {
	todoList.innerHTML = '';
	todoCompleted.innerHTML = '';

	toDoData.forEach(function (item, index) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.innerHTML =
			'<span class="text-todo">' +
			item.text +
			'</span>' +
			'<div class="todo-buttons">' +
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
			'</div>';

		if (item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		// Обработчик для кнопки завершения
		li.querySelector('.todo-complete').addEventListener('click', function () {
			item.completed = !item.completed;
			saveToLocalStorage(); // Сохраняем изменения
			render();
		});

		// Обработчик для кнопки удаления (корзина)
		li.querySelector('.todo-remove').addEventListener('click', function () {
			toDoData.splice(index, 1); // Удаляем элемент по индексу
			saveToLocalStorage(); // Сохраняем изменения
			render();
		});
	});
};

todoControl.addEventListener('submit', function (event) {
	event.preventDefault();

	// Проверяем, что поле не пустое (не только пробелы)
	const textValue = headerInput.value.trim();

	if (textValue === '') {
		return; // Не добавляем пустые дела
	}

	const newToDo = {
		text: textValue, // Используем обрезанное значение
		completed: false
	};

	toDoData.push(newToDo);
	headerInput.value = '';

	saveToLocalStorage(); // Сохраняем в localStorage
	render();
});

// Загружаем данные при загрузке страницы
loadFromLocalStorage();
