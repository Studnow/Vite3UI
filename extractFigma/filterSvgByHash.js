import fs from "fs";
import path from "path";
import crypto from "crypto";

// 🔹 Папка с SVG-иконками
const iconsDir = "icons";

// 🔹 Функция для получения хеша файла
function getFileHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(content).digest("hex");
}

// 🔹 Фильтрация дубликатов по хешу
function filterDuplicatesByHash() {
  const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith(".svg"));
  const uniqueHashes = new Map();

  for (const file of svgFiles) {
    const filePath = path.join(iconsDir, file);
    const fileHash = getFileHash(filePath);

    if (uniqueHashes.has(fileHash)) {
      console.log(`🚮 Удаляем дубликат (хеш ${fileHash}): ${file}`);
      fs.unlinkSync(filePath);
    } else {
      uniqueHashes.set(fileHash, file);
    }
  }

  console.log("🎉 Дубликаты по хешу удалены.");
}

// 🚀 Запуск
filterDuplicatesByHash();
