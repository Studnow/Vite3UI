export default {
  navbar: {
    headerClass: "",
    containerClass: " mx-auto py-6",
    navbarClass: " bg-transparent justify-between",
    navbarStart: " w-1/6 lg:w-1/3",
    navbarCenter: " flex w-1/2 lg:1/2 justify-center",
    navbarEnd: " w-1/4 lg:w-1/4",
  },
  logo: {
    containerClass:
      "btn btn-link text-neutral no-underline text-base flex justify-start items-center w-12 px-0 md:w-full lg:px-2",
    img: "/logo.png",
    imgClass: "w-12",
    text: "Гид по недвижимости",
    spanClass: "hidden lg:inline-block text-sm xl:text-base",
    w: "48",
    h: "48",
  },
  center: {
    components: { showMenu: true, showContacts: false },
    list: {
      class: "flex justify-start w-full lg:justify-center",
      "list-items": [
        {
          link: true,
          class: "btn btn-link no-underline flex items-start p-2 gap-2 border border-bottom border-2",
          icon: { id: "envelope", w: "36", h: "36", iconClass: "", containerClass: "icon" },
          span: { text: "+7 978 221 26 88", class: "border-b-2 border-accent py-1 hidden md:block" },
          href: "tel:+7 978 221 26 88",
        },
        {
          link: true,
          class: "btn btn-link no-underline flex items-start p-2 gap-2",
          icon: { id: "phone", w: "36", h: "36", iconClass: "", containerClass: "icon" },
          span: { text: "info@gidrealter.ru", class: "border-b-2 border-accent py-1 hidden md:block" },
          href: "mailto: info@gidrealter.ru",
        },
      ],
    },
  },
  right: {
    class: "btn btn-outline bg-base-100 text-xs md:text-base text-accent border-2 hover:bg-accent hover:border-accent",
    text: "Заказать звонок",
    drawer: false,
  },
};
