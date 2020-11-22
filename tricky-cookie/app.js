const trickyBtn = document.getElementById('tricky-btn');
const normalBtn = document.getElementById('normal-btn');
const buttonsContainer = document.getElementById('buttons-container');

buttonsContainer.style.flexDirection = 'row';

trickyBtn.addEventListener('mouseover',move);

function move(){
  if (buttonsContainer.style.flexDirection == 'row'){
    buttonsContainer.style.flexDirection = 'row-reverse';
  } else {
    buttonsContainer.style.flexDirection = 'row';
  }
}
