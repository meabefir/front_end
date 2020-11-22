const texts = [
  `You never read a book on psychology, Tippy. You didn\'t need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
  `I know more about the private lives of celebrities than I do about any governmental policy that will actually affect me. I'm interested in things that are none of my business, and I'm bored by things that are important to know.`,
  `A spider's body consists of two main parts: an anterior portion, the prosoma (or cephalothorax), and a posterior part, the opisthosoma (or abdomen).`,
  `As customers of all races, nationalities, and cultures visit the Dekalb Farmers Market by the thousands, I doubt that many stand in awe and contemplate the meaning of its existence. But in the capital of the Sunbelt South, the quiet revolution of immigration and food continues to upset and redefine the meanings of local, regional, and global identity.`,
  `Outside of two men on a train platform there's nothing in sight. They're waiting for spring to come, smoking down the track. The world could come to an end tonight, but that's alright. She could still be there sleeping when I get back.`,
  `I'm a broke-nose fighter. I'm a loose-lipped liar. Searching for the edge of darkness. But all I get is just tired. I went looking for attention. In all the wrong places. I was needing a redemption. And all I got was just cages.`,
];

const startButton = document.getElementById("start-game");
const container = document.getElementById("container");
let textEl, inputEl, wpmEl;

let wordIndex = 0,
  prevWordIndex = 0,
  letterIndex = 0,
  words,
  s = 0,
  interval = "",
  wpm;

function startGame() {
  let text = texts[Math.floor(Math.random() * texts.length)].trim();
  // let text = texts[0].trim();
  words = text.split(" ");

  container.innerHTML = `
    <h2>Type the text bellow</h2>
    <progress id="progress" value="0" max="100"></progress>
    <div id="text" class="text">
    ${text
      .split(" ")
      .map(
        (word) =>
          `<span class="word">${word
            .split("")
            .map((letter) => `<span class="letter">${letter}</span>`)
            .join("")}</span>`
      )
      .join("")}
    </div>
    <input type="text" id="input" class="input">
    <div class="wpm-container" id='wpm-container'>
      <h2>WPM: <span>0</span></h2>
      <h2>Time: <span>0s</span></h2>
    </div>
  `;

  wpmEl = document.getElementById("wpm-container");
  textEl = document.getElementById("text");
  inputEl = document.getElementById("input");

  loadEventListeners();

  underlineWord(wordIndex);
  inputEl.focus();
}

// load dynamic element's event listeners
function loadEventListeners() {
  inputEl.addEventListener("input", handleInput);
}

function underlineWord(index) {
  textEl.querySelectorAll(".word")[prevWordIndex].classList.remove("underline");
  textEl.querySelectorAll(".word")[index].classList.add("underline");
  prevWordIndex = index;
}

function handleInput() {
  if (interval == "") {
    interval = setInterval(updateWPM, 1000);
  }
  let currentInput = inputEl.value;
  let currentWordEl = document.querySelectorAll(".word")[wordIndex];
  // if inserting correct input
  if (words[wordIndex].indexOf(currentInput) == 0) {
    // remove classes of green and red
    currentWordEl.querySelectorAll(".letter").forEach((letter) => {
      letter.classList.remove("green");
      letter.classList.remove("red");
    });
    // add clas of green
    for (let i = 0; i < currentInput.length; i++) {
      currentWordEl.querySelectorAll(".letter")[i].classList.add("green");
    }
  } else {
    currentWordEl.querySelectorAll(".letter").forEach((letter, i) => {
      letter.classList.remove("red");
      if (!letter.classList.contains("green") && i < currentInput.length) {
        letter.classList.add("red");
      }
    });
  }
  // if inserting space after correct word , go to next word and underline it and empty input
  if (
    words[wordIndex].indexOf(currentInput.slice(0, currentInput.length - 1)) !=
      -1 &&
    currentInput[currentInput.length - 1] == " " &&
    words[wordIndex].length == currentInput.length - 1
  ) {
    inputEl.value = "";

    //update progress and check for victory
    updateProgress();

    wordIndex++;
    if (wordIndex < words.length) {
      underlineWord(wordIndex);
    } else {
      // WON
      textEl
        .querySelectorAll(".word")
        [words.length - 1].classList.remove("underline");
      // go to win screen
      container.innerHTML = `
        <h1>Your WPM is <span>${wpm}</span></h1>
        <button class="btn" onclick="function reload(){location.reload()};reload()">Play again</button>
      `;
      //stop interval
      clearInterval(interval);
    }
  }
}

function updateWPM() {
  s++;
  wpm = Math.floor((wordIndex * 60) / s);

  wpmEl.innerHTML = `
    <h2>WPM: <span>${wpm}</span></h2>
    <h2>Time: <span>${s}s</span></h2>
  `;
}

function updateProgress() {
  let newVal =
    wordIndex != words.length
      ? Math.floor((wordIndex / words.length) * 100)
      : 100;
  document.getElementById("progress").value = newVal;
}

//listeners
startButton.addEventListener("click", startGame);
