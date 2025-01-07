export const contextData = {
  "/index.html": {
    title: "Main Page",
    images: {
      heroImg: { alt: "Главный экран", path: "/assets/img/Hero-bg.jpg" },
      aboutImg: { alt: "О нас", path: "/assets/img/handshake.webp" },
      cardImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/0e.gif" },
      slideImg: { alt: "Slide image", class: "rounded-lg", path: "/assets/img/waterfall.png" },
    },
    list: {
      items: [
        {
          icon: '<svg class="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>',
          text: "First Item",
        },
        {
          icon: '<svg class="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 2a2 2 0 100-4 2 2 0 100 4z" /></svg>',
          text: "Second Item",
        },
        {
          icon: '<svg class="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h11m-4-4h4m-4 8h4m-7 8l-3-3 3-3m7 0h4" /></svg>',
          text: "Third Item",
        },
      ],
    },
    form: {
      fields: {
        Email: true,
        Name: true,
        button: true,
        check: true,
        radio: false,
        select: true,
        file: false,
        range: false,
        rating: true,
        text: false,
        textArea: false,
        toggle: false,
      },
    },
    sections: {
      hero: { class: "", title: "This is hero section", description: "Fish plain text should be here" },
      cards: {
        class: "",
        title: "Card section",
        description: "You can buy all of these cards",
      },
      about: {
        class: "grid grid-cols-1 justify-center",
        title: "We are the champions",
        description: "Around the world",
      },
      slider: {
        class: "",
        title: "Testimonials",
        description: "All our clients",
      },
      price: {
        class: "",
        title: "Prices",
        description: "Get the best plan",
        card: { basic: "basic", standart: "standart", pro: "pro" },
      },
    },
    elements: {
      button: {
        class: "btn btn-primary",
        text: "Buy now",
      },
    },
  },
};
