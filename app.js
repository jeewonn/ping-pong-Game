//select canvas
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

//main canvas
function render() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //paddle
  const drawpaddle = (x, y, width, height) => {
    ctx.fillStyle = "yellow";
    ctx.fillRect(x, y, width, height);
  };

  drawpaddle(0, 0, 20, 100); //user
  drawpaddle(580, 0, 20, 100); //computer

  //net (나중에 다시 점선 만들기)
  function drawnet(x, y, width, height) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, width, height);
  }

  drawnet(300, 0, 3, 400);

  // score text
  function drawscore(text, w, h) {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "pink";
    ctx.textAlign = "center";
    ctx.fillText(text, w, h);
  }

  drawscore("score", canvas.width / 4, 30);
  drawscore("score", (3 * canvas.width) / 4, 30);

  // ball
  function drawball(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  }

  drawball(300, 200, 15, "green");
}

render();
// Movement
function gameLoop() {
  update();
  render();
}

setInterval(gameLoop, 100 / 60); //1분당 60번 함수 실행(즉 1초당 실행함)

// 공 움직이기, 공이 벽을 쳤는지 또는 패들을 쳤는지 확인, 패들 움직이기, 컴퓨터 패들 움직이기, collision detection on paddles
const ball = {
  x: 300,
  y: 200,
  velocityX: 5,
  velocityY: 5, //speed + direction
  speed: 5,
};

const paddle = {};

function update() {
  //패들 움직이기

  // move ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
}
