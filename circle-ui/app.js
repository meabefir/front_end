//data
const names = [
  "jerry",
  "dick",
  "morty",
  "dick",
  "summer",
  "beth",
  "birdperson",
];

//elements
const circle = document.getElementById("circle");

const nr = 7;
const circleSize = 700;
const rotationSpd = 10,
  rotationInc = 0.1;
let currRot = 0;

// circle properties
circle.style.width = `${circleSize}px`;
circle.style.height = `${circleSize}px`;

//rotate circle
const rotateInt = setInterval(() => {
  currRot += rotationInc;
  circle.style.transform = `rotate(${currRot}deg)`;
}, rotationSpd);

const build = () => {
  for (let i = 0; i < nr; i++) {
    //card container
    let newCardContainer = document.createElement("div");
    newCardContainer.className = "card-container";
    newCardContainer.style.transform = `translatex(-50%) rotate(${
      (i * 360) / nr
    }deg) `;
    newCardContainer.style.zIndex = 0;

    //card
    let newCard = document.createElement("div");
    newCard.className = "card";

    //name p3
    let name = document.createElement("h2");
    name.innerHTML = names[i][0].toUpperCase() + names[i].slice(1);

    //add name to card
    newCard.appendChild(name);
    //add card to card container
    newCardContainer.appendChild(newCard);
    //add card container to circle
    circle.appendChild(newCardContainer);
  }
};

build();
