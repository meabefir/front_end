const users = document.getElementById("users");
const input = document.getElementById("input");
const nr = 50;

let usersArr = [];

async function getUsers() {
  const res = await fetch(`https://randomuser.me/api/?results=${nr}`);

  let all = await res.json();

  all.results.forEach((data) => {
    const user = {
      name: `${data.name.first} ${data.name.last}`,
      location: `${data.location.state}, ${data.location.country}`,
      img: data.picture.thumbnail,
    };
    usersArr.push(user);

    users.innerHTML += `
    <div class="user">
        <img src="${user.img}" />
        <div class="user-info">
            <div class="name">${user.name}</div>
            <small class="location">${user.location}</small>
        </div>
    </div>
  `;
  });
}

function filter(e) {
  let usersEl = users.querySelectorAll(".user");
  usersEl = Array.from(usersEl);
  usersEl.forEach((user, i) => {
    if (
      `${usersArr[i].name} ${usersArr[i].location}`
        .toLowerCase()
        .split(",")
        .join("")
        .includes(e.target.value)
    ) {
      user.style.display = "flex";
    } else {
      user.style.display = "none";
    }
  });
}

getUsers();

input.addEventListener("input", filter);
