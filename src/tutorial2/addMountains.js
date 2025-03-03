import { Graphics } from 'pixi.js';

export function addMountains(app)
{
  const group1 = createMountainGroup(app);
  const group2 = createMountainGroup(app);

  group2.x = app.screen.width;
  app.stage.addChild(group1, group2);

  app.ticker.add((time) =>
  {
    const dx = time.deltaTime * 0.5;

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
  const startXLeft = 0;
  const startXRight = app.screen.width / 2;
  const heightLeft = app.screen.height / 2;
  const heightRight = (app.screen.height * 2) / 3;
  const colorLeft = 0xc1c0c2;
  const colorRight = 0x8c919f;

  graphics
    // Left mountain
    .moveTo(startXLeft, startY)
    .bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY,
    )
    .fill({ color: colorLeft })

    // Right mountain
    .moveTo(startXRight, startY)
    .bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY,
    )
    .fill({ color: colorRight });

  return graphics;
}
