const buttons = document.querySelectorAll("button");

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    e.target.parentNode.classList.toggle("show");
  })
);
