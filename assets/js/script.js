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
    alert("Please complete the enire form");
  } else {
    wishBoard.push(wish);
    localStorage.setItem("wishes", JSON.stringify(wishBoard));
  }
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveWishes();
});

// function renderWishes() {
//   wishList.innerHTML = "";

//   for (let i = 0; i < wishBoard.length; i++) {
//     const wish = wishBoard[i];

//     const li = document.createElement("li");
//     li.textContent = wish;
//     li.setAttribute("wish-index", i);

//     const card = document.createElement("div");
//     card.setAttribute("class", "wish-card ");
//     // card.textContent = "X";

//     li.appendChild(card);
//     wishList.appendChild(li);
//   }
// }

// function init() {
//   const storeWishes = JSON.parse(localStorage.getItem("wishes"));

//   if (storeWishes !== null) {
//     wishes = storeWishes;
//   }

//   renderWishes();
// }

