import { defineConfig } from "vite";

import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
// import { imagetools } from "vite-imagetools";
import svgSprite from "vite-plugin-svg-sprite";
// import imagemin from "vite-plugin-imagemin";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";

import { contextData } from "./data";

function handlebarsOverride(options) {
  const plugin = handlebars(options);
  // Currently handleHotUpdate skips further processing, which bypasses
  // postcss and in turn tailwind doesn't pick up file changes
  delete plugin.handleHotUpdate;
  return plugin;
}

export default defineConfig({
  base: "/Vite3UI/", // for deploy to gh-pages base = outDir
  build: {
    outDir: "Vite3UI",
    rollupOptions: {
      external: ["/data.js"],
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(name)) {
            return "assets/fonts/[name][extname]";
          }
          if (/\.(png|jpe?g|webp|svg|gif|avif)$/i.test(name)) {
            return "assets/images/[name][extname]"; // Все изображения в папку images
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  plugins: [
    handlebarsOverride({
      context(pagePath) {
        return contextData[pagePath];
      },
      partialDirectory: [
        resolve(__dirname, "./src/partials"),
        resolve(__dirname, "./src/partials/block-templates"),
        resolve(__dirname, "./src/partials/exp-templates"),
      ],
    }),
    // handlebars({}),
    // imagetools(),
    svgSprite({
      symbolId: "icon-[name]",
      include: ["./assets/icons/**/*.svg"],
    }),
    process.env.NODE_ENV === "production" &&
      viteImagemin({
        onlyAssets: true,
        plugins: {
          jpg: imageminMozjpeg({ quality: 75 }),
          png: imageminPngquant({ quality: [0.6, 0.8] }),
          gif: imageminGifsicle({
            optimizationLevel: 3, // Уровень сжатия для GIF
          }),
          svg: imageminSvgo({
            plugins: [{ removeViewBox: false }], // Убираем некорректные viewBox из SVG
          }),
        },
        makeWebp: {
          plugins: {
            jpg: imageminWebp(),
            png: imageminWebp(),
            gif: imageminWebp(),
          },
        },
        // Убираем лишние метаданные, сжимаем изображения
        // pngquant: {
        //   quality: [0.6, 0.8], // Устанавливаем качество PNG
        // },
        // mozjpeg: {
        //   quality: 75, // Устанавливаем качество для JPEG
        // },
        // webp: {
        //   quality: 50, // Устанавливаем качество для WebP
        // method: 6,
        // Для PNG/JPEG/AVIF
        // filter: ["image/jpeg", "image/png"],
        // },
        // gifsicle: {
        //   optimizationLevel: 3, // Уровень сжатия для GIF
        // },
        // svgo: {
        //   plugins: [{ removeViewBox: false }], // Убираем некорректные viewBox из SVG
        // },
      }),
    // imagetools(),
  ].filter(Boolean),
});
