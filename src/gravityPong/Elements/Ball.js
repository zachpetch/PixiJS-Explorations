import { Graphics } from "pixi.js";

const BALL_RADIUS = 10;
const BALL_COLOR = 0x3399ff;
const VELOCITY_X = 5;
const VELOCITY_Y = 2;

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
}
