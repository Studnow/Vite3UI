import sharp from "sharp";
import fg from "fast-glob";
import path from "path";
import { promises as fs } from "fs";

const imageDir = "./assets/img";
const outDir = "./assets/img/compressed";
// Форматы для обработки
const supportedFormats = ["jpg", "jpeg", "png"];

// Функция для обработки изображений
async function processImages() {
  const files = await fg(`${imageDir}/**/*.{${supportedFormats.join(",")}}`);

  for (const file of files) {
    const relativePath = path.relative(imageDir, file);
    const fileDir = path.dirname(relativePath);
    const fileExt = path.extname(file).toLowerCase();
    const fileBase = path.basename(file, fileExt);

    // Создаём директорию для сохранения сжатых файлов, если её нет
    const outputSubDir = path.join(outDir, fileDir);
    await fs.mkdir(outputSubDir, { recursive: true });

    // Сжатие оригинального файла
    const compressedPath = path.join(outputSubDir, `${fileBase}${fileExt}`);
    const webpPath = path.join(outputSubDir, `${fileBase}.webp`);
    await sharp(file)
      .toFormat(fileExt.includes("png") ? "png" : "jpeg", { quality: 75 })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(compressedPath);
    console.log(`Сжатое изображение: ${compressedPath}`);

    // Конвертация в WebP
    await sharp(file)
      .webp({ quality: 80 }) // Настрой качество (от 0 до 100)
      .toFile(webpPath);
    console.log(`Создан WebP: ${webpPath}`);
  }
}

processImages().catch((err) => console.error(err));

// import imagemin from "imagemin";
// import imageminWebp from "imagemin-webp";

// imagemin(["./assets/img/**/*.{jpg,png}"], {
//   destination: "./assets/img/webp/",
//   plugins: [
//     imageminWebp({
//       quality: 60,
//       //   ,
//       //   resize: {
//       //     width: 1000,
//       //     height: 0
//       //   }
//     }),
//   ],
// }).then(() => {
//   console.log("Images Converted Successfully!!!");
// });

// node images.js
