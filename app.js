//select canvas
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2, //300
  y: canvas.height / 2, //200
  radius: 10,
  velocityX: 5, //속도  velocity = speed + direction
  velocityY: 5,
  speed: 7,
  color: "WHITE",
};

const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

const com = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

const net = {
  x: (canvas.width - 2) / 2,
  y: 0,
  height: 10,
  width: 2,
  color: "WHITE",
};

// 네모 그리기
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

//원 그리기
function drawArc(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// 글자 쓰기
function drawText(text, x, y) {
  ctx.fillStyle = "#FFF";
  ctx.font = "75px arial";
  ctx.fillText(text, x, y);
}

//moving paddle
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY - rect.top - user.height / 2;
  console.log(evt.clientY);
}

//ball reset

function update() {
  //moving ball
  ball.x += ball.velocityX; // 즉,X+
  ball.y += ball.velocityY; // Y+
}

// all draw
function render() {
  // clear the canvas
  drawRect(0, 0, canvas.width, canvas.height, "#000");

  // draw the user score to the left
  drawText(user.score, canvas.width / 4, canvas.height / 5);

  // draw the COM score to the right
  drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

  // draw the net
  drawRect(300, 0, 3, 400);
  // draw the user's paddle
  drawRect(user.x, user.y, user.width, user.height, user.color);

  // draw the COM's paddle
  drawRect(com.x, com.y, com.width, com.height, com.color);

  // draw the ball
  drawArc(ball.x, ball.y, ball.radius, ball.color);

  canvas.addEventListener("mousemove", getMousePos);
}

// 최종 실행
function game() {
  update();
  render();
}

//call the game function 50 times every 1 Sec
setInterval(game, 1000 / 50);
