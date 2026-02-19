// Базовый класс Работник
class Employee {
	constructor(firstName, lastName, age, position, experience, hasChildren) {
		this._firstName = firstName;
		this._lastName = lastName;
		this._age = age;
		this._position = position;
		this._experience = experience;
		this._hasChildren = hasChildren;
		this._id = Date.now() + Math.random(); // Уникальный идентификатор
	}

	// Геттеры
	get firstName() {
		return this._firstName;
	}

	get lastName() {
		return this._lastName;
	}

	get age() {
		return this._age;
	}

	get position() {
		return this._position;
	}

	get experience() {
		return this._experience;
	}

	get hasChildren() {
		return this._hasChildren;
	}

	get id() {
		return this._id;
	}

	// Сеттеры
	set firstName(value) {
		this._firstName = value;
	}

	set lastName(value) {
		this._lastName = value;
	}

	set age(value) {
		if (value >= 18 && value <= 100) {
			this._age = value;
		} else {
			throw new Error('Возраст должен быть от 18 до 100 лет');
		}
	}

	set position(value) {
		this._position = value;
	}

	set experience(value) {
		this._experience = value;
	}

	set hasChildren(value) {
		this._hasChildren = value;
	}

	// Метод для получения типа сотрудника
	getType() {
		return 'Работник';
	}

	// Метод для получения дополнительной информации
	getAdditionalInfo() {
		return '';
	}

	// Метод для удаления сотрудника из массива
	static deleteFromArray(array, id) {
		return array.filter(employee => employee.id !== id);
	}

	// Метод для преобразования в объект для сохранения
	toJSON() {
		return {
			id: this._id,
			type: this.getType(),
			firstName: this._firstName,
			lastName: this._lastName,
			age: this._age,
			position: this._position,
			experience: this._experience,
			hasChildren: this._hasChildren
		};
	}
}

// Класс Слесарь (наследник Employee)
class Mechanic extends Employee {
	constructor(firstName, lastName, age, position, experience, hasChildren, specialization, toolCount) {
		super(firstName, lastName, age, position, experience, hasChildren);
		this._specialization = specialization;
		this._toolCount = toolCount;
	}

	// Геттеры
	get specialization() {
		return this._specialization;
	}

	get toolCount() {
		return this._toolCount;
	}

	// Сеттеры
	set specialization(value) {
		this._specialization = value;
	}

	set toolCount(value) {
		this._toolCount = value;
	}

	// Переопределение метода получения типа
	getType() {
		return 'Слесарь';
	}

	// Переопределение метода получения дополнительной информации
	getAdditionalInfo() {
		return `Специализация: ${this._specialization}, Инструментов: ${this._toolCount}`;
	}

	// Переопределение метода toJSON
	toJSON() {
		return {
			...super.toJSON(),
			specialization: this._specialization,
			toolCount: this._toolCount
		};
	}
}

// Класс Водитель (наследник Employee)
class Driver extends Employee {
	constructor(firstName, lastName, age, position, experience, hasChildren, licenseCategory, carModel) {
		super(firstName, lastName, age, position, experience, hasChildren);
		this._licenseCategory = licenseCategory;
		this._carModel = carModel;
	}

	// Геттеры
	get licenseCategory() {
		return this._licenseCategory;
	}

	get carModel() {
		return this._carModel;
	}

	// Сеттеры
	set licenseCategory(value) {
		this._licenseCategory = value;
	}

	set carModel(value) {
		this._carModel = value;
	}

	// Переопределение метода получения типа
	getType() {
		return 'Водитель';
	}

	// Переопределение метода получения дополнительной информации
	getAdditionalInfo() {
		return `Категория: ${this._licenseCategory}, Автомобиль: ${this._carModel}`;
	}

	// Переопределение метода toJSON
	toJSON() {
		return {
			...super.toJSON(),
			licenseCategory: this._licenseCategory,
			carModel: this._carModel
		};
	}
}

// Основной класс для управления приложением
class EmployeeManager {
	constructor() {
		this.employees = [];
		this.init();
	}

	// Инициализация приложения
	init() {
		this.loadFromStorage();
		this.setupEventListeners();
		this.renderTable();
	}

	// Настройка обработчиков событий
	setupEventListeners() {
		const form = document.getElementById('employeeForm');
		const typeSelect = document.getElementById('type');

		form.addEventListener('submit', (e) => this.handleSubmit(e));
		typeSelect.addEventListener('change', () => this.toggleFields());

		// Загрузка данных при обновлении страницы
		window.addEventListener('load', () => {
			this.loadFromStorage();
			this.renderTable();
		});
	}

