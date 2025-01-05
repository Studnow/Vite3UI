import { defineConfig } from "vite";

import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

function handlebarsOverride(options) {
  const plugin = handlebars(options);
  // Currently handleHotUpdate skips further processing, which bypasses
  // postcss and in turn tailwind doesn't pick up file changes
  delete plugin.handleHotUpdate;
  return plugin;
}

export default defineConfig({
  base: "/ViteUI/",
  build: {
    outDir: "ViteUI",
  },
  plugins: [
    handlebarsOverride({
      context: {
        title: "Handlebars",
      },
      partialDirectory: [resolve(__dirname, "./src/partials"), resolve(__dirname, "./src/partials/block-templates"), resolve(__dirname, "./src/partials/exp-templates")],
    }),
    // handlebars({}),
  ],
});
