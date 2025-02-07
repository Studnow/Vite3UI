import headerSec from "../layout/header";
import navbar from "./navbar";
import mainContent from "../layout/main-content";
import hero from "./hero";
import slider from "./slider";
import cards from "./cards";
import about from "./about";
import price from "./price";
import footer from "../layout/footer";

export default {
  layout: { headerSec, mainContent, footer },
  sections: {
    header: navbar,
    heroSec: hero,
    cardsSec: cards,
    aboutSec: about,
    sliderSec: slider,
    priceSec: price,
    extraCards: {
      bg: false,
      heading: { title: "Дополнительно Вы можете заказать", headingClass: "text-3xl lg:text-4xl text-accent" },
      cards: [
        {
          class: "w-32 h-20 px-8 pt-8",
          headingClass: "text-primary",

          path: "/assets/icons/extra-icons/lawyer.svg",
          title: "Консультация юриста",
          description: "",
        },
        {
          class: "w-32 h-20 px-8 pt-8",
          headingClass: "text-primary",

          path: "/assets/icons/extra-icons/contract.svg",
          title: "Составление договора",
          description: "",
        },
        {
          class: "w-32 h-20 px-8 pt-8",
          headingClass: "text-primary",

          path: "/assets/icons/extra-icons/deal.svg",
          title: "Сопровождение сделки",
          description: "",
        },
      ],
    },
  },
};
