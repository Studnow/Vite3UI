export default {
  sections: {
    header: {showMenu: true},
    heroSec: { class: "hero", title: "This is hero section", description: "Fish plain text should be here" },
    cardsSec: {
      class: "cards",
      title: "Card section",
      description: "You can buy all of these cards",
      cardB: [
        {
          cardBTitle: "CardB title for first card",
          cardBImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/handshake.webp" },
          cardBDesc: "cardB desc",
          cardBBtn: "CardB 1 Buy now!",
        },
        {
          cardBTitle: "CardB title for second card",
          cardBImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/waterfall.png" },
          cardBDesc: "cardB desc",
          cardBBtn: "CardB 2 Buy now!",
        },
        {
          cardBTitle: "CardB title for third card",
          cardBImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/0e.gif" },
          cardBDesc: "cardB 3 desc",
          cardBBtn: "CardB 3 Buy now!",
        },
      ],
    },
    aboutSec: {
      class: "about",
      title: "We are the champions",
      description: "Around the world",
      cardBImg: { alt: "Card image", class: "rounded-lg", path: "/assets/img/waterfall.png" },
    },
    sliderSec: {
      class: "slider",
      title: "Testimonials",
      description: "All our clients",
      cardB: [
        {
          cardBTitle: "CardB title for first card",
          cardBImg: {
            alt: "Card 1 image",
            class: "rounded-xl max-w-md",
            path: "/assets/img/handshake.webp",
            w: "600",
            h: "400",
          },
          cardBDesc: "cardB 1 desc",
          cardBBtn: "CardB 1 Buy now!",
        },
        {
          cardBTitle: "CardB title for second card",
          cardBImg: {
            alt: "Card 2 image",
            class: "rounded-xl max-w-md",
            path: "/assets/img/webp/waterfall.webp",
            w: "600",
            h: "400",
          },
          cardBDesc: "cardB 2 desc",
          cardBBtn: "CardB 2 Buy now!",
        },
        {
          cardBTitle: "CardB title for third card",
          cardBImg: {
            alt: "Card 3 image",
            class: "rounded-xl max-w-md",
            path: "/assets/img/0e.gif",
            w: "600",
            h: "400",
          },
          cardBDesc: "cardB 3 desc",
          cardBBtn: "CardB 3 Buy now!",
        },
        {
          cardBTitle: "CardB title for fourth card",
          cardBImg: {
            alt: "Card image",
            class: "rounded-xl max-w-md",
            path: "/assets/img/hero/Hero-clear.webp",
            w: "600",
            h: "400",
          },
          cardBDesc: "cardB 4 desc",
          cardBBtn: "CardB 4 Buy now!",
        },
        {
          cardBTitle: "CardB title for fifth card",
          cardBImg: {
            alt: "Card image",
            class: "rounded-xl max-w-md",
            path: "/assets/img/webp/Hero-bg.webp",
            w: "600",
            h: "400",
          },
          cardBDesc: "cardB 5 desc",
          cardBBtn: "CardB 5 Buy now!",
        },
      ],
    },
    priceSec: {
      class: "price",
      title: "Prices",
      description: "Get the best plan",
      card: { basic: "basic", standart: "standart", pro: "pro" },
    },
  },
};