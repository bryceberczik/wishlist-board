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
    localStorage.setItem("wishs", JSON.stringify(wishBoard));
  }
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  saveWishes();
});

function renderWishes() {
  wishList.innerHTML = "";

  for (let i = 0; i < wishBoard.length; i++) {
    const wish = wishBoard[i];

    const li = document.createElement("li");
    li.textContent = wish;
    li.setAttribute("data-index", i);

    const deletebtn = document.createElement("????");
    deletebtn.textContent = "X";

    li.appendChild(deletebtn);
    wishList.appendChild(li);
  }
}
