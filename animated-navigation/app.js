const btn = document.getElementById("btn");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const container = document.getElementById("container");

let state = "opened";

btn.addEventListener("click", () => {
  if (state === "opened") {
    line1.classList.add("close");
    line2.classList.add("close");
    container.classList.add("close");
    state = "closed";
  } else {
    line1.classList.remove("close");
    line2.classList.remove("close");
    container.classList.remove("close");
    state = "opened";
  }
});
