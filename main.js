const menuBtn = document.querySelectorAll(".menu-btn");
const navContainer = document.querySelector(".nav-container");
const overlay = document.querySelector("#overlay");
const navigation = document.querySelectorAll(".navigation");
const popup = document.querySelector(".popup");

menuBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    navContainer.classList.toggle("active");
  });
});

overlay.addEventListener("click", () => {
  navContainer.classList.remove("active");
});

navigation.forEach((nav) => {
  nav.addEventListener("click", () => {
    navContainer.classList.remove("active");
  });
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerView: 1,
  spaceBetween: 24,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    925: {
      slidesPerView: 2,
      spaceBetween: 16,
    },

    1439: {
      slidesPerView: 3,
    },

    1896: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// API

const control = document.querySelector("#control");
const itemContainer = document.querySelector("#items-contener");

const select = document.createElement("select");
select.id = "quantity";
select.size = 1;

for (let i = 1; i <= 36; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  if (i === 14) option.selected = true;
  select.appendChild(option);
}

control.appendChild(select);

let pageNumber = 1;
let pageSize = parseInt(select.value);
let isLoading = false;

select.addEventListener("change", () => {
  pageSize = parseInt(select.value);
  pageNumber = 1;
  itemContainer.innerHTML = "";
  loadItems();
});

async function loadItems() {
  if (isLoading) return;
  isLoading = true;


  try {
    const res = await fetch(
      `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const items = await res.json();

    const currentItemCount = itemContainer.children.length;

    items.data.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("item-container");
      div.style.order = currentItemCount + index + 1;

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.alt;

      const text = document.createElement("span");
      text.textContent = `ID: ${String(item.id).padStart(2, 0)}`;
      div.appendChild(text);
      div.appendChild(img);

      div.addEventListener("click", () => {
        popup.innerHTML = `
      <div class="popup-content">
        <div class="close-container">
          <p>ID: ${String(item.id).padStart(2, 0)}</p>
          <button class="popup-exit">✖ CLOSE</button>
        </div>
        <img src="${item.image}" alt="${item.alt}">
      </div>
    `;

        popup.classList.add("active");
      });

      itemContainer.appendChild(div);
    });

    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup-exit") || e.target === popup) {
        popup.classList.remove("active");
        popup.innerHTML = "";
      }
    });

    pageNumber++;
  } catch (err) {
    console.error("problem load", err);
  } finally {
    isLoading = false;

  }
}

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const nearBottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (nearBottom) {
      loadItems();
    }
  }, 150);
});
loadItems();
