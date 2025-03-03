import { Graphics } from 'pixi.js';

export function addMoreMountains(app)
{
  const group1 = createMountainGroup(app);
  const group2 = createMountainGroup(app);

  group2.x = app.screen.width;
  app.stage.addChild(group1, group2);

  app.ticker.add((time) =>
  {
    const dx = time.deltaTime * 0.25;

    group1.x -= dx;
    group2.x -= dx;

    if (group1.x <= -app.screen.width)
    {
      group1.x += app.screen.width * 2;
    }
    if (group2.x <= -app.screen.width)
    {
      group2.x += app.screen.width * 2;
    }
  });
}

function createMountainGroup(app)
{
  const graphics = new Graphics();
  const width = app.screen.width / 2;
  const startY = app.screen.height;
  const startXMiddle = Number(app.screen.width) / 4;
  const heightMiddle = (app.screen.height * 4) / 5;
  const colorMiddle = 0x7e818f;

  graphics
    .moveTo(startXMiddle, startY)
    .bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY,
    )
    .fill({ color: colorMiddle })

  return graphics;
}
