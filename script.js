const square = document.getElementById('square');
const container = document.getElementById('container');

// Function to generate a random position
function getRandomPosition() {
  const containerWidth = container.clientWidth - square.clientWidth;
  const containerHeight = container.clientHeight - square.clientHeight;
  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);
  return { x: randomX, y: randomY };
}

// Function to move the square to a random position after clicking it
function moveSquare() {
  const newPosition = getRandomPosition();
  square.style.left = newPosition.x + 'px';
  square.style.top = newPosition.y + 'px';
}

//Function to get (generate) random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Function to change color using the generating function
function changeColor() {
  const newColor = getRandomColor();
  square.style.backgroundColor = newColor;
}
//Function clears any existing timeout and sets a new one to hide the square after 2 seconds
function resetTimeout() {
  setTimeout(function() {
    moveSquare();
    changeColor();
    resetTimeout();
  }, 2000);
}

resetTimeout();

//On click the functions above will be actived
square.addEventListener('click', function() {
  moveSquare();
  changeColor();
});
