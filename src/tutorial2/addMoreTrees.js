import { Graphics } from 'pixi.js';

export function addMoreTrees(app)
{
  const treeWidth = 120;
  const y = app.screen.height - 20;
  const spacing = 15;
  const count = app.screen.width / (treeWidth + spacing) + 1;
  const trees = [];

  for (let index = 0; index < count; index++)
  {
    const treeHeight = 160 + Math.random() * 80;
    const tree = createTree(treeWidth, treeHeight);

    tree.x = index * (treeWidth + spacing);
    tree.y = y;

    app.stage.addChild(tree);
    trees.push(tree);
  }

  app.ticker.add((time) =>
  {
    const dx = time.deltaTime * 2.5;

    trees.forEach((tree) =>
    {
      tree.x -= dx;

      if (tree.x <= -(treeWidth / 2 + spacing))
      {
        tree.x += count * (treeWidth + spacing) + spacing * 3;
      }
    });
  });
}

function createTree(width, height)
{
  const trunkWidth = 30;
  const trunkHeight = height / 4;
  const trunkColor = 0x462919;
  const graphics = new Graphics()
    .rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
    .fill({ color: trunkColor });

  const crownHeight = height - trunkHeight;
  const crownLevels = 3;
  const crownLevelHeight = crownHeight / crownLevels;
  const crownWidthIncrement = width / crownLevels;
  const crownColor = 0x163d35;

  for (let index = 0; index < crownLevels; index++)
  {
    const y = -trunkHeight - crownLevelHeight * index;
    const levelWidth = width - crownWidthIncrement * index;
    const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

    graphics
      .moveTo(-levelWidth / 2, y)
      .lineTo(0, y - crownLevelHeight - offset)
      .lineTo(levelWidth / 2, y)
      .fill({ color: crownColor });
  }

  return graphics;
}
