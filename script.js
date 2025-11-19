var scale = 500;
var divisionsPerSide = 10;

var cellSize = scale / divisionsPerSide;

var display = document.getElementById("display");
var display3D = document.getElementById("display3d");

var pen = display.getContext("2d");
var pen2 = display3D.getContext("2d");

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

var playerX = 80;
var playerY = 80;
let lineX = playerX;
let lineY = playerY;
let lineSpeed = 10;
let nextX = 0;
let nextY = 0;
var playerSize = 10;
var offset = playerSize / 2;
var playerSpeed = 2;
var mouseX = 0;
var mouseY = 0;
let dirY = 0;
let dirX = 0;
let col = 0;
let row = 0;

let rays = [];
let rayNum = 50;
let FOV = Math.PI / 3; // 60 degrees
let rayAngle = FOV / rayNum;

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

class Ray {
  constructor(offsetAngle) {
    this.offsetAngle = offsetAngle;
  }

  update() {
    // player center
    let startX = playerX + offset;
    let startY = playerY + offset;

    // angle to mouse (in radians)
    let angle = Math.atan2(mouseY - startY, mouseX - startX);

    // apply offset to this ray
    angle += this.offsetAngle;

    // convert to direction vector
    let dx = Math.cos(angle);
    let dy = Math.sin(angle);

    let rayX = startX;
    let rayY = startY;

    // march ray forward
    for (let i = 0; i < 500; i++) {
      rayX += dx * 2;
      rayY += dy * 2;
      if (collition(rayX, rayY)) break;
    }

    drawLine(startX, startY, rayX, rayY, "cyan");
    return {
      x: rayX, // hitX
      y: rayY, // hitY
      distance: distance(startX, startY, rayX, rayY),
      angle: angle,
    };
  }
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function playerUpdate() {
  nextX = playerX + dirX * playerSpeed;
  nextY = playerY + dirY * playerSpeed;
  let nextX1 = nextX + playerSize;
  let nextY1 = nextY + playerSize;
  if (collition(nextX, playerY) == 0 && collition(nextX1, playerY) == 0) {
    playerX = nextX;
  }
  if (collition(playerX, nextY) == 0 && collition(playerX, nextY1) == 0) {
    playerY = nextY;
  }
}

function collition(x, y) {
  col = Math.floor(x / cellSize);
  row = Math.floor(y / cellSize);
  if (maze[row][col] == 1) {
    return 1;
  } else {
    return 0;
  }
}

for (let i = 0; i < rayNum; i++) {
  rays.push(new Ray(i * rayAngle));
}

function RayUpdate() {
  let count = 0;
  for (let ray of rays) {
    let data = ray.update();
    console.log(data);
    let sliceWidth = display3D.width / rayNum;

    let wallHeight = (cellSize * 300) / data.distance;

    let x = count * sliceWidth;
    let y = display3D.height / 2 - wallHeight / 2;

    // pen2.fillStyle = "gray";
    // pen2.fillRect(x, y, sliceWidth, wallHeight);
    drawRect(x, y, sliceWidth, wallHeight, "green");
    count++;
  }
}

function drawRect(x, y, width, height, color) {
  pen2.strokeStyle = "red";
  pen2.fillStyle = color;
  pen2.strokeRect(x, y, width, height);
  pen2.fillRect(x, y, width, height);
}

function animate() {
  requestAnimationFrame(animate);
  pen.clearRect(0, 0, display.width, display.height);
  pen2.clearRect(0, 0, display.width, display.height);
  drawMaze();
  drawPlayer(playerX, playerY, playerSize, playerSize, "yellow");
  RayUpdate();
  drawLine(
    playerX + offset,
    playerY + offset + 50,
    playerX + offset,
    playerY + offset - 50,
    "red"
  );
  playerUpdate();
}

animate();
