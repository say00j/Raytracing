var scale = 500;
var divisionsPerSide = 10;

var cellSize = scale / divisionsPerSide;

var display_maze = document.getElementById("display_maze");
display_maze.width = scale;
display_maze.height = scale;

var maze = display_maze.getContext("2d");

const mazeDesign = [
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
var playerSpeed = 2;

function drawDivision(x, y, width, height, color) {
  maze.strokeStyle = "white";
  maze.fillStyle = color;
  maze.strokeRect(x, y, width, height);
  maze.fillRect(x, y, width, height);
}

function drawPlayer(x, y, width, height, color) {
  maze.fillStyle = color;
  maze.fillRect(x, y, width, height);
}

window.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.key === "ArrowUp" || event.key === "w") {
    playerY -= playerSpeed;
  }
  if (event.key === "ArrowDown" || event.key === "s") {
    playerY += playerSpeed;
  }
  if (event.key === "ArrowLeft" || event.key === "a") {
    playerX -= playerSpeed;
  }
  if (event.key === "ArrowRight" || event.key === "d") {
    playerX += playerSpeed;
  }
});

function animate() {
  requestAnimationFrame(animate);
  maze.clearRect(0, 0, display_maze.width, display_maze.height);
  for (let i = 0; i < divisionsPerSide; i++) {
    for (let j = 0; j < divisionsPerSide; j++) {
      if (mazeDesign[i][j] == 1) {
        drawDivision(j * cellSize, i * cellSize, cellSize, cellSize, "green");
      } else {
        drawDivision(j * cellSize, i * cellSize, cellSize, cellSize, "black");
      }
    }
  }

  drawPlayer(playerX, playerY, 10, 10, "yellow");
}

animate();
