const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];

const container = document.getElementById('container');

const c_width = 40*10,
      c_height = 60*10,
      s_per_row = 20,
      s_per_column = 30,
      s_width = c_width/s_per_row-2,
      s_height = c_height/s_per_column-2,
      animation_delay = 1.5;
let z_index = -1;

console.log(s_width,s_height);
container.style.width = `${c_width}px`;
container.style.height = `${c_height}px`;

for (let i = 1; i <= s_per_row*s_per_column; i++){
  let square = document.createElement('div');

  square.classList.add('square');

  square.style.width = `${s_width}px`;
  square.style.height = `${s_height}px`;

  square.addEventListener('mouseenter',mouseEnter);
  square.addEventListener('mouseleave',mouseLeave);

  container.appendChild(square);
}

// document.querySelectorAll('.square:not(:hover)').forEach((item) => {
//   item.style.transition = `background ${animation_delay}s`;
// });


function getRandomColor(){
  return colors[Math.floor(Math.random()*colors.length)];
}

function mouseEnter(e){
  let color = getRandomColor();
  this.style.background = color;
  this.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  this.style.zIndex = z_index++;
  console.log(z_index);
}

function mouseLeave(e){
  this.style.background = '#1d1d1d';
  this.style.boxShadow = `0 0 2px #000`;
  this.style.zIndex = '0';
}
