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
function ballReset() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;
  ball.velocityX = -ball.velocityX; //공을 반대쪽으로 보냄
}

// 공이 패들에 닿을때
function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
}

function update() {
  // 점수
  if (ball.x - ball.radius < 0) {
    com.score++;
    ballReset();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    ballReset();
  }

  //com paddle
  com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

  //moving ball (처음)
  ball.x += ball.velocityX; // 즉,X+ //이것만 실행 하면 오른쪽 수직방향으로 공이 쭉 움직인다.. 왜 쭉 갈까..?
  ball.y += ball.velocityY; // Y+

  // 공이 bottom, top of canvas 칠때
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
    //ball.y + ball.radius 값은 bottom of ball 임.
    ball.velocityY = -ball.velocityY;
  } //공의 top 과 bottom 이 캔버스의 bottom과 top 에 부딫힐 경우 velocity 의 값이 reverse 되어야 함.

  // paddle이 user 패들인지 com 인지 확인
  let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

  // 공이 패들 칠때
  if (collision(ball, player)) {
    // ball.y랑 paddel의 y 값이 똑같아진다. (즉, 볼이 패들을 치는 위치)
    let collidePoint = ball.y - (player.y + player.height / 2);

    //값을 -1,0,1로 만들어줌
    collidePoint = collidePoint / (player.y + player.height / 2);

    //튕겨나가는 위치 알기 위해
    let angle = (Math.PI / 4) * collidePoint;

    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = Math.cos(angle) * ball.speed * direction;
    ball.velocityY = Math.sin(angle) * ball.speed;

    ball.speed += 0.8;
  }
}

// all draw
function render() {
  //  canvas
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
}

// 최종 실행
function game() {
  update();
  render();
}

//call the game function 50 times every 1 Sec
setInterval(game, 1000 / 50);
