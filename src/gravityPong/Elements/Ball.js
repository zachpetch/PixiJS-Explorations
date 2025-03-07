import { Graphics } from "pixi.js";

const BALL_RADIUS = 10;
const BALL_COLOR = 0x3399ff;
// const VELOCITY_X = 5;
// const VELOCITY_Y = 4;
const VELOCITY_X = 6;
const VELOCITY_Y = 5;

export class Ball
{
  constructor(app, x, y, radius = BALL_RADIUS, velocityX = VELOCITY_X, velocityY = VELOCITY_Y) {
    this.radius = radius;
    this.graphics = new Graphics()
      .circle(0, 0, this.radius)
      .fill({color: BALL_COLOR});
    this.graphics.x = x;
    this.graphics.y = y;
    this.velocity = {
      "x": velocityX,
      "y": velocityY
    };

    app.stage.addChild(this.graphics);
  }

  move() {
    this.graphics.x += this.velocity.x;
    this.graphics.y += this.velocity.y;
  }

  reflectX() {
    this.velocity.x *= -1;
  }

  reflectY() {
    this.velocity.y *= -1;
  }

  collidesWith(paddle) {
    return (
      this.graphics.x - this.radius < paddle.graphics.x + paddle.width &&
      this.graphics.x + this.radius > paddle.graphics.x &&
      this.graphics.y > paddle.graphics.y &&
      this.graphics.y < paddle.graphics.y + paddle.height
    );
  }
}
