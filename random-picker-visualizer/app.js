const textarea = document.getElementById("input");
const items = document.getElementById("items");

let input = [];

function handleInput(e) {
  input = e.target.value
    .split(",")
    .map((el) => el.trim())
    .filter((el) => el != "");
  console.log(input);

  updateContent(input);
}

function updateContent(input) {
  items.innerHTML = "";
  input.forEach((el) => {
    items.innerHTML += `
        <div class="item">${el}</div>
      `;
  });
}

function pickRandom(e) {
  if (e.keyCode === 13) {
    textarea.value = "";

    let nr = 20;
    let interval = setInterval(() => {
      pick(nr--);
    }, 100);

    function pick(val) {
      if (val <= 0) {
        clearInterval(interval);
      }
      let nr = Math.floor(Math.random() * input.length);
      let nodes = items.querySelectorAll(".item");
      nodes.forEach((node) => node.classList.remove("picked"));
      nodes[nr].classList.add("picked");
    }

    e.preventDefault();
  }
}

// ES
textarea.addEventListener("input", handleInput);
textarea.addEventListener("keydown", pickRandom);
