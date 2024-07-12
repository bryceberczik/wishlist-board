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
    alert("Please complete the enire form"); // will be replaced with red error message
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
  const data = JSON.parse(localStorage.getItem("wishes"));
  for (let i = 0; i < wishBoard.length; i++) {
    const obj = wishBoard[i];

    // data.forEach((obj) => {
    const div = document.createElement("div");
    div.setAttribute("class", "wish-card");
    const img = document.createElement("img");
    img.setAttribute("src", `${obj.img}`);
    const category = document.createElement("h3");
    const wish = document.createElement("h2");

    category.textContent = obj.category;
    wish.textContent = obj.wish;
    img.scr = obj.img;
    img.textContent = obj.img;
    div.appendChild(wish);
    div.appendChild(category);
    div.appendChild(img);
    wishList.appendChild(div);
  }
}

// function renderWishes() {
//   // wishList.innerHTML = "";

//   for (let i = 0; i < wishBoard.length; i++) {
//     const wish = wishBoard[i];
//     console.log(wish);

//     const cardDiv = document.createElement("div");
//     // const card = document.createElement("li")
//     // const h2Tag = document.createElement("h2", wish.wish.value);
//     // const img = document.createElement("img", wish.img.value);
//     // const category = document.createElement("h3", wish.category);
//     cardDiv.setAttribute = ("class", "col wish-card");
//     // card.appendChild(h2Tag);
//     // card.appendChild(img);
//     // card.appendChild(category);

//     console.log(cardDiv);
//     cardDiv.textContent = {
//       wish: wish.wish,
//       img: wish.img,
//       category: wish.category,
//     };
//     // cardDiv.setAttribute("wish-index", i);

//     // const button = document.createElement("button");
//     // button.textContent = "&times;";
//     // cardDiv.appendChild(button);
//     // cardDiv.appendChild(card);
//     wishList.appendChild(cardDiv);

//     //     const data = saveWishes;

//     // data.wishBoard.forEach(card => {
//     //   const card = document.createElement("div");
//     //     card.textContent = wish;
//     //     card.setAttribute("class", "wish-card");
//     //     const h2Tag = document.createElement("h2", card.wish);
//     //     const img = document.createElement("img", card.img);
//     //     const category = document.createElement("h3", card.category);

//     //     card.appendChild(h2Tag);
//     //     card.appendChild(img);
//     //     card.appendChild(category);
//     // });

//     // card.textContent = "X";
//     // console.log(wish);
//     // wishList.appendChild(card);
//     // document.getElementById("wishes-list").appendChild(card);
//   }
// }
function init() {
  const storeWishes = JSON.parse(localStorage.getItem("wishes"));

  if (storeWishes !== null) {
    wishBoard = storeWishes;
    // console.log(wishBoard);
  }

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

init();
