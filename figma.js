import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";

import keys from "./keys.js";

const FIGMA_API_KEY = keys.API;
const FILE_KEY = keys.FILE;
const PAGE = keys.PAGE;

const TARGET_PAGE = PAGE;
const IMAGE_DIR = "images";
const ICON_DIR = "icons";
const FIGMA_IMAGE_BASE_URL = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/";
const existingHashes = new Set(); // Храним хэши загруженных изображений

if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, { recursive: true, force: true });
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Очистка папок перед загрузкой
clearDirectory(IMAGE_DIR);
clearDirectory(ICON_DIR);


async function fetchFigmaData() {
  const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: { "X-Figma-Token": FIGMA_API_KEY },
  });
  return response.ok ? response.json() : null;
}

function findPage(document, pageName) {
  return document.children.find((page) => page.name.toLowerCase() === pageName.toLowerCase());
}

function extractData(node, textSet = new Set(), images = [], vectors = []) {
  if (node.type === "TEXT" && node.characters) {
    let cleanedText = node.characters.replace(/\s+/g, " ").trim();
    if (cleanedText.length >= 10) textSet.add(cleanedText);
  }

  // 🔥 ищем картинки
  if (node.fills) {
    node.fills.forEach((fill) => {
      if (fill.type === "IMAGE" && fill.imageRef) {
        images.push({ id: node.id, name: node.name || `image_${node.id}` });
      }
    });
  }

  // // ищем SVG
  // if (node.type === "VECTOR") {
  //   const { width, height } = node.absoluteBoundingBox;
  //   if (width > 5 && height > 5) {
  //     // Убираем очень мелкие элементы
  //     vectors.push({ id: node.id, name: node.name || `vector_${node.id}` });
  //   }
  // }

  // // SVG Group
  // if (node.type === "GROUP") {
  //   const groupVectors = node.children.filter((child) => child.type === "VECTOR");

  //   if (groupVectors.length > 0) {
  //     vectors.push({ id: node.id, name: node.name || `group_${node.id}` });
  //   }
  // }

  // SVG
  if (node.type === "FRAME" || node.type === "GROUP") {
    const hasVector = node.children.some((child) => child.type === "VECTOR" || child.type === "GROUP");

    if (
      hasVector &&
      node.absoluteBoundingBox &&
      node.absoluteBoundingBox.width <= 300 &&
      node.absoluteBoundingBox.height <= 300
    ) {
      vectors.push({ id: node.id, name: node.name || `icon_${node.id}` });
    }
  }

  if (node.children) node.children.forEach((child) => extractData(child, textSet, images, vectors));
  return { textSet, images, vectors };
}

async function fetchImageUrls(imageIds, format = "png") {
  const ids = imageIds.map((img) => img.id).join(",");
  const response = await fetch(`https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=${format}`, {
    headers: { "X-Figma-Token": FIGMA_API_KEY },
  });
  return response.ok ? (await response.json()).images : {};
}

