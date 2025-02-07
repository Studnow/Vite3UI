import { generateCards } from "../../../Hbs-helpers";

export default {
  generate: false, //generateCards(6),
  wrapperClass: "cards grid gap-12 md:grid-cols-2 xl:grid-cols-3 md:items-center",
  heading: {
    container: true,
    titleLevel: "2",
    title: "Что проверяем",
    description: false,
    class: {
      container: "",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
    },
  },
  cards: [
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "Проверяем историю объекта недвижимости",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: "",
        },
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg",
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!",
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "Проверяем историю объекта недвижимости",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: "",
        },
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg",
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!",
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "Проверяем историю объекта недвижимости",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: "",
        },
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg",
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!",
    },
    {
      cardClass: "bg-base-300 md:w-96",
      cardHeading: {
        title: "Проверяем историю объекта недвижимости",
        description: false,
        class: {
          classTitle: "card-title text-sm md:text-lg lg:text-2xl w-full",
          classDesc: "",
        },
      },
      cardImg: {
        alt: "house history",
        class: "rounded-lg p-6",
        path: "/assets/img/compressed/list-cards-bg/house.jpg",
        // w: "640",
        // h: "640",
      },
      cardPicture: true,
      cardActions: false,
      cardBtn: "CardB 1 Buy now!",
    },
  ],
};
