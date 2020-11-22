const container = document.getElementById("container");

//matrix properties
const rows = 20;
const cols = 40;
//animation dur must be at least 2 times higher than spread duration
const animationDuration = 0.4,
  spreadDuration = 0.15;
const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

document.documentElement.style.setProperty(
  "--animationDuration",
  animationDuration + "s"
);

let gridState = Array(rows)
  .fill(0)
  .map((row) => Array(cols).fill(0));

//setting grid properties
container.style.gridTemplateRows = `repeat(${rows},1fr)`;
container.style.gridTemplateColumns = `repeat(${cols},1fr)`;

let circles = [];
//init matrix
for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    let newCircle = document.createElement("div");

    newCircle.classList.add("circle");
    newCircle.setAttribute("row", i);
    newCircle.setAttribute("col", j);

    newCircle.addEventListener("click", startWave);

    container.appendChild(newCircle);
    row.push(newCircle);
  }
  circles.push(row);
}

function toggle(row, col) {
  if (gridState[row][col] === 0) {
    circles[row][col].classList.add("pulse");
    setTimeout(() => {
      circles[row][col].classList.remove("pulse");
      gridState[row][col] = 0;
    }, animationDuration * 1000);

    gridState[row][col] = 1;

    for (let i = 0; i < 4; i++) {
      if (
        row + dx[i] >= 0 &&
        row + dx[i] < rows &&
        col + dy[i] >= 0 &&
        col + dy[i] < cols
      ) {
        setTimeout(() => {
          toggle(row + dx[i], col + dy[i]);
        }, spreadDuration * 1000);
      }
    }
  }
}

function startWave() {
  let row = +this.getAttribute("row");
  let col = +this.getAttribute("col");
  toggle(row, col);
}
