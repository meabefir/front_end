const input = document.getElementById("input");
const container = document.getElementById("container");
const nrSuggestions = document.getElementById("nr-suggestions");

let nrVotes = [];

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    newSuggestion(input.value);

    input.value = "";
    e.preventDefault();
  }
});

function newSuggestion(value) {
  nrVotes.push(0);

  nrSuggestions.innerHTML = `
    ${nrVotes.length} suggestions
  `;

  let suggestion = document.createElement("div");

  suggestion.classList.add("suggestion");
  suggestion.innerHTML += `
    <h3>${value}</h3>
    <div class="votes-container">
          <div class="buttons">
            <button class="upvote" onclick="increment(${container.children.length})"><i class="fas fa-chevron-up"></i></button>
            <button class="downvote" onclick="decrement(${container.children.length})">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <span class="nr-votes">0 votes</span>
        </div>
  `;

  container.appendChild(suggestion);
}

function increment(el) {
  let votes = container.children[el].children[1].children[1];
  votes.innerHTML = `
    ${++nrVotes[el - 1]} votes
  `;
}

function decrement(el) {
  let votes = container.children[el].children[1].children[1];
  votes.innerHTML = `
    ${--nrVotes[el - 1]} votes
  `;
}
