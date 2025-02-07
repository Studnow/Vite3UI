import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
// import viteImagemin from "@vheemstra/vite-plugin-imagemin";
// import imageminMozjpeg from "imagemin-mozjpeg";
// import imageminPngquant from "imagemin-pngquant";
// import imageminGifsicle from "imagemin-gifsicle";
// import imageminSvgo from "imagemin-svgo";
// import imageminWebp from "imagemin-webp";

import { contextData } from "./src/data/data";
import Helpers from "./Hbs-helpers";

import { createHtmlPlugin } from "vite-plugin-html";
import critical from "rollup-plugin-critical";

const isProduction = process.env.NODE_ENV === "production";

function handlebarsOverride(options) {
  const plugin = handlebars(options);
  // Currently handleHotUpdate skips further processing, which bypasses
  // postcss and in turn tailwind doesn't pick up file changes
  delete plugin.handleHotUpdate;
  return plugin;
}

const jsToBottomNoModule = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, "");
      let scriptTag = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/)[0];
      // console.log("\n SCRIPT TAG", scriptTag, "\n");
      html = html.replace(scriptTag, "");
      html = html.replace("<!-- # INSERT SCRIPT HERE -->", scriptTag);
      return html;
    },
  };
};

export default defineConfig({
  // root: "./",
  base: isProduction ? "/" : "/", // for deploy to gh-pages base = "./"
  build: {
    outDir: "Vite3UI",
    // outDir: "../dist",
    // emptyOutDir: true,
    ssr: false,
    rollupOptions: {
      input: "index.html",
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
      plugins: [
        // critical({
        //   criticalUrl: "./", // Базовый URL (например, '/') для генерации файла "http://localhost:4173/"
        //   criticalBase: "./Vite3UI/", // Папка для хранения сгенерированного критического CSS
        //   criticalPages: [
        //     { uri: "index.html", template: "index" }, // Главная страница
        //     // { uri: "about", template: "about" }, // Другие страницы (если нужно)
        //   ],
        //   width: 1300, // Ширина экрана для генерации критического CSS
        //   height: 900, // Высота экрана
        //   inline: true, // Вставка критического CSS прямо в HTML (иначе создаст отдельные файлы)
        //   // extract: false, // Удаление критических стилей из общего CSS (оставить false, чтобы избежать проблем с флешем контента)
        // }),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    handlebarsOverride({
      context(pagePath) {
        return contextData[pagePath];
      },
      partialDirectory: [
        resolve(__dirname, "./src/partials"),
        resolve(__dirname, "./src/partials/layout"),
        resolve(__dirname, "./src/partials/sections"),
        resolve(__dirname, "./src/partials/components"),
        resolve(__dirname, "./src/partials/components/simple"),
        resolve(__dirname, "./src/partials/components/complex"),
      ],
    }),
    // handlebars({}),
    // process.env.NODE_ENV === "production" &&
    //   viteImagemin({
    //     onlyAssets: true,
    //     plugins: {
    //       jpg: imageminMozjpeg({ quality: 75 }),
    //       png: imageminPngquant({ quality: [0.6, 0.8] }),
    //       gif: imageminGifsicle({
    //         optimizationLevel: 3, // Уровень сжатия для GIF
    //       }),
    //       svg: imageminSvgo({
    //         plugins: [{ removeViewBox: false }], // Убираем некорректные viewBox из SVG
    //       }),
    //     },
    //     makeWebp: {
    //       plugins: {
    //         jpg: imageminWebp(),
    //         png: imageminWebp(),
    //         gif: imageminWebp(),
    //       },
    //     },
    //   }),
    jsToBottomNoModule(),
    VitePluginSvgSpritemap("./assets/icons/**/*.svg"),
  ].filter(Boolean),
});
