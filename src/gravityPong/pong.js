import { Application } from 'pixi.js';
import { Ball } from './Elements/Ball';
import { Paddle, PADDLE_HEIGHT, PADDLE_WIDTH } from './Elements/Paddle';
import { GravityWell } from './Elements/GravityWell';

(async () =>
{
  // Initialize game
  const app = new Application();

  await app.init({
    background: '#333333',
    resizeTo: window,
    antialias: true, // Can be taxing. Remove if performance suffers.
  });

  app.canvas.style.position = 'absolute';
  document.body.appendChild(app.canvas);

  // Create paddles
  const paddleLeft  = new Paddle(app, 30, app.screen.height / 2 - PADDLE_HEIGHT / 2);
  const paddleRight = new Paddle(app, app.screen.width - 30 - PADDLE_WIDTH, app.screen.height / 2 - PADDLE_HEIGHT / 2);

  // Create gravity wells
  const gravityWells = [
    new GravityWell(app, app.screen.width / 4,     app.screen.height / 2),
    new GravityWell(app, app.screen.width / 2,     app.screen.height / 2, 0.5),
    new GravityWell(app, app.screen.width * (3/4), app.screen.height / 2),
  ];

  // Create balls
  const balls = [
    new Ball(app, app.screen.width / 2, app.screen.height * (2/5)),
  ];

  // Paddle movement (basic keyboard controls)
  const keys = {};

  window.addEventListener("keydown", (e) => keys[e.key] = true);
  window.addEventListener("keyup", (e) => keys[e.key] = false);

  app.ticker.add(() => {
    if (keys["w"] && paddleLeft.graphics.y > 0) paddleLeft.graphics.y -= 5;
    if (keys["s"] && paddleLeft.graphics.y < app.screen.height - PADDLE_HEIGHT) paddleLeft.graphics.y += 5;
    if (keys["ArrowUp"] && paddleRight.graphics.y > 0) paddleRight.graphics.y -= 5;
    if (keys["ArrowDown"] && paddleRight.graphics.y < app.screen.height - PADDLE_HEIGHT) paddleRight.graphics.y += 5;
  });

  app.ticker.add(() =>
  {
    // Apply gravity well forces
    gravityWells.forEach(well => {
      balls.forEach(ball => {
        let dx = well.graphics.x - ball.graphics.x;
        let dy = well.graphics.y - ball.graphics.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let force = well.strength / (distance * 0.1);
        ball.velocity.x += force * (dx / distance);
        ball.velocity.y += force * (dy / distance);
      });
    });

    balls.forEach(ball => {
      // Move ball
      ball.graphics.x += ball.velocity.x;
      ball.graphics.y += ball.velocity.y;

      // Reverse vertical velocity on collision with top/bottom walls
      if (ball.graphics.y <= ball.radius || ball.graphics.y >= app.screen.height - ball.radius) {
        ball.velocity.y *= -1;
      }

      // Reverse horizontal velocity on collision with left/right walls
      if (ball.graphics.x <= ball.radius || ball.graphics.x >= app.screen.width - ball.radius) {
        ball.velocity.x *= -1;
      }

      // Collisions with paddles
      if (
        (
          ball.graphics.x - ball.radius < paddleLeft.graphics.x + PADDLE_WIDTH &&
          ball.graphics.y > paddleLeft.graphics.y &&
            ball.graphics.y < paddleLeft.graphics.y + PADDLE_HEIGHT
        ) ||
        (
          ball.graphics.x + ball.radius > paddleRight.graphics.x &&
            ball.graphics.y > paddleRight.graphics.y &&
            ball.graphics.y < paddleRight.graphics.y + PADDLE_HEIGHT
        )
      ) {
        ball.velocity.x *= -1;
      }
      // TODO: Handle vertical paddle collisions (currently, the ball gets stuck inside the paddle).
    });
  //   // TODO: Add scoring system
  //   // TODO: Add reset system
  });
})();
