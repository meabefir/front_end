document.addEventListener("keydown", e => {
  let key = e.key;
  let keyCode = e.keyCode;
  let code = e.code;

  document.getElementById("container").innerHTML = `
    <div class="event" id="key"><span>event.key</span>${key}</div>
    <div class="event" id="key-code"><span>event.keyCode</span>${keyCode}</div>
    <div class="event" id="code"><span>event.code</span>${code}</div>
  `;
});
