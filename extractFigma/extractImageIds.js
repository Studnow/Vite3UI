// import fs from "fs";

// const figmaData = JSON.parse(fs.readFileSync("figmaData.json", "utf-8"));

// // Функция для поиска элементов с изображениями
// function extractImageIds(nodes, ids = []) {
//   nodes.forEach((node) => {
//     if (node.type === "RECTANGLE" || node.type === "IMAGE") {
//       ids.push(node.id); // Добавляем ID элементов с изображениями
//     }
//     if (node.children) {
//       extractImageIds(node.children, ids);
//     }
//   });
//   return ids;
// }

// const imageIds = extractImageIds(figmaData.document.children);

// // Сохраняем ID для дальнейшего использования
// fs.writeFileSync("imageIds.json", JSON.stringify(imageIds, null, 2));
// console.log("ID изображений сохранены в imageIds.json");

// ВЕРСИЯ 2


import fs from "fs";

// Загружаем полный JSON из Figma
const figmaData = JSON.parse(fs.readFileSync("figmaData.json", "utf-8"));

// Рекурсивная функция для обхода всех узлов
function extractImageIds(node, images = []) {
  if (node.fills && node.fills.some((fill) => fill.type === "IMAGE")) {
    const width = node.absoluteBoundingBox?.width || 0;
    const height = node.absoluteBoundingBox?.height || 0;

    // Преобразуем имя слоя в нижний регистр для удобства фильтрации
    const nodeName = node.name.toLowerCase();
    const nodeType = node.type; // Получаем тип объекта

    // Выводим информацию об объекте
    console.log(`ID: ${node.id}, Name: ${nodeName}, Type: ${nodeType}, Width: ${width}, Height: ${height}`);

    // Фильтруем по имени: исключаем фоны и иконки
    if (!nodeName.includes("bg") && !nodeName.includes("background") && !nodeName.includes("icon")) {
      images.push(node.id);
    }
    // Исключаем иконки (VECTOR) и большие фоны (по размеру)
    if (nodeType !== "VECTOR" && !(width > 2000 || height > 2000)) {
      images.push(node.id);
    }

    // Оставляем только изображения больше 50x50px
    if (width > 50 && height > 50) {
      images.push(node.id);
    }
  }

  if (node.children) {
    node.children.forEach((child) => extractImageIds(child, images));
  }

  if (node.name && node.name.toLowerCase().includes("pc")) {
    console.log(`Обрабатывается страница: ${node.name}`);

    // Извлекаем изображения на этой странице
    if (node.children) {
      node.children.forEach((child) => {
        if (child.fills && child.fills.some((fill) => fill.type === "IMAGE")) {
          images.push(child.id);
        }
        if (child.children) extractImageIds(child, images); // Рекурсия для вложенных элементов
      });
    }
  }

  // Продолжаем искать, если это не страница
  if (node.children && !node.name.toLowerCase().includes("pc")) {
    node.children.forEach((child) => extractImageIds(child, images));
  }

  return images;
}

const imageIds = extractImageIds(figmaData.document);

// Сохраняем только нужные ID
fs.writeFileSync("filteredImageIds.json", JSON.stringify(imageIds, null, 2));
console.log(`Извлечено ${imageIds.length} изображений.`);

const uniqueImageIds = [...new Set(imageIds)];
fs.writeFileSync("uniqueImageIds.json", JSON.stringify(uniqueImageIds, null, 2));
console.log(`Уникальных изображений: ${uniqueImageIds.length}`);

// ВЕРСИЯ 3  проверка одной страницы макета

// function extractImageIds(node, images = []) {
//   // Проверяем, если это страница PC
//   if (node.name && node.name.toLowerCase().includes("pc")) {
//     console.log(`Обрабатывается страница: ${node.name}`);

//     // Извлекаем изображения на этой странице
//     if (node.children) {
//       node.children.forEach((child) => {
//         if (child.fills && child.fills.some((fill) => fill.type === "IMAGE")) {
//           images.push(child.id);
//         }
//         if (child.children) extractImageIds(child, images); // Рекурсия для вложенных элементов
//       });
//     }
//   }

//   // Продолжаем искать, если это не страница
//   if (node.children && !node.name.toLowerCase().includes("pc")) {
//     node.children.forEach((child) => extractImageIds(child, images));
//   }

//   return images;
// }