function sanitizeFileName(name) {
  return name
    .replace(/[\/\\?%*:|"<>]/g, "_") // Запрещённые символы → "_"
    .replace(/\s*\/\s*/g, "_") // Знаки "/" и пробелы вокруг → "_"
    .replace(/\s+/g, "_") // Лишние пробелы → "_"
    .replace(/_+/g, "_") // Повторяющиеся "_" → один "_"
    .trim(); // Убираем пробелы в начале/конце
}

async function downloadImage(name, url, folder) {
  const response = await fetch(url);
  if (!response.ok) return console.error(`Ошибка: ${name}`);

  const ext = folder === ICON_DIR ? ".svg" : ".png"; // 🛠 Фикс расширения!
  const safeName = sanitizeFileName(name); // 🛠 Очистка имени файла
  let filePath = path.join(folder, `${safeName}${ext}`);
  const buffer = await response.arrayBuffer();
  const hash = crypto.createHash("md5").update(Buffer.from(buffer)).digest("hex");

  // 🛠 Проверяем, есть ли уже файл с таким же хэшем
  if (existingHashes.has(hash)) {
    console.log(`⚠️ Дубликат: ${name} (${ext}) — пропущено`);
    return; // Пропускаем сохранение дубликата
  }

  existingHashes.add(hash); // Запоминаем новый хэш

  let counter = 1;
  while (fs.existsSync(filePath)) {
    filePath = path.join(folder, `${safeName}_${counter}${ext}`);
    counter++;
  }
  fs.writeFileSync(filePath, Buffer.from(buffer)); // 🛠 Сохраняем с исправленным именем
  console.log(`✅ ${name} (${ext}) загружен → ${filePath}`);
}

async function filterAndDownload(images, folder, format = "png") {
  const urls = await fetchImageUrls(images, format);
  for (const img of images) {
    if (urls[img.id]) await downloadImage(img.name, urls[img.id], folder);
  }
}

async function fetchSvgUrls(vectorIds) {
  const batchSize = 50; // Запросами по 50 ID
  let urls = {};

  for (let i = 0; i < vectorIds.length; i += batchSize) {
    const batch = vectorIds.slice(i, i + batchSize);
    const ids = batch.map((vec) => vec.id).join(",");

    const response = await fetch(`https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=svg`, {
      headers: { "X-Figma-Token": FIGMA_API_KEY },
    });

    if (!response.ok) {
      console.error(`❌ Ошибка при получении SVG (партия ${i / batchSize + 1}):`, response.statusText);
      continue;
    }

    const data = await response.json();

    Object.assign(urls, data.images); // Добавляем ссылки в общий объект
  }

  return urls;
}
function getSvgDimensions(svgData) {
  const svgString = svgData.toString();
  const widthMatch = svgString.match(/width="([\d.]+)"/);
  const heightMatch = svgString.match(/height="([\d.]+)"/);

  return {
    width: widthMatch ? parseFloat(widthMatch[1]) : 0,
    height: heightMatch ? parseFloat(heightMatch[1]) : 0,
  };
}

function filterUniqueSvgs(svgFiles) {
  const uniqueSvgs = new Map();
  const socialIcons = new Map();
  const groupedIcons = new Map(); // 📌 Для групп и фонов

  for (const file of svgFiles) {
    const filePath = path.join(ICON_DIR, file);
    if (!fs.existsSync(filePath)) continue;

    const data = fs.readFileSync(filePath);
    const hash = crypto.createHash("md5").update(data).digest("hex");
    const { size } = fs.statSync(filePath);
    const dimensions = getSvgDimensions(data);

    const key = `${dimensions.width}x${dimensions.height}`;
    const isSocialIcon = /vk|facebook|instagram|telegram|youtube|ok/i.test(file);
    const isGroup = /group|frame|container|box/i.test(file); // 🚀 Группированные элементы
    const isBackground = /bg|background|frame|layer/i.test(file); // 🔳 Фоны

    // 🛠 **Фильтр соцсетей**
    if (isSocialIcon) {
      if (!socialIcons.has(file)) {
        socialIcons.set(file, { path: filePath, size });
      } else if (size > socialIcons.get(file).size) {
        fs.unlinkSync(socialIcons.get(file).path);
        socialIcons.set(file, { path: filePath, size });
      } else {
        fs.unlinkSync(filePath);
      }
      continue;
    }

    // 🎨 **Фильтр фонов и групп**
    if (isBackground || isGroup) {
      if (!groupedIcons.has(key)) {
        groupedIcons.set(key, { path: filePath, size });
      } else {
        const existing = groupedIcons.get(key);
        if (isBackground && !isGroup) {
          // Если это фон и он больше → оставляем его
          if (size > existing.size) {
            fs.unlinkSync(existing.path);
            groupedIcons.set(key, { path: filePath, size });
          } else {
            fs.unlinkSync(filePath);
          }
        }
      }
      continue;
    }

    // 🛑 **Фильтр дубликатов**
    if (uniqueSvgs.has(key)) {
      const existing = uniqueSvgs.get(key);
      if (size > existing.size) {
        fs.unlinkSync(existing.path);
        uniqueSvgs.set(key, { path: filePath, size });
      } else {
        fs.unlinkSync(filePath);
      }
    } else {
      uniqueSvgs.set(key, { path: filePath, size });
    }
  }
}

async function downloadSvgIcons(vectors) {
  console.log("🔍 Получение ссылок на SVG");
  const urls = await fetchSvgUrls(vectors);
  for (const vec of vectors) {
    const url = urls[vec.id];
    if (!url) {
      console.warn(`🚨 Нет ссылки для ${vec.name}`);
      continue;
    }
    await downloadImage(vec.name, url, ICON_DIR);
  }
}

(async function extractAll() {
  console.log("📥 Получение данных Figma...");
  const figmaData = await fetchFigmaData();
  if (!figmaData) return console.error("Ошибка загрузки Figma API");

  console.log("🔎 Поиск страницы");
  const page = findPage(figmaData.document, TARGET_PAGE);
  if (!page) return console.error("Страница не найдена");

  console.log("📄 Извлечение данных");
  const { textSet, images, vectors } = extractData(page);

  fs.writeFileSync("extractedText.json", JSON.stringify([...textSet], null, 2));

  console.log("📸 Загрузка изображений");
  await filterAndDownload(images, IMAGE_DIR, "png");

  console.log("🖼️ Загрузка векторных иконок");
  await downloadSvgIcons(vectors);

  // console.log("🔍 Фильтруем дубликаты SVG...");
  // filterUniqueSvgs(fs.readdirSync(ICON_DIR));

  console.log("✅ Готово!");
})();
