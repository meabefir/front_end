const container = document.getElementById("container");
const btn = document.getElementById("magic");

const size = 4;
const width = container.offsetWidth;
const height = container.offsetHeight;
console.log(width, height);

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    let box = document.createElement("div");

    box.classList.add("box");
    box.style.backgroundPosition = `${-j * (width / size)}px ${
      -i * (height / size)
    }px`;

    container.appendChild(box);
  }
}

btn.addEventListener("click", () => {
  container.classList.toggle("big");
});
