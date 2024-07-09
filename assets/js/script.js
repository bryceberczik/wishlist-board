const wishTitle = document.getElementById("wish");
const catagories = document.getElementById("category");
const img = document.getElementById("image-url");
const sumbit = document.getElementById("sumbit");
const wishList = document.getElementById("wishes-list");

let wishBoard = [];

function saveWishs() {
  const wish = {
    wish: wishTitle.value.trim(),
    catagories: catagories.value,
    img: img.value,
  };
  if (wish.wishTitle === "" || wish.catagories === "" || wish.img === "") {
    alert("Please complete the enire form");
  } else {
    wishBoard.push(wish);
    localStorage.setItem("wish", JSON.stringify(wishBoard));
  }
}

sumbit.addEventListener("click", function (event) {
  event.preventDefault();
  saveWishs();
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
