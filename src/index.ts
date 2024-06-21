import { app, globalShortcut } from 'electron';
import Bird from './Classes/Bird';
import { setTimeout } from 'timers/promises';
import Constants, { setupConstants } from './Classes/Constants';
import Game from './Classes/Game';
import PipeGenerator from './Classes/Pipe/PipeGenerator';
import Collisions from './Classes/Collisions';

export const game = new Game();

app.whenReady().then(async () => {
  setupConstants();

  const pipes = new PipeGenerator();

  const bird = new Bird();

  const collisions = new Collisions(bird, pipes);

  bird.create(true);

  globalShortcut.register('Space', () => bird.jump());

  while (game.doGameLoop()) {
    pipes.render();

    bird.render();

    if (collisions.hasCollided()) return;

    await setTimeout(1000 / Constants.fps);
  }
});
