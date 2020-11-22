const jokeEl = document.getElementById("joke");
const nextBtn = document.getElementById("next-joke");

async function generateJoke() {
  const jokeRes = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const joke = await jokeRes.json();
  jokeEl.innerHTML = joke.joke;
}

generateJoke();

nextBtn.addEventListener("click", generateJoke);
