import "./style.css";
import "./sass/range-mixin.sass";
import "./sass/header.sass";

const _R = document.querySelectorAll("[type=range]"),
  _W = _R.parentNode,
  _O = _R.nextElementSibling;

document.documentElement.classList.add("js");

for (let i = 0; i < _R.length; i++) {
  _R[i].addEventListener(
    "input",
    (e) => {
      if (e.target.id == "money-range") {
        e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
        e.currentTarget.nextElementSibling.value =
          (e.currentTarget.value * 1000).toString().slice(0, 2) +
          " " +
          (e.currentTarget.value * 1000).toString().slice(2, 5) +
          " ₮";
        e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
      }
      if (e.target.id == "term-range") {
        e.currentTarget.style.setProperty("--val", +e.currentTarget.value);
        e.currentTarget.nextElementSibling.value = e.currentTarget.value + " дней";
        e.currentTarget.parentNode.style.setProperty("--val", +e.currentTarget.value);
      }
    },
    false
  );
}

// _R.addEventListener(
//   "input",
//   (e) => {
//     _R.style.setProperty("--val", +_R.value);
//     _O.value = Number(_R.value) * 1000;
//     _W.style.setProperty("--val", +_R.value);
//   },
//   false
// );