	// Переключение полей в зависимости от выбранного типа
	toggleFields() {
		const type = document.getElementById('type').value;
		const mechanicFields = document.querySelectorAll('.mechanic-field');
		const driverFields = document.querySelectorAll('.driver-field');

		mechanicFields.forEach(field => field.style.display = 'none');
		driverFields.forEach(field => field.style.display = 'none');

		if (type === 'mechanic') {
			mechanicFields.forEach(field => field.style.display = 'block');
		} else if (type === 'driver') {
			driverFields.forEach(field => field.style.display = 'block');
		}
	}

	// Обработка отправки формы
	handleSubmit(e) {
		e.preventDefault();

		try {
			const type = document.getElementById('type').value;
			const firstName = document.getElementById('firstName').value;
			const lastName = document.getElementById('lastName').value;
			const age = parseInt(document.getElementById('age').value);
			const position = document.getElementById('position').value;
			const experience = parseInt(document.getElementById('experience').value);
			const hasChildren = document.getElementById('hasChildren').checked;

			// Валидация
			if (!type || !firstName || !lastName || !age || !position || !experience) {
				throw new Error('Все поля должны быть заполнены');
			}

			let employee;

			if (type === 'mechanic') {
				const specialization = document.getElementById('specialization').value;
				const toolCount = parseInt(document.getElementById('toolCount').value);

				if (!specialization || !toolCount) {
					throw new Error('Заполните все поля для слесаря');
				}

				employee = new Mechanic(firstName, lastName, age, position, experience, hasChildren, specialization, toolCount);
			} else if (type === 'driver') {
				const licenseCategory = document.getElementById('licenseCategory').value;
				const carModel = document.getElementById('carModel').value;

				if (!licenseCategory || !carModel) {
					throw new Error('Заполните все поля для водителя');
				}

				employee = new Driver(firstName, lastName, age, position, experience, hasChildren, licenseCategory, carModel);
			}

			if (employee) {
				this.employees.push(employee);
				this.saveToStorage();
				this.renderTable();
				this.clearForm();
				this.showMessage('Сотрудник успешно добавлен!', 'success');
			}
		} catch (error) {
			this.showMessage(error.message, 'error');
		}
	}

	// Очистка формы
	clearForm() {
		document.getElementById('employeeForm').reset();
		this.toggleFields();
	}

	// Сохранение в localStorage
	saveToStorage() {
		const employeesData = this.employees.map(emp => emp.toJSON());
		localStorage.setItem('employees', JSON.stringify(employeesData));
	}

	// Загрузка из localStorage
	loadFromStorage() {
		const savedData = localStorage.getItem('employees');
		if (savedData) {
			const employeesData = JSON.parse(savedData);
			this.employees = employeesData.map(data => {
				if (data.type === 'Слесарь') {
					return new Mechanic(
						data.firstName,
						data.lastName,
						data.age,
						data.position,
						data.experience,
						data.hasChildren,
						data.specialization,
						data.toolCount
					);
				} else if (data.type === 'Водитель') {
					return new Driver(
						data.firstName,
						data.lastName,
						data.age,
						data.position,
						data.experience,
						data.hasChildren,
						data.licenseCategory,
						data.carModel
					);
				}
			});
		}
	}

	// Удаление сотрудника
	deleteEmployee(id) {
		this.employees = Employee.deleteFromArray(this.employees, id);
		this.saveToStorage();
		this.renderTable();
		this.showMessage('Сотрудник удален', 'success');
	}

	// Отображение таблицы
	renderTable() {
		const tbody = document.getElementById('tableBody');
		tbody.innerHTML = '';

		this.employees.forEach(employee => {
			const row = tbody.insertRow();

			row.innerHTML = `
                <td>${employee.getType()}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.age}</td>
                <td>${employee.position}</td>
                <td>${employee.experience}</td>
                <td>${employee.hasChildren ? 'Да' : 'Нет'}</td>
                <td>${employee.getAdditionalInfo()}</td>
                <td>
                    <button class="delete-btn" onclick="employeeManager.deleteEmployee(${employee.id})">
                        Удалить
                    </button>
                </td>
            `;
		});
	}

	// Показ сообщений
	showMessage(message, type) {
		const messageDiv = document.createElement('div');
		messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
		messageDiv.textContent = message;

		const form = document.getElementById('employeeForm');
		form.appendChild(messageDiv);

		setTimeout(() => {
			messageDiv.remove();
		}, 3000);
	}
}

// Создание экземпляра менеджера
const employeeManager = new EmployeeManager();
