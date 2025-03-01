export default {
  class: "price container mx-auto mb-16 bg-base-200 rounded-xl",
  heading: {
    container: false,
    titleLevel: 3,
    title: "price",
    description: "desc",
    class: { containerClass: "", title: "", description: "" },
  },
  content: {
    class: "gap-8 grid lg:grid-cols-2 place-items-center h-auto",
    col1: "grid gap-8 py-4",
    col2: "bg-base-100 rounded-t-full",
  },
  buttons: [
    {
      text: "Цена: 15 000 рублей",
      class: "btn btn-outline btn-accent btn-wide bg-base-100 hover:bg-accent hover:border-accent",
    },
    {
      text: "Вместо 33 000 рублей",
      class: "btn btn-disabled btn-wide !bg-base-100 !bg-opacity-60 !text-opacity-50 relative cross-out",
    },
    { text: "Заказать", class: "btn btn-accent btn-wide" },
  ],
  img: {
    modern: "/assets/img/compressed/sale-img.webp",
    path: "/assets/img/compressed/sale-img.png",
    class: "bg-base-100 rounded-t-full",
  },
};
