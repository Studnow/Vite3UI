export default {
  menuClass: "menu menu-horizontal px-1 hidden lg:flex",
  menuSmClass: "menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow",
  items: { before: ["Home", "About"], after: ["Contacts", "Prices"] },
  sub: {
    subHeading: "Vehicles",
    menuClass: "p-2 bg-base-200 w-36 z-10",
    menuSmClass: "p-2 bg-base-100 w-36 z-10",
    listItems: ["Chevrolet", "my Car", "Your Car"],
  },
};
