document.addEventListener("DOMContentLoaded", () => {
  loadFragment("/01._homepage/01._navbar/nav.html", "nav", initNavMenu);
  loadFragment("/01._homepage/02._title/title.html", "title");
  loadFragment("/01._homepage/03._item_carousel/item_carousel.html", "item-carousel", initCarousle);
});

//  Load Section
function loadFragment(file, elementId, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;

      if (typeof callback === "function") {
        callback();
      }
    });
}


function initNavMenu() {
  const menuBtn = document.querySelectorAll(".menu-btn");
  const navContainer = document.querySelector(".nav-container");


  menuBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      navContainer.classList.toggle("active");
    });
  });
}

function initCarousle(){

const swiper = new Swiper('.swiper', {
  // Add any required Swiper options here
  loop: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 4, // Adjust as needed
  spaceBetween: 10, // Adjust as needed
});
}
