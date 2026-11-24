let gameStatus = false;
let timeLeft = 30;
let moleTimeout;
let timerInterval;
let removeClassTimeout;
let score = 0;

const startBtn = document.getElementById('start-btn');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const time_cont = document.querySelector('.time');
const timerHead = document.getElementById('timer-head');

const randInter = (maxSeconds = 3) => {
    const random = Math.floor(Math.random() * maxSeconds) + 1;
    return random * 1000;
};

let hideTimeout = [];

const popMole = () => {
    if (!gameStatus) return;
    let inActMole = [...moles].filter((mole) => {
       return !mole.classList.contains('active');
    });

    // Make sure we pick randomly from the INACTIVE moles only
    let rand = Math.floor(Math.random() * inActMole.length);
    let mole = inActMole[rand];
    mole.classList.add('active');

    removeClassTimeout = setTimeout(() => {
        mole.classList.remove('active');
    }, randInter(2));

    hideTimeout.push(removeClassTimeout);

    moleTimeout = setTimeout(popMole, randInter(3));
};

const endGame = () => {
    gameStatus = false;
    clearInterval(timerInterval);
    clearTimeout(moleTimeout);
    moles.forEach((mole) => mole.classList.remove('active')); // Hide any active moles
    
    startBtn.disabled = false;

    // Apply the red theme styling when time ends
    time_cont.style.background = '#4a1212';
    timerHead.style.color = '#7e2d2d';
    timerDisplay.style.color = '#ff9999';
    
    hideTimeout.forEach((timeout) => {
        clearTimeout(timeout);
    });
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
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    startBtn.disabled = true;

    // Reset the time box styling back to normal when a new game starts
    time_cont.style.background = '';
    timerHead.style.color = '';
    timerDisplay.style.color = '';

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