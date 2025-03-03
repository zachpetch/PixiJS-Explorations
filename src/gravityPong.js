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
    // {x: 200, y: 300, strength: 0.1},
    // {x: 600, y: 300, strength: 0.1}
    // {x: 200, y: 300, strength: 0.1},
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

  // Toggle gravity well positions
  window.addEventListener("keydown", (e) => {
    if (e.key === "`") {
      gravityWells.forEach(well => {
        well.x = Math.random() * app.screen.width;
        well.y = Math.random() * app.screen.height;
      });
      app.stage.removeChildren(3); // Remove previous gravity wells
      drawGravityWells();
    }
  });

  let pulse = 0;

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

    gravityWells.forEach(well => {
      pulse += 0.05; // Controls speed of pulsation
      let colorFactor = (Math.sin(pulse) + 1) / 2; // Cycle between 0 and 1
      let color = Color.shared.setValue([
        0.5 + 0.5 * colorFactor, // Green component changes
        0.5 + 0.5 * colorFactor, // More brightness towards yellow
        0.0 // No blue component
      ]).toHex();

      well = new Graphics()
        .circle(0, 0, wellRadius)
        .fill('green');
      well.x = well.x;
      well.y = well.y;
      // well.graphics.clear();
      // well.fill(color);
      // well.graphics.beginFill(color).drawCircle(0, 0, 15).endFill();
      // well.graphics.x = well.x;
      // well.graphics.y = well.y;
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
