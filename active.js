let btn = document.getElementById('btn');
let myWidth = window.innerWidth;
let myHeight = window.innerHeight;
let myBg = document.querySelector('body');
let sound = document.getElementById('sound');

window.addEventListener('resize', function () {
  myWidth = window.innerWidth;
  myHeight = window.innerHeight;
});
btn.addEventListener('click', start);
btn.addEventListener('touch', start);

let imgs = [
  './imgs/dogL1.gif',
  './imgs/dogL2.gif',
  './imgs/dogR1.gif',
  './imgs/dogR2.gif',
  './imgs/dogR3.gif',
];
let imgsLeft = ['./imgs/dogL1.gif', './imgs/dogL2.gif'];
let imgsRight = ['./imgs/dogR1.gif', './imgs/dogR2.gif', './imgs/dogR3.gif'];

function start() {
  //btn 처음 클릭 시
  move();
}

function move() {
  //강아지 한마리 일단 나와서 이동
  // alert(imgsLeft[0]);
  let img = document.createElement('img');
  let j = Math.floor(Math.random() * 2);
  img.src = imgsLeft[j];
  console.log('first img =', j);
  img.style.width = '7%';
  img.style.height = '10%';
  // img.style.width = '80px';
  // img.style.height = '100px';
  document.body.appendChild(img);
  document.addEventListener('touchstart', touch);
  goLeft(img, -myWidth - img.width);
  sound.play();
}

function touch(e) {
  //터치 좌표 기준 강아지 이동
  let img = document.createElement('img');
  img.style.width = '80px';
  img.style.height = '100px';
  document.body.appendChild(img);
  let i = Math.floor(Math.random() * 5);
  img.src = imgs[i]; //0,1: Left 2,3,4: Right

  let imgX = e.changedTouches[0].clientX - img.width / 2;
  let imgY = -img.height / 10 + e.changedTouches[0].clientY;
  img.style.position = 'absolute';
  img.style.top = imgY + 'px';
  img.style.left = imgX + 'px';

  // console.log('next img =', i);
  // console.log('imgX: ' + parseInt(img.style.left));
  // console.log('touchX: ' + e.changedTouches[0].clientX);
  // console.log('imgY: ' + parseInt(img.style.top));
  // console.log('touchY: ' + e.changedTouches[0].clientY);

  if (i <= 1) {
    goLeft(img, -myWidth - img.width);
    console.log(-myWidth - img.width);
  } else {
    goRight(img, myWidth - img.width);
    console.log('myWidth', myWidth - img.width);
  }
}

function goLeft(img, to) {
  img.animate(
    {
      marginLeft: [to + 'px'],
    },
    {
      duration: 5000,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );
}

function goRight(img, to) {
  img.animate(
    {
      marginLeft: [to + 'px'],
    },
    {
      duration: 5000,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );
}
