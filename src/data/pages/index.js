// layout
import basic from '../layout/basic';

// sections
import header from "../sections/header";
import mainContent from "../layout/main-content";
import hero from "../sections/hero";
import slider from "../sections/slider";
import cards from "../sections/cards";
import about from "../sections/about";
import price from "../sections/price";
import footer from "../layout/footer";

export default {
  title: "Main Page",
  favicon: "/fire1.svg",
  meta: {
    title: "Название страницы",
    description: "Описание страницы",
    ogImage: "/assets/img/og-image.jpg",
    ogUrl: "/",
  },
  layout: { basic },
  sections: {
    header,
    hero,
    cards,
    about,
    slider,
    price,
    footer,
  },
};