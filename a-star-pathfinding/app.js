let startNode = {
    x: 4,
    y: 4,
  },
  endNode = {
    x: 1,
    y: 1,
  };
const m = 6,
  n = 6;
const emptyMatrix = function () {
  return Array(m)
    .fill(0)
    .map((row) => Array(n).fill(0));
};

let map = emptyMatrix();
let mapG = emptyMatrix();
let mapH = emptyMatrix();
let mapF = emptyMatrix();

map[startNode.x][startNode.y] = "s";
map[endNode.x][endNode.y] = "e";

calcCost(mapG, startNode);
calcCost(mapH, endNode);
calcTotalCost();

function calcDist(x1, x2, y1, y2) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

function calcCost(matrix, node) {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let dist = Math.floor(calcDist(i, node.x, j, node.y) * 10);
      matrix[i][j] = dist;
    }
  }
}
function calcTotalCost() {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mapF[i][j] = mapG[i][j] + mapH[i][j];
    }
  }
}
console.log(mapF);
