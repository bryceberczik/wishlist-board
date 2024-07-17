const wishTitle = document.getElementById("wish");
const category = document.getElementById("category");
const img = document.getElementById("image-url");
const fileInput = document.getElementById("image-file");
const submitBtn = document.getElementById("submit");
const toggleInputBtn = document.getElementById("toggle-input");
const urlInputDiv = document.getElementById("url-input");
const fileInputDiv = document.getElementById("file-input");
const wishContainer = document.querySelector(".wish-container");
const error = document.getElementById("error");
const empty = document.getElementById("empty-list");
let wishBoard = JSON.parse(localStorage.getItem("wishes")) || [];
let selectedCategory = null;
let useFileInput = false;

toggleInputBtn.addEventListener("click", () => {
  useFileInput = !useFileInput;
  if (useFileInput) {
    urlInputDiv.style.display = "none";
    fileInputDiv.style.display = "block";
    toggleInputBtn.textContent = "Switch to URL Input";
  } else {
    urlInputDiv.style.display = "block";
    fileInputDiv.style.display = "none";
    toggleInputBtn.textContent = "Switch to File Upload";
  }
});

submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  if (useFileInput && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      saveWish(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveWish(img.value.trim());
  }
  // Hide the modal after submission
});

function saveWish(imageUrl) {
  const wish = {
    title: wishTitle.value.trim(),
    category: category.value,
    img: imageUrl,
  };

  if (wish.title === "" || wish.category === "" || wish.img === "") {
    error.textContent = "All fields are required. Please fill out the form completely.";
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
  fileInput.value = "";
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

// JavaScript to handle active class on category click
document.addEventListener('DOMContentLoaded', () => {
  const categoryLinks = document.querySelectorAll('nav ul li a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove 'active' class from all links
      categoryLinks.forEach(link => link.parentElement.classList.remove('active'));
      // Add 'active' class to the clicked link's parent <li>
      link.parentElement.classList.add('active');
    });
  });
});

// Event listeners for emoji clicks
  const emojis = document.querySelectorAll("nav ul li");
  emojis.forEach(emoji => {
    emoji.addEventListener("click", function () {
      // Remove active class from all emojis
      emojis.forEach(item => item.classList.remove('active'));
      // Add active class to the clicked emoji
      emoji.classList.add('active');
      // Trigger click on associated category link
      const categoryLink = emoji.querySelector('a');
      if (categoryLink) {
        categoryLink.click();
      }
    });
  });
init();
