const wishTitle = document.getElementById("wish");
const catagories = document.getElementById("category");
const img = document.getElementById("image-url");
const sumbit = document.getElementById("sumbit");

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
