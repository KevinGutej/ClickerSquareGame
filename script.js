const square = document.getElementById('square');
const container = document.getElementById('container');
const counterDisplay = document.getElementById('counter');
const timerDisplay = document.getElementById('timer');
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

// Initialize the high score display
highScoreDisplay.textContent = highScore;

bgMusic.play(); // Start background music

// Function to generate a random position
function getRandomPosition() {
  const containerWidth = container.clientWidth - square.clientWidth;
  const containerHeight = container.clientHeight - square.clientHeight;
  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);
  return { x: randomX, y: randomY };
}

// Function to move the square to a random position
function moveSquare() {
  const newPosition = getRandomPosition();
  square.style.left = newPosition.x + 'px';
  square.style.top = newPosition.y + 'px';
}

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change the square's color
function changeColor() {
  const newColor = getRandomColor();
  square.style.backgroundColor = newColor;
}

// Function to handle the click event
square.addEventListener('click', function() {
  moveSquare();
  changeColor();
  incrementCounter();
  clickSound.play();

  // Make the square smaller as the score increases
  if (counter % 5 === 0 && square.clientWidth > 20) {
    square.style.width = square.clientWidth - 5 + 'px';
    square.style.height = square.clientHeight - 5 + 'px';
  }

  if (delay > 200) {
    delay -= 100;
  }
});

// Function to increment the score counter
function incrementCounter() {
  counter++;
  counterDisplay.textContent = `Score: ${counter}`;
}

// Function to update the timer
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  
  if (timeLeft <= 0) {
    endGame();
  }
}

// Function to end the game
function endGame() {
  clearInterval(timerInterval);
  square.style.display = 'none';
  bgMusic.pause();
  finalScoreDisplay.textContent = counter;
  gameOverDisplay.style.display = 'block';

  // Update high score if the current score is higher
  if (counter > highScore) {
    highScore = counter;
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.textContent = highScore;
  }
}

// Function to reset and restart the game
function restartGame() {
  counter = 0;
  delay = 2000;
  timeLeft = 30;
  counterDisplay.textContent = `Score: ${counter}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}`;
  square.style.width = '50px';
  square.style.height = '50px';
  square.style.display = 'block';
  gameOverDisplay.style.display = 'none';
  bgMusic.play();
  resetTimeout();
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to reset the timeout and move the square at the current delay
function resetTimeout() {
  setTimeout(function() {
    moveSquare();
    changeColor();
    resetTimeout();
  }, delay);
}

// Start the game timer
let timerInterval = setInterval(updateTimer, 1000);

resetTimeout();

// Restart button event listener
restartBtn.addEventListener('click', restartGame);
