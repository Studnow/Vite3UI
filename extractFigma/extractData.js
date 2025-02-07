import fs from "fs";

const figmaData = JSON.parse(fs.readFileSync("figmaData.json", "utf8"));
const TARGET_PAGE = "pc";
const FIGMA_IMAGE_BASE_URL = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/";

// Функция поиска страницы
function findPage(document, pageName) {
  return document.children.find((page) => page.name.toLowerCase() === pageName.toLowerCase());
}

// Функция извлечения данных
function extractData(node, textSet = new Set(), imageCollection = [], vectorCollection = []) {
  if (node.type === "TEXT" && node.characters) {
    let cleanedText = node.characters.replace(/[\r\n]+/g, " ").trim();
    if (cleanedText.length >= 10) {
      textSet.add(cleanedText);
    }
  }

  // Изображения PNG, JPG
  // if (node.type === "RECTANGLE" && node.fills) {
  //   const imageFill = node.fills.find((fill) => fill.type === "IMAGE" && fill.imageRef);
  //   if (imageFill) {
  //     imageCollection.push({
  //       id: node.id,
  //       name: node.name || `image_${node.id}`,
  //     });
  //   }
  // }

  // 🔥 Теперь ищем картинки ВЕЗДЕ (в том числе в FILL)
  if (node.fills) {
    const imageFill = node.fills.find((fill) => fill.type === "IMAGE" && fill.imageRef);
    if (imageFill) {
      console.log(`🎨 Fill у ${node.name || node.id}:`, JSON.stringify(node.fills, null, 2));
      images.push({ id: node.id, name: node.name || `image_${node.id}` });
    }
  }

  // Векторные иконки (SVG)
  if (node.type === "VECTOR") {
    vectorCollection.push({
      id: node.id,
      name: node.name || `vector_${node.id}`,
    });
  }

  if (node.children) {
    node.children.forEach((child) => extractData(child, textSet, imageCollection, vectorCollection));
  }

  return { textSet, imageCollection, vectorCollection };
}

// Обрабатываем страницу "pc"
const pcPage = findPage(figmaData.document, TARGET_PAGE);
if (!pcPage) {
  console.error(`Страница "${TARGET_PAGE}" не найдена.`);
  process.exit(1);
}

// Извлекаем текст, изображения и векторы
const { textSet, imageCollection, vectorCollection } = extractData(pcPage);

// Записываем текст
fs.writeFileSync("extractedText.json", JSON.stringify([...textSet], null, 2));
console.log(`Уникальный текст извлечён: ${textSet.size} строк`);

// Записываем изображения PNG/JPG
fs.writeFileSync("extractedImageIds.json", JSON.stringify(imageCollection, null, 2));
console.log(`PNG/JPG изображения извлечены: ${imageCollection.length} записей`);

// Записываем SVG-иконки
fs.writeFileSync("extractedVectors.json", JSON.stringify(vectorCollection, null, 2));
console.log(`SVG-иконки извлечены: ${vectorCollection.length} записей`);
