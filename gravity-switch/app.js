const container = document.getElementById('gravity-switch-container');
const ball = document.getElementById('gravity-switch-ball');

let state = 1;
const animation_duration = 1;

let root = document.documentElement;
root.style.setProperty('--animation-duration', animation_duration + "s");

container.addEventListener('click',() => {
  if (!container.classList.contains('running')){
    container.classList.add('running');
    if (state == 1){
      container.classList.add('animate-gravity-switch-container');
      ball.classList.add('animate-gravity-switch-ball');

      setTimeout(()=>{
        container.classList.remove('animate-gravity-switch-container');
        container.classList.remove('running');
      },animation_duration*1000);

      state = 2;
    } else {
      container.classList.add('deanimate-gravity-switch-container');
      ball.classList.remove('animate-gravity-switch-ball');
      ball.classList.add('deanimate-gravity-switch-ball');

      setTimeout(()=>{
        container.classList.remove('deanimate-gravity-switch-container');
        ball.classList.remove('deanimate-gravity-switch-ball');
        container.classList.remove('running');
      },animation_duration*1000);

      state = 1;
    }
  }
})
