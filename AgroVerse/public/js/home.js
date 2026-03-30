document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");

  const images = [
    "/images/hero1.jpeg",
    "/images/hero2.jpeg",
    "/images/hero3.jpeg"
  ];

  let current = 0;

  function changeBackground() {
    heroSection.style.backgroundImage = `url(${images[current]})`;
    current = (current + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 3000);
});