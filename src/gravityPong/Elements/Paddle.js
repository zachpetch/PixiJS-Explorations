import { Graphics } from "pixi.js";

export const PADDLE_WIDTH = 20;
export const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;
const PADDLE_COLOR = 'white';

export class Paddle
{
  constructor(app, x, y, width = PADDLE_WIDTH, height = PADDLE_HEIGHT) {
    this.height = height;
    this.width = width;
    this.graphics = new Graphics()
      .rect(0, 0, width, height)
      .fill({color: PADDLE_COLOR});
    this.graphics.x = x;
    this.graphics.y = y;

    app.stage.addChild(this.graphics);
  }

  moveUp() {
    if (this.graphics.y > 0) {
      this.graphics.y -= PADDLE_SPEED;
    }
  }

  moveDown(screenHeight) {
    if (this.graphics.y < screenHeight - this.height) {
      this.graphics.y += PADDLE_SPEED;
    }
  }
}
