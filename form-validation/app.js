const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === "") {
    setError(username, "Username cannot be blank");
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setError(email, "Not a valid email");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password cannot be blank");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "Password cannot be blank");
  } else if (password2Value !== passwordValue) {
    setError(password2, "Passwords does not match");
  } else {
    setSuccess(password2);
  }
}

function setError(el, msg) {
  removeMsg(el);
  const parent = el.parentNode;
  parent.className = "form-control error";
  let msgDiv = document.createElement("div");
  msgDiv.className = "msg";
  let text = document.createTextNode(msg);
  msgDiv.appendChild(text);
  parent.insertAdjacentElement("beforeend", msgDiv);
  //   const msgEl = el.nextElementSibling.nextElementSibling.nextElementSibling;
  //   msgEl.innerHTML = msg;
}

function setSuccess(el) {
  removeMsg(el);
  const parent = el.parentNode;
  parent.className = "form-control success";
}

function removeMsg(el) {
  let msg = el.parentNode.lastElementChild;

  if (msg) {
    if (msg.classList.contains("msg")) {
      msg.remove();
    }
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
