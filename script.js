alert("Hello World in alert!");
console.log("Hello in console!"); // this is comment
/*
5) В файле скрипта создать переменные:

 title,
 screens,
 screenPrice,
 rollback,
 fullPrice,
 adaptive
*/

alert("Hello World in alert 2!");
alert("Hello World in alert 2!");


let title = "Glo";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 123;
let rollback = 55;
let fullPrice = 15;
let adaptive = false;
/*
1) Следующим переменным присвоить значения

 title- строка с названием проекта,
 screens - строка с названиями типов экранов через запятую ("Простые, Сложные, Интерактивные"),
 screenPrice- любое число,
 rollback - любое число от 1 до 100,
 fullPrice- любое число (сколько хотите заработать),
 adaptive- булевое значение
*/

console.log(title);
console.log(fullPrice);
console.log(adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей/ долларов/гривен/юани");
console.log("Стоимость разработки сайта " + fullPrice + " рублей/ долларов/гривен/юани");
console.log(screens.toLocaleLowerCase().split(', '));
console.log(fullPrice * (rollback / 100));

/*
2) Используя методы и свойства:

Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
Вывести в консоль длину строки из переменной screens
Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))



3) Проверить, чтобы все работало и не было ошибок в консоли 4) Добавить папку или ветку со вторым уроком в свой репозиторий на GitHub
*/
