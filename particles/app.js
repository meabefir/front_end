const canvas = document.getElementById("canvas");
const nrInput = document.getElementById("nr-balls-input");
const nrSpan = document.getElementById("nr-balls-span");
const rangeInput = document.getElementById("range-input");
const rangeSpan = document.getElementById("range-span");
const showRangeInput = document.getElementById("radius-show");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

const ctx = canvas.getContext("2d");

nrSpan.innerHTML = nrInput.value;
rangeSpan.innerHTML = rangeInput.value + "px";

let nrOfBalls = nrInput.value;
let maxDist = rangeInput.value;
const ball = {
  size: 5,
  speed: 1.5
};

let balls = [],
  lines = [];
ranges = [];
for (let i = 0; i < nrOfBalls; i++) {
  createBall();
}

function createBall() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const sign = Math.floor(Math.random() * 2);
  const dx = Math.random() * ball.speed * (sign == 0 ? -1 : 1);
  const dy = Math.random() * ball.speed * (sign == 0 ? -1 : 1);
  let newBall = { ...ball, x, y, dx, dy };
  balls.push(newBall);
}

function destroyBall() {
  balls.pop();
}

function drawBalls() {
  balls.forEach(ball => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#999";
    ctx.fill();
    ctx.closePath();
  });
}

function drawRanges() {
  if (showRangeInput.checked) {
    balls.forEach(range => {
      ctx.beginPath();
      ctx.arc(range.x, range.y, maxDist / 2, 0, Math.PI * 2);
      ctx.strokeStyle = "#fd231e";
      ctx.stroke();
      ctx.closePath();
    });
  }
}

function drawLines() {
  lines.forEach(line => {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.strokeStyle = "#999";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  });
}

function moveBalls() {
  balls.forEach(ball => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x < 0) {
      ball.x = canvas.width;
    }
    if (ball.x > canvas.width) {
      ball.x = 0;
    }
    if (ball.y < 0) {
      ball.y = canvas.height;
    }
    if (ball.y > canvas.height) {
      ball.y = 0;
    }
  });
}

function distanceBetween(ball1, ball2) {
  let a = ball1.x - ball2.x;
  let b = ball1.y - ball2.y;

  return Math.sqrt(a * a + b * b);
}

function calcLines() {
  lines = [];
  for (let i = 0; i < nrOfBalls; i++) {
    for (let j = 0; j < nrOfBalls; j++) {
      if (balls[i] && balls[j]) {
        let distance = distanceBetween(balls[i], balls[j]);
        if (distance < maxDist) {
          let line = {
            x1: balls[i].x,
            y1: balls[i].y,
            x2: balls[j].x,
            y2: balls[j].y
          };
          lines.push(line);
        }
      }
    }
  }
}

function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw balls
  drawBalls();
  //drawLines();
  drawLines();
  //draw ranges
  drawRanges();
}

function update() {
  //moveBalls();
  moveBalls();
  calcLines();
  handleShowRange();

  //draw everything
  draw();

  requestAnimationFrame(update);
}

//start game
update();

function updateNrOfBalls(e) {
  if (e.target.value > balls.length) {
    for (let i = 0; i < e.target.value - nrOfBalls; i++) {
      createBall();
    }
  } else {
    for (let i = 0; i < nrOfBalls - e.target.value; i++) {
      destroyBall();
    }
  }

  nrOfBalls = balls.length;
  nrSpan.innerHTML = e.target.value;

  console.log(balls.length);
}

function updateMaxRange(e) {
  maxDist = e.target.value;
  rangeSpan.innerHTML = e.target.value + "px";
}

function handleShowRange() {}

//event listeners
nrInput.addEventListener("input", updateNrOfBalls);
rangeInput.addEventListener("input", updateMaxRange);
