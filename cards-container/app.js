const container = document.getElementById("container");
const addBtn = document.getElementById("add");
const removeBtn = document.getElementById("remove");

//vars
const initNr = 10;
let nr = 0;
let cards = [];
let startDragPos = undefined,
  endDragPos = undefined;

//default card
const cartHTML = `
    <div class="image">
        <div class="btn"></div>
    </div>
    <div class="par"></div>
    <div class="par"></div>
    <div class="par"></div>
    <div class="badge"></div>
`;

const getDragPos = (e) => {
  if (!e.target.classList.contains("card")) {
    return cards.indexOf(e.target.parentElement);
  }
  return cards.indexOf(e.target);
};

//switch cards
const switchCards = (start, end) => {
  if (start === end) return;

  const tween1 = gsap.to(cards[end], {
    duration: 0.5,
    x: cards[start].offsetLeft - cards[end].offsetLeft,
    y: cards[start].offsetTop - cards[end].offsetTop,
    ease: "steps(40)",
  });

  const tween2 = gsap.to(cards[start], {
    duration: 0.5,
    x: cards[end].offsetLeft - cards[start].offsetLeft,
    y: cards[end].offsetTop - cards[start].offsetTop,
    ease: "steps(40)",

    onComplete: () => {
      gsap.to(cards[start], { duration: 0, x: 0, y: 0 });
      gsap.to(cards[end], { duration: 0, x: 0, y: 0 });

      cards[start].style.transform = "";
      cards[end].style.transform = "";
      let temp = cards[start];
      cards[start] = cards[end];
      cards[end] = temp;
      loadCards();
    },
  });

  console.log(cards[start]);

  cards[end].classList.add("pop");
  cards[start].classList.add("pop");
  setTimeout(() => {
    cards[end].classList.remove("pop");
    cards[start].classList.remove("pop");
  }, 200);
};

//create card and add event listeners
const newCard = () => {
  let newCard = document.createElement("div");
  newCard.className = "card";
  newCard.draggable = true;
  newCard.innerHTML = cartHTML;

  newCard.lastElementChild.innerHTML = ++nr;

  //event listener for button
  newCard.firstElementChild.addEventListener("click", (e) => {
    cards = cards.filter((card) => card != e.target.parentElement);
    e.target.parentElement.remove();
  });

  newCard.addEventListener("click", (e) => {
    console.log(e.target.offsetTop, e.target.offsetLeft, e.target.offsetWidth);
  });

  // DRAG EVENTS ///////////////////////////////
  newCard.addEventListener("dragstart", (e) => {
    startDragPos = getDragPos(e);

    // console.log(startDragPos);
    // console.log("drag start");
  });

  newCard.addEventListener("dragenter", (e) => {
    e.target.style.opacity = ".5";
  });

  newCard.addEventListener("dragover", (e) => {
    e.preventDefault();
    // console.log("drag over");
  });

  newCard.addEventListener("dragleave", (e) => {
    e.target.style.opacity = "1";
  });

  newCard.addEventListener("dragend", (e) => {
    // console.log("drag end");
  });

  newCard.addEventListener("drop", (e) => {
    e.target.style.opacity = "1";
    endDragPos = getDragPos(e);
    switchCards(startDragPos, endDragPos);

    // console.log(endDragPos);
    // console.log("drag drop");
    // console.log(e.target);
  });

  container.appendChild(newCard);
  cards.push(newCard);
};

//remove cards
const removeCard = () => {
  cards.pop();
  nr--;
};

//create initial cards
const initCards = () => {
  for (let i = 1; i <= initNr; i++) {
    newCard();
  }
};

const loadCards = () => {
  container.innerHTML = "";
  cards.forEach((card) => container.appendChild(card));
  //   console.log(cards, nr);
};

//initial load
initCards();
loadCards();

addBtn.addEventListener("click", () => {
  newCard();
  loadCards();
});

removeBtn.addEventListener("click", () => {
  if (nr > 1) {
    removeCard();
    loadCards();
  }
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});
