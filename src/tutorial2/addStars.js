import { Graphics } from 'pixi.js';

export function addStars(app)
{
  const starCount = 50;
  const graphics = new Graphics();

  for (let index = 0; index < starCount; index++)
  {
    const x = (index * Math.random() * app.screen.width) % app.screen.width;
    const y = (index * Math.random() * app.screen.height) % app.screen.height;
    const radius = Math.random() * 3 + 2;
    const rotation = Math.random() * Math.PI * 2;

    graphics.star(x, y, 5, radius, 0, rotation).fill({ color: 0xffdf00, alpha: radius / 5 });
  }

  app.stage.addChild(graphics);
}
