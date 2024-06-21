import { app } from 'electron';
import Constants from './Constants';

export default class Game {
  public readonly start = Date.now();

  public get time(): number {
    return Date.now() - this.start;
  }

  public get speed(): number {
    if (this.time < 10_000) return Constants.baseGameSpeed;
    return Math.max(Constants.baseGameSpeed - Math.sqrt(this.time / 1000 - 10) * 500, Constants.maxGameSpeed);
  }

  public get pipeGapHeight(): number {
    return 0.15;
  }

  public doGameLoop() {
    return app.isReady();
  }
}
