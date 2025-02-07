import fs from "fs";

let allImages = {};

const batchFiles = fs.readdirSync(".").filter((file) => file.startsWith("figmaImages_batch"));

batchFiles.forEach((file) => {
  const batchData = JSON.parse(fs.readFileSync(file, "utf-8"));
  allImages = { ...allImages, ...batchData.images };
});

fs.writeFileSync("figmaImages.json", JSON.stringify(allImages, null, 2));
console.log("Все ссылки на изображения сохранены в figmaImages.json");
