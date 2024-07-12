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

    wishList.appendChild(card);
    document.body.children[2].children[1].appendChild(wishList);
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

