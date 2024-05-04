const square = document.getElementById('square');
const container = document.getElementById('container');

function getRandomPosition() {
  const containerWidth = container.clientWidth - square.clientWidth;
  const containerHeight = container.clientHeight - square.clientHeight;
  
  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);
  
  return { x: randomX, y: randomY };
}

