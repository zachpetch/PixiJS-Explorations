import { Text } from "pixi.js";

// const FONT_NAME = 'Revalia';
const FONT_NAME = 'Micro 5';
const TEXT_SIZE = 180;
const TEXT_COLOR = 'white';
const TEXT_ALIGNMENT = 'center';
const STARTING_SCORE = 0;

export class Score
{
  constructor(app, x, y, size = TEXT_SIZE, font = FONT_NAME, alignment = TEXT_ALIGNMENT, score = STARTING_SCORE) {
    this.score = score;
    this.text = new Text({
      text: `${this.score}`,
      style: {
        fontFamily: font,
        fontSize: size,
        fill: TEXT_COLOR,
        align: alignment,
      }
    });
    this.text.position.set(x - this.text.width / 2, y);
    app.stage.addChild(this.text);
  }

  addPoints(points = 1) {
    this.score += points;
    this.text.text = `${this.score}`;
  }
}
