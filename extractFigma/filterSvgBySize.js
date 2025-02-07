import fs from "fs";
import path from "path";
import { DOMParser } from "xmldom";

// 🔹 Папка с SVG-иконками
const iconsDir = "icons";

// 🔹 Функция для получения размеров SVG
function getSvgDimensions(svgContent) {
  try {
    const doc = new DOMParser().parseFromString(svgContent, "image/svg+xml");
    const svgTag = doc.documentElement;

    const width = svgTag.getAttribute("width") || "unknown";
    const height = svgTag.getAttribute("height") || "unknown";

    return { width, height };
  } catch (error) {
    console.error("❌ Ошибка чтения SVG:", error);
    return { width: "error", height: "error" };
  }
}

// 🔹 Фильтрация дубликатов по размерам
function filterDuplicatesBySize() {
  const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));
  const uniqueFiles = new Map();

  for (const file of svgFiles) {
    const filePath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(filePath, "utf8");
    const { width, height } = getSvgDimensions(svgContent);

    const key = `${width}x${height}`;
    if (uniqueFiles.has(key)) {
      console.log(`🚮 Удаляем дубликат (размер ${key}): ${file}`);
      fs.unlinkSync(filePath);
    } else {
      uniqueFiles.set(key, file);
    }
  }

  console.log("🎉 Уникальные иконки сохранены.");
}

// 🚀 Запуск фильтрации
filterDuplicatesBySize();
