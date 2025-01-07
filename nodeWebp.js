import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

imagemin(["./assets/img/**/*.{jpg,png}"], {
  destination: "./assets/img/webp/",
  plugins: [
    imageminWebp({
      //   quality: 90
      //   ,
      //   resize: {
      //     width: 1000,
      //     height: 0
      //   }
    }),
  ],
}).then(() => {
  console.log("Images Converted Successfully!!!");
});

// node images.js