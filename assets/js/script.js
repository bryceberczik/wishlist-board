const wishTitle = document.getElementById("wish");
const category = document.getElementById("category");
const img = document.getElementById("image-url");
const submitBtn = document.getElementById("submit");
const wishContainer = document.querySelector(".wish-container");
const error = document.getElementById("error");
const empty = document.getElementById("empty-list");
let wishBoard = JSON.parse(localStorage.getItem("wishes")) || [];
let selectedCategory = null;

function saveWishes() {
  const wish = {
    title: wishTitle.value.trim(),
    category: category.value,
    img: img.value.trim(),
  };

  if (wish.title === "" || wish.category === "" || wish.img === "") {
    error.textContent =
      "All fields are required. Please fill out the form completely.";
  } else {
    wishBoard.push(wish);
    localStorage.setItem("wishes", JSON.stringify(wishBoard));
    bootstrap.Modal.getInstance(document.getElementById("add-wish-btn")).hide();
    error.textContent = "";
    renderWishes();
    resetForm();
  }
}

function resetForm() {
  wishTitle.value = "";
  category.value = "";
  img.value = "";
}

function renderWishes() {
  wishContainer.innerHTML = "";

  const filteredWishes = selectedCategory
    ? wishBoard.filter((wish) => wish.category === selectedCategory)
    : wishBoard;

  filteredWishes.forEach((wish) => {
    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", () => {
      removeWish(wish);
    });

    const wishImg = document.createElement("img");
    wishImg.src = wish.img;
    wishImg.alt = wish.title;

    const wishText = document.createElement("h3");
    wishText.textContent = wish.title;
    const breako = document.createElement("br");

    wishCard.appendChild(closeBtn);
    wishCard.appendChild(breako);
    wishCard.appendChild(breako);
    wishCard.appendChild(wishText);
    wishCard.appendChild(wishImg);
    wishContainer.appendChild(wishCard);
  });
}

function removeWish(wishToRemove) {
  wishBoard = wishBoard.filter((wish) => wish !== wishToRemove);
  localStorage.setItem("wishes", JSON.stringify(wishBoard));
  renderWishes();
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveWishes();
  // Hide the modal after submission
});

function init() {
  renderWishes();
}

// JavaScript for theme toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Load theme from localStorage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark-mode") {
  body.classList.add("dark-mode");
  themeToggle.checked = true;
}

// Toggle theme on switch change
themeToggle.addEventListener("change", function () {
  body.classList.toggle("dark-mode", this.checked);
  if (this.checked) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.setItem("theme", "light-mode");
  }
});

// Event listeners for category links
const categoryLinks = document.querySelectorAll("nav ul li a");
categoryLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    selectedCategory = event.target.textContent;
    renderWishes();
  });
});

init();
