setInterval(createDroplet, 250);

function createDroplet() {
  let droplet = document.createElement("div");

  droplet.classList.add("droplet");

  let left = Math.random() * window.innerWidth;
  let top = Math.random() * window.innerHeight;
  droplet.style.top = `${top}px`;
  droplet.style.left = `${left}px`;

  document.body.appendChild(droplet);

  setTimeout(() => {
    droplet.remove();
  }, 3000);
}
