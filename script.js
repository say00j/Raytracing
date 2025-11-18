var scale = 500;
var divisionsPerSide = 10;

var cellSize = scale / divisionsPerSide;

var display = document.getElementById("display");
display.width = scale;
display.height = scale;

var pen = display.getContext("2d");

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var playerX = 10;
var playerY = 10;
var playerSize = 10;
var offset = playerSize / 2;
var playerSpeed = 2;
var mouseX = 0;
var mouseY = 0;
let dirY = 0;
let dirX = 0;

function drawDivision(x, y, width, height, color) {
  pen.strokeStyle = "white";
  pen.fillStyle = color;
  pen.strokeRect(x, y, width, height);
  pen.fillRect(x, y, width, height);
}

function drawPlayer(x, y, width, height, color) {
  pen.fillStyle = color;
  pen.fillRect(x, y, width, height);
}

function drawLine(x1, y1, x2, y2, color) {
  pen.strokeStyle = color;
  pen.beginPath();
  pen.moveTo(x1, y1);
  pen.lineTo(x2, y2);
  pen.stroke();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "w") dirY = -1;
  if (event.key === "ArrowDown" || event.key === "s") dirY = 1;
  if (event.key === "ArrowLeft" || event.key === "a") dirX = -1;
  if (event.key === "ArrowRight" || event.key === "d") dirX = 1;
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" || event.key === "w") if (dirY === -1) dirY = 0;
  if (event.key === "ArrowDown" || event.key === "s") if (dirY === 1) dirY = 0;
  if (event.key === "ArrowLeft" || event.key === "a") if (dirX === -1) dirX = 0;
  if (event.key === "ArrowRight" || event.key === "d") if (dirX === 1) dirX = 0;
});

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function drawMaze() {
  for (let i = 0; i < divisionsPerSide; i++) {
    for (let j = 0; j < divisionsPerSide; j++) {
      if (maze[i][j] == 1) {
        drawDivision(j * cellSize, i * cellSize, cellSize, cellSize, "green");
      } else {
        drawDivision(j * cellSize, i * cellSize, cellSize, cellSize, "black");
      }
    }
  }
}

function playerUpdate() {
  playerX += dirX * playerSpeed;
  playerY += dirY * playerSpeed;
}

function animate() {
  requestAnimationFrame(animate);
  pen.clearRect(0, 0, display.width, display.height);
  drawMaze();
  drawPlayer(playerX, playerY, playerSize, playerSize, "yellow");
  drawLine(playerX + offset, playerY + offset, mouseX, mouseY, "cyan");
  playerUpdate();
}

animate();
