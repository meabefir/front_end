const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let screenMode = 'light';

const body = document.getElementById('body');
const screenToggle = document.getElementById('screen-mode');
const clockContainer = document.getElementById('clock-container');
const timeContainer = document.getElementById('time-container');

onLoad();

function onLoad(){
  screenToggle.addEventListener('click',handleClick)

  for (let i = 0 ;i < 60; i++){
    let newTickContainer = document.createElement('div');
    newTickContainer.classList.add('tick-container');
    newTickContainer.style.transform = `translatex(-50%) rotate(${i*6}deg)`;

    let newTick = document.createElement('div');
    if (i % 5 == 0){
      newTick.classList.add('big-tick');
    } else {
      newTick.classList.add('small-tick');
    }

    newTickContainer.appendChild(newTick);
    clockContainer.appendChild(newTickContainer);
  }

  setInterval(tick,100);
}

function handleClick(e){
  if (screenMode === 'light'){
    this.innerHTML = 'Light mode';
    darkMode();
    screenMode = 'dark';
  } else {
    this.innerHTML = 'Dark mode';
    lightMode();
    screenMode = 'light';
  }
}

function darkMode(){
  body.classList.replace('light','dark');
  screenToggle.classList.replace('light','dark');
  clockContainer.classList.replace('light','dark');
  timeContainer.classList.replace('light','dark');
}

function lightMode(){
  body.classList.replace('dark','light');
  screenToggle.classList.replace('dark','light');
  clockContainer.classList.replace('dark','light');
  timeContainer.classList.replace('dark','light');
}

// TIME //////////////////////////
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const hours = document.getElementById('hours');

const time = document.getElementById('time');
const date = document.getElementById('date');

function tick(){
  let now = new Date();
  let now_s = now.getSeconds();
  let now_m = now.getMinutes();
  let now_h = now.getHours();
  let month = now.getMonth();
  let day = now.getDay();
  let dateOfMonth = now.getDate();

  seconds.style.transform = `translate(-50%) rotate(${now_s*6}deg)`;
  minutes.style.transform = `translate(-50%) rotate(${now_m*6+now_s*6/60}deg)`;
  hours.style.transform = `translate(-50%,70px) rotate(${now_h*15+now_m*15/60}deg)`;

  time.innerText = `${now_h < 10 ? `0${now_h}` : now_h}:${now_m < 10 ? `0${now_m}` : now_m}`;
  date.innerHTML = `
    ${days[day]}, ${months[month]}
    <span>${dateOfMonth}</span>
  `;
}
