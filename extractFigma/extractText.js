import fs from "fs";

const figmaData = JSON.parse(fs.readFileSync("figmaData.json", "utf-8"));

// Функция для фильтрации текста (например, убираем технические тексты)
function extractRelevantText(nodes, texts = []) {
  nodes.forEach((node) => {
    if (node.type === "TEXT" && node.characters) {
      const textContent = node.characters.trim();

      // Фильтры: убираем пустые строки, слишком короткие фразы или служебные слова
      if (textContent.length > 2 && !/^(Copy|Paste|Placeholder|Lorem)$/i.test(textContent)) {
        texts.push(textContent);
      }
    }
    if (node.children) {
      extractRelevantText(node.children, texts); // Рекурсивно проверяем дочерние элементы
    }
  });
  return texts;
}

const filteredTexts = extractRelevantText(figmaData.document.children);

fs.writeFileSync("contextData.json", JSON.stringify(filteredTexts, null, 2));
console.log("Отфильтрованные тексты сохранены в contextData.json");
