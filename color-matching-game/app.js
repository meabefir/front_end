const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
let circles = ["red", "blue"];
let ballSize = 15;
let speed = 2;
let maxSpeed = 4;
let ball = {
  x: undefined,
  y: undefined,
  speed: undefined,
  color: undefined,
};

function drawScore() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Score: ${score}`, canvas.width - 75, 30);
}

function drawMiddleCircles() {
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2 - ballSize * 1.2,
    ballSize,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = circles[0];
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2 + ballSize * 1.2,
    ballSize,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = circles[1];
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  if (ball.x != undefined) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScore();
  drawMiddleCircles();
  drawBall();
}

function createBall() {
  let side = Math.random();
  let color = Math.random();
  if (side < 0.5) {
    ball.x = canvas.width / 2;
    ball.y = ballSize * 1.2;
    ball.speed = speed;
    ball.color = color < 0.5 ? "red" : "blue";
  } else {
    ball.x = canvas.width / 2;
    ball.y = canvas.height - ballSize * 1.2;
    ball.speed = -speed;
    ball.color = color < 0.5 ? "red" : "blue";
  }
}

function moveBall() {
  ball.y += ball.speed;

  //collission
  if (
    ball.y > canvas.height / 2 - ballSize * 1.2 - ballSize * 2 &&
    ball.y < canvas.height / 2 + ballSize * 1.2 + ballSize * 2
  ) {
    let dir;
    if (ball.speed > 0) {
      dir = 0;
    } else {
      dir = 1;
    }
    if (ball.color === circles[dir]) {
      score++;
      if (speed < maxSpeed) {
        speed += 0.2;
      }
      createBall();
    } else {
      ball.x = undefined;
      ball.y = undefined;
      score = 0;
      speed = 2;
    }
  }
}

function update() {
  draw();
  if (ball.x === undefined) {
    createBall();
  }
  moveBall();

  requestAnimationFrame(update);
}

update();

document.addEventListener("click", () => {
  [circles[0], circles[1]] = [circles[1], circles[0]];
});
