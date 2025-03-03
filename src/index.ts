import {Application, Graphics, Sprite, Assets} from "pixi.js";

import * as PIXI from 'pixi.js';

// Create PixiJS application
const app = new Application({
  resizeTo: window,
  // antialias: true // This might be a huge performance hit
});
document.body.appendChild(app.view as HTMLCanvasElement);

// Create paddles
const paddleWidth = 20, paddleHeight = 100;

const createPaddle = (x: number, y: number): PIXI.Graphics => {
  const paddle = new PIXI.Graphics();
  paddle.beginFill(0xFFFFFF).drawRect(0, 0, paddleWidth, paddleHeight).endFill();
  paddle.x = x;
  paddle.y = y;
  app.stage.addChild(paddle);
  return paddle;
};

const leftPaddle = createPaddle(30, app.screen.height / 2 - paddleHeight / 2);
const rightPaddle = createPaddle(app.screen.width - 30 - paddleWidth, app.screen.height / 2 - paddleHeight / 2);

// Create ball
const ball = new PIXI.Graphics();
ball.beginFill(0xFF0000).drawCircle(0, 0, 10).endFill();
ball.x = app.screen.width / 2;
ball.y = app.screen.height / 2;
app.stage.addChild(ball);

// Ball velocity
let ballVelocity = { x: 5, y: 3 };

// Game loop
app.ticker.add(() => {
  // Move ball
  ball.x += ballVelocity.x;
  ball.y += ballVelocity.y;

  // Ball collision with top/bottom walls
  if (ball.y <= 0 || ball.y >= app.screen.height) {
    ballVelocity.y *= -1;
  }

  // Ball collision with paddles
  if (
    (ball.x - 10 < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
    (ball.x + 10 > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
  ) {
    ballVelocity.x *= -1;
  }
});

// Paddle movement (basic keyboard controls)
const keys: { [key: string]: boolean } = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);
app.ticker.add(() => {
  if (keys["w"] && leftPaddle.y > 0) leftPaddle.y -= 5;
  if (keys["s"] && leftPaddle.y < app.screen.height - paddleHeight) leftPaddle.y += 5;
  if (keys["ArrowUp"] && rightPaddle.y > 0) rightPaddle.y -= 5;
  if (keys["ArrowDown"] && rightPaddle.y < app.screen.height - paddleHeight) rightPaddle.y += 5;
});

document.body.appendChild(app.canvas);
