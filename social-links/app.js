const container = document.getElementById("container");
let open = document.getElementById("open");
let close = document.getElementById("close");

open.addEventListener("click", () => {
  container.classList.toggle("opened");
});

close.addEventListener("click", () => {
  container.classList.toggle("opened");
});
