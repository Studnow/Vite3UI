import { defineConfig } from "vite";

import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import viteImagemin from "@vheemstra/vite-plugin-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";
import imageminWebp from "imagemin-webp";

import { contextData } from "./data/data";
import  Helpers from "./Hbs-helpers";

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
      ],
    }),
    handlebars({}),
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
      }),
  ].filter(Boolean),
});
