export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

document.addEventListener("DOMContentLoaded", function () {
  const targetDate = new Date("2025-12-31T23:59:59").getTime();
  const countdownTimer = document.getElementById("countdown-timer");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      countdownTimer.innerHTML = "EXPIRED";
      countdownTimer.style.setProperty('--value', 0);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownTimer.style.setProperty('--value', seconds);
    countdownTimer.setAttribute("data-days", days);
    countdownTimer.setAttribute("data-hours", hours);
    countdownTimer.setAttribute("data-minutes", minutes);
    countdownTimer.setAttribute("data-seconds", seconds);
  }

  const interval = setInterval(updateCountdown, 1000);
});