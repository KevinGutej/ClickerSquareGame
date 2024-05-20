const square = document.getElementById('square');
const container = document.getElementById('container');
const counterDisplay = document.getElementById('counter');
let counter = 0;
let delay = 2000; // Initial delay time in milliseconds

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

function incrementCounter() {
  counter++;
  counterDisplay.textContent = counter;
}

// Function to reset the timeout and move the square at the current delay
function resetTimeout() {
  setTimeout(function() {
    moveSquare();
    changeColor();
    resetTimeout();
  }, delay);
}

resetTimeout();

// Function to handle the click event
square.addEventListener('click', function() {
  moveSquare();
  changeColor();
  incrementCounter();

  if (delay > 200) {
    delay -= 100;
  }
});
