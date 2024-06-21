import PipePair from './PipePair';
import Constants from '../Constants';
import { game } from '../..';

export default class PipeGenerator {
  public readonly pipes: PipePair[] = [];

  private lastPipeMidPoint = 0.5;

  constructor() {}

  public render() {
    this.pipes.forEach((pipe, index) => {
      pipe.render();
      if (pipe.done) this.pipes.splice(index, 1);
    });

    if (!this.pipes.length || this.pipes[this.pipes.length - 1].progress > Constants.pipeSpacing) {
      this.lastPipeMidPoint += (Math.random() - 0.5) * Constants.maxPipeDiff * 2;

      this.lastPipeMidPoint = Math.min(Math.max(this.lastPipeMidPoint, game.pipeGapHeight / 2 + Constants.offsetBottomPX / Constants.height), 1 - game.pipeGapHeight / 2 - Constants.offsetTopPX / Constants.height);

      this.pipes.push(new PipePair(this.lastPipeMidPoint));
    }
  }
}
