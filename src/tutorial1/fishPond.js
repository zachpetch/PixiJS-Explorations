import { Application, Assets } from 'pixi.js';
import { addBackground } from './addBackground';
import { addDisplacementEffect } from './addDisplacementEffect';
import { addFishes, animateFishes } from './addFishes';
import { addWaterOverlay, animateWaterOverlay } from './addWaterOverlay';

const app = new Application();

const fishes = [];

async function setup()
{
  await app.init({
    background: '#1099bb',
    resizeTo: window
  });

  document.body.appendChild(app.canvas);
}

async function preload()
{
  const assets = [
    { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
    { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
    { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
    { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
    { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
    { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
    { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
    { alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' },
  ];

  await Assets.load(assets);
}

(async () =>
{
  await setup();
  await preload();

  addBackground(app);
  addFishes(app, fishes);
  addWaterOverlay(app);
  addDisplacementEffect(app);

  app.ticker.add((time) => {
    animateFishes(app, fishes, time);
    animateWaterOverlay(app, time);
  });
})();
