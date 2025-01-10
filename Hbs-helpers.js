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

function generateCards(count) {
  return Array.from({ length: count }, (_, i) => ({
    title: `Card ${i + 1}`,
    desc: `Description for card ${i + 1}`,
    img: `/img/card${i + 1}.jpg`,
  }));
}

export const cards = generateCards(10); // Генерация 10 карточек - тестовые данные для проверки наполнения компонентов контентом


export default Handlebars;
