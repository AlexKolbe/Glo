'use strict';

// ---------- Объявление объекта appData ----------
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();

        appData.logger();
    },

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    // Проверка: содержит ли строка хотя бы одну букву (не только цифры)
    isText: function (str) {
        if (!str || typeof str !== 'string') return false;
        
        // Проверяем, содержит ли строка хотя бы одну букву (русскую или английскую)
        const hasLetter = /[a-zA-Zа-яА-ЯёЁ]/.test(str);
        
        // Проверяем, состоит ли строка ТОЛЬКО из цифр и пробелов
        const onlyDigitsAndSpaces = /^[\d\s]+$/.test(str);
        
        return hasLetter && !onlyDigitsAndSpaces;
    },

    // Проверка: содержит ли строка ТОЛЬКО цифры (число)
    isOnlyDigits: function (str) {
        if (!str || typeof str !== 'string') return false;
        
        // Удаляем все пробелы и проверяем, состоит ли только из цифр
        const trimmedStr = str.replace(/\s/g, '');
        return /^\d+$/.test(trimmedStr) || /^\d+\.?\d*$/.test(trimmedStr);
    },

    // Генерация уникального ключа для услуги
    generateUniqueKey: function (baseName, obj) {
        let key = baseName;
        let counter = 1;
        
        // Если ключ уже существует, добавляем суффикс
        while (obj.hasOwnProperty(key)) {
            key = `${baseName}_${counter}`;
            counter++;
        }
        
        return key;
    },

    // Получение данных от пользователя
    asking: function () {
        // Проверка названия проекта
        do {
            appData.title = prompt("Как называется ваш проект?", "Мой проект");
        } while (!appData.isText(appData.title))

        // Получение информации о типах экранов
        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            // Проверка типа экрана (текст с буквами)
            do {
                name = prompt(`Какие типы экранов нужно разработать? (Экран ${i + 1})`);
            } while (!appData.isText(name))

            // Проверка цены (только цифры)
            do {
                price = prompt(`Сколько будет стоить данная работа? (Экран ${i + 1})`);
            } while (!appData.isOnlyDigits(price))

            appData.screens.push({
                id: i,
                name: name,
                price: +price
            })
        }

        // Получение информации о дополнительных услугах
        for (let i = 0; i < 2; i++) {
            let name = '';
            let price = 0;

            // Проверка названия услуги (текст с буквами)
            do {
                name = prompt(`Какой дополнительный тип услуги нужен? (Услуга ${i + 1})`);
            } while (!appData.isText(name))

            // Проверка цены услуги (только цифры)
            do {
                price = prompt(`Сколько это будет стоить? (Услуга ${i + 1})`);
            } while (!appData.isOnlyDigits(price))

            // Генерируем уникальный ключ для услуги
            const uniqueKey = appData.generateUniqueKey(name, appData.services);
            appData.services[uniqueKey] = +price;
        }

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {
        // Используем reduce для подсчета суммы цен экранов
        appData.screenPrice = appData.screens.reduce((sum, screen) => {
            return sum + +screen.price;
        }, 0);

        // Подсчет суммы дополнительных услуг
        appData.allServicePrices = 0;
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    getServicePercentPrices: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },

    getTitle: function () {
        // Удаляем начальные пробелы и преобразуем первый символ в верхний регистр, остальные в нижний
        appData.title = appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },

    // Функция для получения сообщения о скидке
    getRollbackMessage: function (price) {
        if (price > 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price <= 30000) {
            return "Даем скидку в 5%";
        } else if (price > 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что то пошло не так";
        } else {
            return "Стоимость равна 0, 15000 или 30000";
        }
    },

    logger: function () {
        console.log('Общая стоимость: ', appData.fullPrice);
        console.log('Стоимость со скидкой: ', appData.servicePercentPrice);
        console.log('Стоимость экранов: ', appData.screenPrice);
        console.log('Типы экранов: ', appData.screens);
        console.log('Дополнительные услуги: ', appData.services);
        console.log('Название проекта: ', appData.title);
        console.log('Сообщение о скидке: ', appData.getRollbackMessage(appData.fullPrice));
    }
};

// ---------- Запуск приложения ----------
appData.start();