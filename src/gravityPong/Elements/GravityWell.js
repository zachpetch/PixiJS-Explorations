import { Graphics } from "pixi.js";

const WELL_COLOR = 0x000000;
const WELL_STRENGTH = 0.2;

export class GravityWell
{
  constructor(app, x, y, strength = WELL_STRENGTH) {
    this.radius = strength * 50;
    this.graphics = new Graphics()
      .circle(0, 0, this.radius)
      .fill({color: WELL_COLOR});
    this.graphics.x = x;
    this.graphics.y = y;
    this.strength = strength;

    app.stage.addChild(this.graphics);
  }
}
