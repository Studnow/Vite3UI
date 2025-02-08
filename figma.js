import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import crypto from "crypto";

import keys from './keys'

const FIGMA_API_KEY = "keys.FIGMA_API_KEY";
const FILE_KEY = "keys.FILE_KEY";

const TARGET_PAGE = "👋 Developer – Main Page";
const IMAGE_DIR = "images";
const ICON_DIR = "icons";
const FIGMA_IMAGE_BASE_URL = "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/";

if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });
if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

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
  if (node.type === "RECTANGLE" && node.fills) {
    const imageFill = node.fills.find((fill) => fill.type === "IMAGE" && fill.imageRef);
    if (imageFill) images.push({ id: node.id, name: node.name || `image_${node.id}` });
  }
  if (node.type === "VECTOR") {
    vectors.push({ id: node.id, name: node.name || `vector_${node.id}` });
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

// Bug

async function downloadImage(name, url, folder) {
  const response = await fetch(url);
  if (!response.ok) return console.error(`Ошибка: ${name}`);

  const ext = folder === ICON_DIR ? ".svg" : ".png"; // 🛠 Фикс расширения!
  const filePath = path.join(folder, `${name.replace(/\s+/g, "_")}${ext}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(buffer)); // если фолдер иконки, то свг, иначе - пнг
  console.log(`✅ ${name} (${ext}) загружен`);
}

// Bug end

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
  // console.log(vectors);

  fs.writeFileSync("extractedText.json", JSON.stringify([...textSet], null, 2));

  // console.log("📸 Загрузка изображений");
  await filterAndDownload(images, IMAGE_DIR, "png");

  console.log("🖼️ Загрузка векторных иконок");
  await downloadSvgIcons(vectors);

  console.log("✅ Готово!");
})();
