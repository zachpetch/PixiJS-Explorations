import { Application, Text } from 'pixi.js';
import { Ball } from './Elements/Ball';
import { Controller } from './Controller';
import { GravityWell } from './Elements/GravityWell';
import { Paddle, PADDLE_HEIGHT, PADDLE_WIDTH } from './Elements/Paddle';
import { Score } from './Elements/Score';
import WebFont from 'webfontloader';

// TODO: Add reset system
// TODO: Add click to create gravity well

(async () =>
{
  WebFont.load({
    google: {
      families: ['Micro 5'],
      // families: ['Revalia'],
    },
  });

  // Initialize game
  const app = new Application();

  await app.init({
    background: '#333333',
    resizeTo: window,
    antialias: true, // Can be taxing. Remove if performance suffers.
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  const ctrl = new Controller();

  const scoreLeft = new Score(app, app.screen.width / 4, 20)
  const scoreRight = new Score(app, app.screen.width * (3/4), 20)

  // Create paddles
  const paddleLeft  = new Paddle(app, 30, app.screen.height / 2 - PADDLE_HEIGHT / 2);
  const paddleRight = new Paddle(app, app.screen.width - 30 - PADDLE_WIDTH, app.screen.height / 2 - PADDLE_HEIGHT / 2);

  // Create gravity wells
  const gravityWells = [
    new GravityWell(app, app.screen.width / 4,     app.screen.height / 2),
    new GravityWell(app, app.screen.width / 2,     app.screen.height / 2, 0.6),
    new GravityWell(app, app.screen.width * (3/4), app.screen.height / 2),
  ];

  // Create balls
  const balls = [
    new Ball(app, app.screen.width / 2, app.screen.height * (2/5)),
  ];

  app.ticker.add(() =>
  {
    // Paddle Movement
    if (ctrl.isPressed("w")) paddleLeft.moveUp();
    if (ctrl.isPressed("s")) paddleLeft.moveDown(app.screen.height);
    if (ctrl.isPressed("k") || ctrl.isPressed("ArrowUp")) paddleRight.moveUp();
    if (ctrl.isPressed("j") || ctrl.isPressed("ArrowDown")) paddleRight.moveDown(app.screen.height);
    if (ctrl.isPressed("ArrowUp") || ctrl.isPressed("ArrowUp")) paddleRight.moveUp();
    if (ctrl.isPressed("ArrowDown") || ctrl.isPressed("ArrowDown")) paddleRight.moveDown(app.screen.height);

    // Apply gravity well forces
    gravityWells.forEach(well => {
      balls.forEach(ball => well.applyGravity(ball));
    });

    balls.forEach(ball => {
      ball.move();

      // Reverse vertical velocity on collision with top/bottom walls
      if (ball.graphics.y <= ball.radius || ball.graphics.y >= app.screen.height - ball.radius) {
        ball.reflectY();
      }

      // Reverse horizontal velocity and hand out points on collision with left/right walls
      if (ball.graphics.x <= ball.radius) {
        ball.reflectX();
        scoreRight.addPoints();
      }
      if (ball.graphics.x >= app.screen.width - ball.radius) {
        ball.reflectX();
        scoreLeft.addPoints();
      }

      if (ball.collidesWith(paddleLeft) || ball.collidesWith(paddleRight)) {
        ball.reflectX();
      }
    });
  });
})();
