const square = document.getElementById('square');
const container = document.getElementById('container');
const counterDisplay = document.getElementById('counter');
const timerDisplay = document.getElementById('timer');
const comboDisplay = document.getElementById('combo');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');
const clickSound = document.getElementById('clickSound');
const bgMusic = document.getElementById('bgMusic');

let counter = 0;
let delay = 2000; // Initial delay time in milliseconds
let timeLeft = 30; // Game duration in seconds
let highScore = localStorage.getItem('highScore') || 0;
let combo = 1;
let comboTimer;
let timerInterval;

bgMusic.play(); // Start background music

highScoreDisplay.textContent = highScore;

function getRandomPosition() {
  const containerWidth = container.clientWidth - square.clientWidth;
  const containerHeight = container.clientHeight - square.clientHeight;
  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);
  return { x: randomX, y: randomY };
}

function moveSquare() {
  const newPosition = getRandomPosition();
  square.style.left = newPosition.x + 'px';
  square.style.top = newPosition.y + 'px';
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeColor() {
  const newColor = getRandomColor();
  square.style.backgroundColor = newColor;
}

function changeShape() {
  const shapes = ['50%', '0%', '10% 40% 10% 40%', '10% 10% 10% 10%'];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  square.style.borderRadius = randomShape;
}

function incrementCounter() {
  counter += combo;
  counterDisplay.textContent = `Score: ${counter}`;
}

function resetCombo() {
  combo = 1;
  comboDisplay.textContent = `Combo: x${combo}`;
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  
  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(timerInterval);
  square.style.display = 'none';
  bgMusic.pause();
  finalScoreDisplay.textContent = counter;
  gameOverDisplay.style.display = 'block';

  if (counter > highScore) {
    highScore = counter;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.textContent = highScore;
  }
}

function restartGame() {
  counter = 0;
  delay = 2000;
  timeLeft = 30;
  combo = 1;
  counterDisplay.textContent = `Score: ${counter}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  comboDisplay.textContent = `Combo: x${combo}`;
  square.style.display = 'block';
  gameOverDisplay.style.display = 'none';
  bgMusic.play();
  resetTimeout();
  timerInterval = setInterval(updateTimer, 1000);
}

square.addEventListener('click', function() {
  moveSquare();
  changeColor();
  changeShape();
  incrementCounter();
  clickSound.play();

  if (delay > 200) {
    delay -= 100;
  }

  if (comboTimer) clearTimeout(comboTimer);
  combo++;
  comboDisplay.textContent = `Combo: x${combo}`;
  comboTimer = setTimeout(resetCombo, 1000);
});

function resetTimeout() {
  setTimeout(function() {
    moveSquare();
    changeColor();
    resetTimeout();
  }, delay);
}

container.addEventListener('click', function(event) {
  if (event.target !== square) {
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 500);
  }
});

restartBtn.addEventListener('click', restartGame);

resetTimeout();

timerInterval = setInterval(updateTimer, 1000);
