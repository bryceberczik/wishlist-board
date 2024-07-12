const wishTitle = document.getElementById("wish");
const category = document.getElementById("category");
const img = document.getElementById("image-url");
const submitBtn = document.getElementById("submit");
const wishList = document.getElementById("wishes-list");

let wishBoard = [];

function saveWishes() {
  const wish = {
    wish: wishTitle.value.trim(),
    category: category.value,
    img: img.value,
  };
  if (wish.wish === "" || wish.category === "" || wish.img === "") {
    alert("Please complete the enire form");// will be replaced with red error message
  } else {
    wishBoard.push(wish);
    localStorage.setItem("wishes", JSON.stringify(wishBoard));
  }
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveWishes();
  renderWishes();
});

function renderWishes() {
  wishList.innerHTML = "";

  for (let i = 0; i < wishBoard.length; i++) {
    const wish = wishBoard[i];

    // const cardDiv = document.createElement("div");
    // cardDiv.textContent = wish;
    // cardDiv.setAttribute("wish-index", i);

    const card = document.createElement("div");
    card.textContent = wish;
    card.setAttribute("class", "col wish-card");
    // card.textContent = "X";
    console.log(wish);
    // wishList.appendChild(card);
    document.getElementById('wishes-list').appendChild(card);
  }
}

function init() {
  const storeWishes = JSON.parse(localStorage.getItem("wishes"));

  if (storeWishes !== null) {
    wishBoard = storeWishes;
    console.log(wishBoard)
  }

  renderWishes();
}

// JavaScript for theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load theme from localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Toggle theme on switch change
themeToggle.addEventListener('change', function() {
    body.classList.toggle('dark-mode', this.checked);
    if (this.checked) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});