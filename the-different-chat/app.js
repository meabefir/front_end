const button = document.getElementById("send");
const input = document.getElementById("input");
let screen = document.getElementById("screen");

function sendMessage() {
  let text = input.value;
  if (text.trim() !== "") {
    let newMessage = document.createElement("p");

    newMessage.classList.add("message");
    newMessage.innerHTML = text;
    console.log("ye");

    let firstChild = screen.querySelector(".message");
    screen.insertBefore(newMessage, firstChild);

    input.value = "";
  }
}

function testEnter(e) {
  if (e.keyCode === 13) {
    sendMessage();
  }
}

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", testEnter);
