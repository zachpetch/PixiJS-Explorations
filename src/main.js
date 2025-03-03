import {Application, Graphics, Sprite, Assets} from "pixi.js";

(async () =>
{
  const app = new Application();

  await app.init({
    // width: window.innerWidth,
    // height: window.innerHeight,
    resizeTo: window,
    backgroundColor: 0xffffff,
    antialias: true, // This can cause huge performance decreases.
  });

  app.canvas.style.position = "absolute";

  const rectangle = new Graphics()
    .rect(100, 100, 100, 100)
    .fill({ color: 0xeecc33, alpha: 1 })
    .stroke({ color: 0x000000, alpha: 1, width: 0 });
  app.stage.addChild(rectangle);

  const star = new Graphics()
    .star(250, 150, 15, 50, 20)
    .fill({ color: 0xeecc33, alpha: 1 })
    .stroke({ color: 0x000000, alpha: 1, width: 0 });
  app.stage.addChild(star);

  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const bunny = new Sprite(texture);
  app.stage.addChild(bunny);
  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.ticker.add((time) => {
    bunny.rotation += 0.05 * time.deltaTime;
  });

  document.body.appendChild(app.canvas);
})();
