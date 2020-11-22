const button = document.getElementById("button");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

button.addEventListener("click", () => {
  sidebar.classList.toggle("slide");
  content.classList.toggle("active");
  if (sidebar.classList.contains("slide")) {
    button.firstChild.className = "fas fa-times";
  } else {
    button.firstChild.className = "fas fa-bars";
  }
});
