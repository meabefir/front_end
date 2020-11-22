const box = document.getElementById("box");

let angle = 0;

setInterval(() => {
  box.style.transform = `rotatez(${angle}deg `;
  angle++;
}, 10);
