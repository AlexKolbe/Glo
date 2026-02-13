/*
Используя только файл скрипта выполнить такие действия:

Восстановить порядок книг.
Заменить картинку заднего фона на другую из папки image
Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
Удалить рекламу со страницы
Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

Проверить, чтобы все работало и не было ошибок в консоли
*/

// Восстанавливаем порядок книг (сортировка по номеру книги)
function sortBooks() {
	const booksContainer = document.querySelector('.books');
	const books = Array.from(booksContainer.children);

	// Сортируем книги по номеру (извлекаем цифру из заголовка)
	books.sort((a, b) => {
		const numA = parseInt(a.querySelector('h2').textContent.match(/\d+/)[0]);
		const numB = parseInt(b.querySelector('h2').textContent.match(/\d+/)[0]);
		return numA - numB;
	});

	// Удаляем все книги и добавляем в правильном порядке
	books.forEach(book => booksContainer.appendChild(book));
}

// Меняем фоновое изображение
function changeBackground() {
	// Можно выбрать любую картинку из папки image
	// Например: 'closed_book.jpg', 'open_book.jpg', 'book_shelf.jpg' и т.д.
	document.body.style.backgroundImage = 'url("./image/closed_book.jpg")';
}

// Исправляем заголовок третьей книги
function fixBook3Title() {
	const bookTitles = document.querySelectorAll('.book h2 a');
	// Ищем книгу с неправильным заголовком
	bookTitles.forEach(title => {
		if (title.textContent.includes('Пропопипы')) {
			title.textContent = 'Книга 3. this и Прототипы Объектов';
		}
	});
}

// Удаляем рекламу
function removeAdv() {
	const adv = document.querySelector('.adv');
	if (adv) adv.remove();
}

// Восстанавливаем порядок глав во второй книге
function fixBook2Chapters() {
	const books = document.querySelectorAll('.book');
	const book2 = books[1]; // Вторая книга (индекс 1 после сортировки)

	if (book2) {
		const chapters = Array.from(book2.querySelectorAll('li'));
		// Правильный порядок глав из условия задачи
		const correctOrder = [
			'Введение',
			'Предисловие',
			'Глава 1: Введение в программирование',
			'Глава 2: Введение в JavaScript',
			'Глава 3: Введение в "Вы не знаете JavaScript"',
			'Приложение A: Благодарности!'
		];

		const ul = book2.querySelector('ul');
		ul.innerHTML = '';
		correctOrder.forEach(text => {
			const li = document.createElement('li');
			li.className = 'chapter';
			li.textContent = text;
			ul.appendChild(li);
		});
	}
}

// Восстанавливаем порядок глав в пятой книге
function fixBook5Chapters() {
	const books = document.querySelectorAll('.book');
	const book5 = books[4]; // Пятая книга (индекс 4 после сортировки)

	if (book5) {
		const chapters = Array.from(book5.querySelectorAll('li'));
		// Правильный порядок глав из условия задачи
		const correctOrder = [
			'Введение',
			'Предисловие',
			'Глава 1: Асинхронность: Сейчас и Тогда',
			'Глава 2: Колбеки',
			'Глава 3: Обещания',
			'Глава 4: Генераторы',
			'Глава 5: Производительность программы',
			'Глава 6: Бенчмаркинг и настройка',
			'Приложение A: Библиотека: asynquence',
			'Приложение B: Расширенные асинхронные шаблоны',
			'Приложение C: Благодарности!'
		];

		const ul = book5.querySelector('ul');
		ul.innerHTML = '';
		correctOrder.forEach(text => {
			const li = document.createElement('li');
			li.textContent = text;
			ul.appendChild(li);
		});
	}
}

// Добавляем главу в шестую книгу
function addChapterToBook6() {
	const books = document.querySelectorAll('.book');
	const book6 = books[5]; // Шестая книга (индекс 5 после сортировки)

	if (book6) {
		const ul = book6.querySelector('ul');
		const chapters = Array.from(ul.children);

		// Создаем новую главу
		const newChapter = document.createElement('li');
		newChapter.textContent = 'Глава 8: За пределами ES6';

		// Вставляем после Главы 7
		let inserted = false;
		for (let i = 0; i < chapters.length; i++) {
			if (chapters[i].textContent.includes('Глава 7:')) {
				chapters[i].insertAdjacentElement('afterend', newChapter);
				inserted = true;
				break;
			}
		}

		// Если Глава 7 не найдена, добавляем в конец
		if (!inserted) {
			ul.appendChild(newChapter);
		}
	}
}

// Основная функция
function main() {
	try {
		sortBooks();
		changeBackground();
		fixBook3Title();
		removeAdv();
		fixBook2Chapters();
		fixBook5Chapters();
		addChapterToBook6();
		console.log('Все операции выполнены успешно!');
	} catch (error) {
		console.error('Произошла ошибка:', error);
	}
}

// Запускаем после полной загрузки DOM
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', main);
} else {
	// DOM уже загружен
	main();
}
