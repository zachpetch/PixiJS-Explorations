import { Application, Container } from 'pixi.js';
import { addGround } from './addGround';
import { addMoon } from './addMoon';
import { addMoreTrees } from './addMoreTrees';
import { addMoreMountains } from './addMoreMountains';
import { addMountains } from './addMountains';
import { addSmoke } from './addSmoke';
import { addStars } from './addStars';
import { addTrain } from './addTrain';
import { addTrees } from './addTrees';

const app = new Application();

const trainContainer = new Container();

(async () =>
{
  await app.init({
    background: '#021f4b',
    resizeTo: window,
    antialias: true,
  });

  document.body.appendChild(app.canvas);

  addStars(app);
  addMoon(app);
  addMoreMountains(app);
  addMountains(app);
  addMoreTrees(app);
  addTrees(app);
  addGround(app);
  addTrain(app, trainContainer);
  addSmoke(app, trainContainer);
})();
