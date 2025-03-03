import {Application, Graphics, Color} from "pixi.js";

(async () => {
  const app = new Application();

  await app.init({
    resizeTo: window,
    antialias: true, // This can cause huge performance decreases.
  });

  app.canvas.style.position = "absolute";

  // Create paddles
  const paddleWidth = 20, paddleHeight = 100;

  const createPaddle = (x, y) => {
    const paddle = new Graphics()
      .rect(0, 0, paddleWidth, paddleHeight)
      .fill({color: 'white'})
    paddle.x = x;
    paddle.y = y;
    app.stage.addChild(paddle);
    return paddle;
  }

  const leftPaddle = createPaddle(30, app.screen.height / 2 - paddleHeight / 2);
  const rightPaddle = createPaddle(app.screen.width - 30 - paddleWidth, app.screen.height / 2 - paddleHeight / 2);

  // Create ball
  let ballPosX = app.screen.width / 2;
  let ballPosY = app.screen.height / 4;
  let ballRadius = 10;
  const ball = new Graphics()
    .circle(0, 0, ballRadius)
    .fill('red');
  ball.x = ballPosX;
  ball.y = ballPosY;
  app.stage.addChild(ball);

  // Ball velocity
  let ballVelocity = {x: 4, y: 2};

  // Create gravity wells
  let gravityWells = [
    {x: app.screen.width / 2, y: app.screen.height / 2, strength: 0.2}
  ];

  const wellRadius = 25;
  const drawGravityWells = () => {
    gravityWells.forEach(well => {
      const circle = new Graphics()
        .circle(0, 0, wellRadius)
        .fill('green');
      circle.x = well.x;
      circle.y = well.y;
      app.stage.addChild(circle);
    });
  };
  drawGravityWells();

  // Game loop
  app.ticker.add(() => {

    // Apply gravity well forces
    gravityWells.forEach(well => {
      let dx = well.x - ball.x;
      let dy = well.y - ball.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let force = well.strength / (distance * 0.1);
      ballVelocity.x += force * (dx / distance);
      ballVelocity.y += force * (dy / distance);
    });

    // Move ball
    ball.x += ballVelocity.x;
    ball.y += ballVelocity.y;

    // Ball collision with top/bottom walls
    if (ball.y <= ballRadius || ball.y >= app.screen.height - ballRadius) {
      ballVelocity.y *= -1;
    }

    // Ball collision with left/right walls
    if (ball.x <= ballRadius || ball.x >= app.screen.width - ballRadius) {
      ballVelocity.x *= -1;
      // TODO: Add scoring system.
      // TODO: Add reset system.
    }

    // Ball collision with paddles
    if (
      (ball.x - ballRadius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
      (ball.x + ballRadius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
    ) {
      ballVelocity.x *= -1;
    }

    // Ball collision with gravity well
    gravityWells.forEach(well => {
      let dx = well.x - ball.x;
      let dy = well.y - ball.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let force = well.strength / (distance * 0.1);

      if (distance < wellRadius + ballRadius) { // Collision threshold
        // Compute reflection vector
        let normalX = dx / distance;
        let normalY = dy / distance;
        let dotProduct = ballVelocity.x * normalX + ballVelocity.y * normalY;

        // Reflect velocity and slow it down
        ballVelocity.x -= 2 * dotProduct * normalX;
        ballVelocity.y -= 2 * dotProduct * normalY;
        ballVelocity.x *= 0.7; // Reduce speed to simulate energy loss
        ballVelocity.y *= 0.7;

        // Push the ball slightly out of the well to prevent sinking
        ball.x = well.x - normalX * (wellRadius + ballRadius);
        ball.y = well.y - normalY * (wellRadius + ballRadius);
      } else {
        // Apply gravity only if not colliding
        ballVelocity.x += force * (dx / distance);
        ballVelocity.y += force * (dy / distance);
      }
    });
  });

  // Paddle movement (basic keyboard controls)
  const keys = {};
  window.addEventListener("keydown", (e) => keys[e.key] = true);
  window.addEventListener("keyup", (e) => keys[e.key] = false);
  app.ticker.add(() => {
    if (keys["w"] && leftPaddle.y > 0) leftPaddle.y -= 5;
    if (keys["s"] && leftPaddle.y < app.screen.height - paddleHeight) leftPaddle.y += 5;
    if (keys["ArrowUp"] && rightPaddle.y > 0) rightPaddle.y -= 5;
    if (keys["ArrowDown"] && rightPaddle.y < app.screen.height - paddleHeight) rightPaddle.y += 5;
  });
  document.body.appendChild(app.canvas);
})();
