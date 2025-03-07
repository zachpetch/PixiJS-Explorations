import { Graphics } from "pixi.js";

const WELL_COLOR = 0x000000;
const WELL_STRENGTH = 0.3;
const MIN_DISTANCE = 3; // Prevents dramtatic accelleration... though it's fun sometimes.

export class GravityWell
{
  constructor(app, x, y, strength = WELL_STRENGTH) {
    this.radius = strength * 100;
    this.graphics = new Graphics()
      .circle(0, 0, this.radius)
      .fill({color: WELL_COLOR});
    this.graphics.x = x;
    this.graphics.y = y;
    this.strength = strength;

    app.stage.addChild(this.graphics);
  }

  applyGravity(ball) {
    let dx = this.graphics.x - ball.graphics.x;
    let dy = this.graphics.y - ball.graphics.y;
    let distance = Math.max(Math.sqrt(dx * dx + dy * dy), MIN_DISTANCE); // Avoid division by zero
    let force = this.strength / (distance * 0.1);
    ball.velocity.x += force * (dx / distance);
    ball.velocity.y += force * (dy / distance);
  }
}
