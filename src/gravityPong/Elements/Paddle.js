import { Graphics } from "pixi.js";

export const PADDLE_WIDTH = 20;
export const PADDLE_HEIGHT = 100;
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
}
