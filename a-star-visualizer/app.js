let startNode = {
    x: undefined,
    y: undefined,
  },
  endNode = {
    x: undefined,
    y: undefined,
  };
const m = 6,
  n = 6;

class Node {
  constructor(x, y, v, g, h, f) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.g = g;
    this.h = h;
    this.f = f;
  }
}
const emptyMatrix = function () {
  return Array(m)
    .fill(0)
    .map((row) => Array(n).fill(0));
};
let map = emptyMatrix();

// functionality
const grid = document.getElementById("grid");
const startBtn = document.getElementById("start-btn");
const endBtn = document.getElementById("end-btn");
const wallBtn = document.getElementById("wall-btn");

let btnSelected = "";

grid.style.gridTemplateRows = `repeat(${m},1fr)`;
grid.style.gridTemplateColumns = `repeat(${n},1fr)`;
map.forEach((row, i) =>
  row.forEach((el, j) => {
    map[i][j] = new Node(i, j);
    let newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.setAttribute("data-x", i);
    newSquare.setAttribute("data-y", j);
    newSquare.addEventListener("click", handleGridClick);
    grid.appendChild(newSquare);
  })
);

function handleGridClick(e) {
  let i = e.target.dataset.x;
  let j = e.target.dataset.y;
  if (map[i][j].v !== btnSelected) {
    map[i][j].v = changePoints();
  } else {
    map[i][j].v = undefined;
  }
  console.log(map);

  switch (btnSelected) {
    case "s":
      startNode.x = i;
      startNode.y = j;
      break;
    case "e":
      endNode.x = i;
      endNode.y = j;
      break;
    default:
      break;
  }
  updateGrid();
  console.log(map);
}

function changePoints() {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (
        map[i][j].v === btnSelected &&
        (btnSelected === "s" || btnSelected === "e")
      ) {
        map[i][j].v = undefined;
      }
    }
  }
  return btnSelected;
}

function updateGrid() {
  let squares = grid.querySelectorAll(".square");
  squares.forEach((el) => {
    let i = el.dataset.x;
    let j = el.dataset.y;
    el.className = "square";
    switch (map[i][j].v) {
      case "s":
        el.classList.toggle("start");
        el.innerHTML = "s";
        break;
      case "e":
        el.classList.toggle("end");
        el.innerHTML = "e";
        break;
      case 0:
        el.classList.toggle("wall");
        el.innerHTML = "";
        break;
      default:
        el.innerHTML = "";
        break;
    }
  });
}

startBtn.addEventListener("click", () => {
  if (btnSelected !== "s") {
    btnSelected = "s";
  } else {
    btnSelected = "";
  }
});
endBtn.addEventListener("click", () => {
  if (btnSelected !== "e") {
    btnSelected = "e";
  } else {
    btnSelected = "";
  }
});
wallBtn.addEventListener("click", () => {
  if (btnSelected !== 0) {
    btnSelected = 0;
  } else {
    btnSelected = "";
  }
});
