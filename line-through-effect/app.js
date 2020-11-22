const textEl = document.getElementById("text");

const text = "We love to play";
text.split("").forEach((char) => {
  let letter = document.createElement("span");
  console.log(char);

  letter.classList.add("letter");
  let z = Math.floor(Math.random() * 2) * 2;
  letter.style.zIndex = `${z}`;
  letter.innerHTML = char;

  document.body.appendChild(letter);
});
