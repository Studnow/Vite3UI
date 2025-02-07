// handlebars-helpers.js
import Handlebars from "handlebars";

// Регистрируем кастомный хелпер
Handlebars.registerHelper("times", function (n, block) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += block.fn({ index: i });
  }
  return result;
});

// Проверка, является ли значение массивом
Handlebars.registerHelper('isArray', function (value, options) {
  if (Array.isArray(value)) {
    return options.fn(this); // Выполняем блок {{#isArray}}
  } else {
    return options.inverse(this); // Выполняем блок {{else}}
  }
});

export function generateCards(count) {
  return Array.from({ length: count }, (_, i) => ({
    title: `Card ${i + 1}`,
    desc: `Description for card ${i + 1}`,
    img: `/Placeholder.png`,
    btn: `Don't press it!`
  }));
}

// export const cards = generateCards(10); // Генерация 10 карточек - тестовые данные для проверки наполнения компонентов контентом

Handlebars.registerHelper("incrementedIndex", function (index) {
  return index + 1;
});

export default Handlebars;
