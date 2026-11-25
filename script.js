let gameStatus = false;
let timeLeft = 30;
let moleTimeout;
let timerInterval;
let score = 0;
let hideTimeout = [];

const startBtn = document.getElementById('start-btn');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const timeCont = document.querySelector('.time');

const defaultTimeBg = timeCont.style.background;
const defaultTimeColor = timeCont.style.color;
const defaultTimerColor = timerDisplay.style.color;

const randInter = (maxSeconds = 3) => {
  const random = Math.floor(Math.random() * maxSeconds) + 1;
  return random * 1000;
};

const popMole = () => {
  if (!gameStatus) return;

  const inActMole = [...moles].filter((mole) => !mole.classList.contains('active'));
  if (inActMole.length > 0) {
    const rand = Math.floor(Math.random() * inActMole.length);
    const mole = inActMole[rand];

    mole.classList.add('active');

    const removeClassTimeout = setTimeout(() => {
      mole.classList.remove('active');
    }, randInter(2));

    hideTimeout.push(removeClassTimeout);
  }

  moleTimeout = setTimeout(popMole, randInter(3));
};

const endGame = () => {
  gameStatus = false;
  clearInterval(timerInterval);
  clearTimeout(moleTimeout);

  hideTimeout.forEach((timeout) => clearTimeout(timeout));
  hideTimeout = [];

  moles.forEach((mole) => mole.classList.remove('active'));

  startBtn.disabled = false;
  timeCont.style.background = '#4a1212';
  timeCont.style.color = '#7e2d2d';
  timerDisplay.style.color = '#ff9999';
};

const timerStart = () => {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerDisplay.innerText = timeLeft;
    }
    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  if (gameStatus) return;

  gameStatus = true;
  timeLeft = 30;
  score = 0;

  timeCont.style.background = defaultTimeBg;
  timeCont.style.color = defaultTimeColor;
  timerDisplay.style.color = defaultTimerColor;

  scoreDisplay.innerText = score;
  timerDisplay.innerText = timeLeft;
  startBtn.disabled = true;
  startBtn.innerText = 'Start a New Game';

  popMole();
  timerStart();
});

moles.forEach((mole) => {
  mole.addEventListener('click', () => {
    if (gameStatus && mole.classList.contains('active')) {
      score++;
      mole.classList.remove('active');
      scoreDisplay.innerText = score;
    }
  });
});
