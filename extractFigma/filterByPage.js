import fs from "fs";

// Загружаем данные макета
const figmaData = JSON.parse(fs.readFileSync("figmaData.json", "utf8"));

// Функция для извлечения изображений только с нужной страницы (например, PC)
function extractImageIdsFromPage(node, pageName, images = []) {
  if (node.type === "CANVAS" && node.name.toLowerCase().includes(pageName.toLowerCase())) {
    console.log(`Обрабатывается страница: ${node.name}`);

    if (node.children) {
      node.children.forEach((child) => {
        if (child.fills && child.fills.some((fill) => fill.type === "IMAGE")) {
          images.push(child.id);
        }
        if (child.children) extractImageIdsFromPage(child, pageName, images);
      });
    }
  }

  if (node.children && node.type !== "CANVAS") {
    node.children.forEach((child) => extractImageIdsFromPage(child, pageName, images));
  }

  return images;
}

// Запускаем функцию для страницы PC
const imagesFromPC = extractImageIdsFromPage(figmaData.document, "PC");

// Сохраняем результаты
fs.writeFileSync("pcImageIds.json", JSON.stringify(imagesFromPC, null, 2));

console.log(`Извлечено изображений для страницы PC: ${imagesFromPC.length}`);

function findRectangles(nodes, results = []) {
  nodes.forEach((node) => {
    if (node.type === "RECTANGLE") {
      results.push(node);
    }
    if (node.children && node.children.length > 0) {
      findRectangles(node.children, results); // Рекурсивный вызов для вложенных элементов
    }
  });
  return results;
}

const pageName = "PC";
const page = figmaData.document.children.find((page) => page.name === pageName);

if (!page) {
  console.log(`Страница "${pageName}" не найдена.`);
} else {
  console.log(`Обрабатывается страница: ${pageName}`);
  console.log(`Количество узлов на странице: ${page.children.length}`);

  // Используем рекурсивную функцию для поиска всех изображений
  const imageNodes = findRectangles(page.children);

  console.log(`Извлечено изображений для страницы ${pageName}: ${imageNodes.length}`);
  imageNodes.forEach((img) => {
    console.log(
      `ID: ${img.id}, Name: ${img.name}, Type: ${img.type}, Width: ${img.absoluteBoundingBox.width}, Height: ${img.absoluteBoundingBox.height}`
    );
  });
  const minWidth = 50;
  const minHeight = 50;
  
  const uniqueImages = [];
  const seenNames = new Set();
  
  imageNodes.forEach((img) => {
    if (img.absoluteBoundingBox.width > minWidth && img.absoluteBoundingBox.height > minHeight) {
      if (!seenNames.has(img.name)) {
        seenNames.add(img.name);
        uniqueImages.push(img);
      }
    }
  });
  
  console.log(`Финальное количество изображений после фильтрации: ${uniqueImages.length}`);
  uniqueImages.forEach((img) => {
    console.log(
      `ID: ${img.id}, Name: ${img.name}, Size: ${img.absoluteBoundingBox.width}x${img.absoluteBoundingBox.height}`
    );
  });
}

