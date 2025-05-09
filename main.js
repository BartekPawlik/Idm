document.addEventListener("DOMContentLoaded", () => {
  loadFragment("/01._homepage/01._navbar/nav.html", "nav", initNavMenu);
  loadFragment("/01._homepage/02._title/title.html", "title");
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
  const container =document.querySelectorAll('.container')

  menuBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      navContainer.classList.toggle("active");
      container.forEach((cont) =>{
        cont.classList.add("dark")
      })
    });
  });
}
