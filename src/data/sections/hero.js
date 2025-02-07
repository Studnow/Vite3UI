export default {
  class: "hero min-h-[768px] place-content-start max-w-screen-2xl md:translate-y-24",
  classContent: "hero-content justify-start flex-col md:flex-row text-center md:text-left xl:max-w-4xl w-full",
  heading: {
    titleLevel: "1",
    title: "Юридическая проверка объекта недвижимости перед покупкой",
    description:
      "Всесторонняя проверка истории объекта недвижимости, продавца, прав 3-лиц и характеристик недвижимости",
    class: {
      containerClass: "",
      title: "mb-12 text-3xl lg:text-4xl xl:text-6xl",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
    },
  },
  button: { btnClass: "btn btn-primary text-base-100 w-52", text: "Оставить заявку" },
  heroCards: [
    {
      class: "w-32 h-20 px-8 pt-8",
      path: "/assets/icons/hero-icons/shield.svg",
      title: "Безопасно",
      description: "Всесторонняя проверка по базам и реестрам",
    },
  ],
};
