let cards = document.querySelectorAll(".card");

cards = Array.from(cards);

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => {
      item.classList.remove("extended");
    });
    card.classList.add("extended");
  });
});
