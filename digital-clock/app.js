const states = [
  [0, 1, 2, 3, 5, 6, 8, 9, 11, 12, 13, 14],
  [2, 5, 8, 11, 14],
  [0, 1, 2, 5, 6, 7, 8, 9, 12, 13, 14],
  [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 14],
  [0, 2, 3, 5, 6, 7, 8, 11, 14],
  [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14],
  [0, 1, 2, 3, 6, 7, 8, 9, 11, 12, 13, 14],
  [0, 1, 2, 5, 8, 11, 14],
  [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14],
  [0, 1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14],
];

const container = document.getElementById("container");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const colons = document.querySelectorAll(".colon");

const digit = `
  <div class="d">
    ${Array(15)
      .fill(0)
      .map((_) => `<div class="square"></div>`)
      .join("")}
  </div>
`;

initiate(hours);
initiate(minutes);
initiate(seconds);
colons.forEach((colon) => {
  initiateC(colon);
});
setColons();

function setColons() {
  colons.forEach((colon) => {
    let squares = colon.querySelectorAll(".square");
    squares.forEach((square, si) => {
      if (si === 4 || si === 10) {
        square.style.opacity = "1";
      } else {
        square.style.opacity = "0";
      }
    });
  });
}

function initiateC(element) {
  element.innerHTML = `
    ${digit}
  `;
}

function initiate(element) {
  element.innerHTML = `
    ${digit}
    ${digit}
  `;
}

function update(t, type) {
  let d = [];
  if (t > 9) {
    d[0] = +t[0];
    d[1] = +t[1];
  } else {
    d[0] = 0;
    d[1] = +t;
  }

  let el;
  switch (type) {
    case "h":
      el = hours;
      break;
    case "m":
      el = minutes;
      break;
    case "s":
      el = seconds;
      break;
  }
  console.log(el);

  let digits = Array.from(el.querySelectorAll(".d"));
  digits.forEach((digit, di) => {
    let squares = digit.querySelectorAll(".square");
    squares.forEach((square, si) => {
      if (states[d[di]].includes(si)) {
        square.style.opacity = "1";
      } else {
        square.style.opacity = "0";
      }
    });
  });
}

setInterval(() => {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  update(String(h), "h");
  update(String(m), "m");
  update(String(s), "s");
  console.log("\n");
}, 1000);
