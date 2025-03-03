import { Graphics } from 'pixi.js';

export function addSmoke(app, train)
{
  const groupCount = 5;
  const particleCount = 7;

  const groups = [];

  // Define the emitter position based on the train's position.
  const baseX = train.x + 170;
  const baseY = train.y - 120;

  for (let index = 0; index < groupCount; index++)
  {
    const smokeGroup = new Graphics();

    for (let i = 0; i < particleCount; i++)
    {
      // Randomize the position and radius of each particle.
      const radius = 20 + Math.random() * 20;
      const x = (Math.random() * 2 - 1) * 40;
      const y = (Math.random() * 2 - 1) * 40;

      smokeGroup.circle(x, y, radius);
    }

    smokeGroup.fill({ color: 0xc9c9c9 });
    smokeGroup.x = baseX;
    smokeGroup.y = baseY;

    // Custom tick property for storing the animation progress ratio.
    smokeGroup.tick = index * (1 / groupCount);

    app.stage.addChild(smokeGroup);
    groups.push(smokeGroup);
  }

  app.ticker.add((time) =>
  {
    const dt = time.deltaTime * 0.01;

    groups.forEach((group) =>
    {
      group.tick = (group.tick + dt) % 1;
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      group.scale.set(Math.pow(group.tick, 0.75));
      group.alpha = 1 - Math.pow(group.tick, 0.5);
    });
  });
}
