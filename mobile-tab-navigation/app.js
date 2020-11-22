let links = document.getElementsByTagName("a");
let images = document.getElementsByTagName("img");

links = Array.from(links);
images = Array.from(images);

links.forEach((link, i) => {
  link.addEventListener("click", (e) => {
    links.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
    images.forEach((img) => img.classList.remove("show"));
    images[i].classList.add("show");
  });
});
