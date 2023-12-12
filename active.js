let btn = document.getElementById('btn');
let bubble = document.getElementById('bubble');
let myWidth = window.innerWidth;
let myHeight = window.innerHeight;
let myBg = document.querySelector('.background');
let sound = document.getElementById('sound');

// 화면 크기 변경 이벤트
window.addEventListener('resize', () => {
  myWidth = window.innerWidth;
  myHeight = window.innerHeight;

  // 버튼, 말풍선 화면 중앙으로
  btn.style.left = myWidth / 2 - btn.offsetWidth / 2 + 'px';
  btn.style.top = myHeight / 2 - btn.offsetHeight / 2 + 'px';
  bubble.style.left = myWidth / 2 - bubble.offsetWidth / 2 + 'px';
  bubble.style.top = myHeight / 2.5 - bubble.offsetHeight + 'px';
});

// 강아지 생성 이벤트
btn.addEventListener('click', start);
btn.addEventListener('touchstart', start);

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
  //btn 처음 클릭 시 강아지 한마리 일단 나와서 이동
  let img = document.createElement('img');
  let randNum = Math.floor(Math.random() * 2);
  img.src = imgsLeft[randNum];
  // console.log('first img =', imgsLeft[randNum]);

  img.style.width = myWidth / 100 + '%';
  img.style.height = myHeight / 100 + '%';
  document.body.appendChild(img);

  document.addEventListener('touchstart', makeDog);
  document.addEventListener('click', makeDog);

  goLeft(img, -myWidth - img.width);
  sound.play();
}

function makeDog(e) {
  //터치 좌표 기준 강아지 이동
  let img = document.createElement('img');
  if (myWidth > 800) {
    img.style.width = '10vw';
    img.style.height = '12vh';
  } else {
    img.style.width = '24vw';
    img.style.height = '20vh%';
  }
  document.body.appendChild(img);

  let secRandNum = Math.floor(Math.random() * 5);
  img.src = imgs[secRandNum]; //0,1: Left 2,3,4: Right
  let imgX, imgY;
  imgY = -img.height / 10 + e.clientY;

  if (myWidth < 800) {
    // Mobile
    imgX = e.clientX - img.width / 2;
    // imgX = e.changedTouches[0].clientX - img.width / 2;
  } else if ((myWidth > 800) & (myWidth < 1200)) {
    // PC
    // imgX = e.changedTouches[0].clientX;
    imgX = e.clientX;
  } else if (myWidth > 1200) {
    // Wide PC
    // imgX = e.changedTouches[0].clientX;
    imgX = e.clientX;
  }

  img.style.position = 'absolute';
  img.style.top = imgY + 'px';
  img.style.left = imgX + 'px';
  // console.log('imgX: ' + parseInt(img.style.left));
  // console.log('touchX: ' + e.changedTouches[0].clientX);
  // console.log('imgY: ' + parseInt(img.style.top));
  // console.log('touchY: ' + e.changedTouches[0].clientY);

  if (secRandNum <= 1) {
    // 왼쪽으로 가는 강아지
    goLeft(img, -myWidth - img.width);
  } else {
    // 오른쪽으로 가는 강아지
    goRight(img, myWidth + img.width);
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
  ).onfinish = () => {
    img.remove();
  };
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
  ).onfinish = () => {
    img.remove();
  };
}
