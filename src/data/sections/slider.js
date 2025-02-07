export default {
  class: "slider container mx-auto mb-16",
  heading: {
    container: true,
    titleLevel: "3",
    title: "slider",
    description: false,
    class: {
      containerClass: "slider",
      title: "mb-12",
      description: "mb-12 font-sans lg:text-2xl font-normal max-w-lg xl:max-w-3xl",
    },
  },
  sliderCommon: {
    // common data for slider cards
    customControl: { control: true, controlClass: "", controlIcon: "arrow", iconClass: "" },
    pagination: {},
    icon: "play",
  },
  slides: {
    // individual data for slider cards
    slideData: [
      {
        cardBImg: {
          title: "Card 1 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_1.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452",
        },
        cardBody: false,
        // {
        // cardBTitle: "",
        // cardBDesc: "",
        // cardBBtn: false,
        // },
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_2.jpg",
          w: "786",
          h: "452",
        },
        cardBody: false,
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452",
        },
        cardBody: false,
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_1.webp",
          path: "/assets/img/compressed/video-preview/Video_2.jpg",
          w: "786",
          h: "452",
        },
        cardBody: false,
      },
      {
        cardBImg: {
          title: "Card 2 image",
          class: "rounded-xl",
          modern: "/assets/img/compressed/video-preview/Video_2.webp",
          path: "/assets/img/compressed/video-preview/Video_1.jpg",
          w: "786",
          h: "452",
        },
        cardBody: false,
      },
    ],
  },
};
